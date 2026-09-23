---
layout: ../../layouts/Layout.astro
title: "ExamOCR: Offline OMR and Handwriting Recognition for Exams"
description: "Digitizing handwritten exam sheets offline with perspective correction, projection-based mark reading, and Qwen2.5-VL for handwriting."
date: "2026-02-15"
category: "Applied AI"
tags: ["OMR", "HTR", "Qwen2.5-VL", "OpenCV", "SQLite"]
---

## Overview

Digitizing handwritten exams is really two problems in one. Student IDs and birth dates are filled in as bubbles, which calls for precise **optical mark recognition (OMR)**. The essay answers are handwritten on Korean *wongoji* grid paper, which calls for **handwritten text recognition (HTR)**. And because these are student records, none of it can leave the building.

**ExamOCR** handles both in one offline pipeline: fast perspective alignment, projection-based cropping of the grids, and a vision-language model (Qwen2.5-VL-7B-Instruct) for the handwriting, all wrapped in a Streamlit app for the people doing the grading.

## Pipeline

<ol class="flow">
  <li><strong>Input</strong>A scanned PDF or image of the exam sheet.</li>
  <li><strong>Alignment</strong><code>ExamAligner</code> finds the four corner markers and warps the page to a fixed 2828 × 2000 canvas.</li>
  <li><strong>Cropping</strong><code>ExamCropper</code> cuts out each region (ID, birth date, name, answer grid) using fixed ratios.</li>
  <li><strong>Mark reading</strong><code>read_omr_smart</code> reads the ID and birth-date bubbles using pixel projections.</li>
  <li><strong>Handwriting</strong><code>transcribe_qwen</code> reads the wongoji answers with Qwen2.5-VL, and a Korean syllable filter cleans the output.</li>
  <li><strong>Matching and export</strong>Results are matched to students in SQLite and shown in the grading app, with CSV export.</li>
</ol>

The code is split into a few modules:

1. **Interface:** a Streamlit dashboard with multilingual grading, on-canvas annotation, and CSV export.
2. **Storage:** SQLite (`database.py`) for student records, grades, annotation state, and transcriptions.
3. **Alignment and cropping:** `utils/alignment.py` and `utils/cropping.py`.
4. **Mark reading:** projection-based cell detection in `utils/detection.py`.
5. **Handwriting:** GPU-accelerated Qwen2.5-VL generation in `utils/recognition.py`.

## Why I stopped chasing contours

My first prototype tried to find every field and checkbox by detecting its outline. That worked on clean test scans and failed on real ones: pencil marks, handwriting crossing the lines, and folded pages kept breaking the contours, and the alignment drifted.

So I rebuilt it around a simpler, **deterministic** approach: align the whole page first, then cut regions at fixed positions.

### 1. Corner markers and perspective warp

Instead of looking for the form fields, the system looks for four solid black squares printed in the page margins.

- **Finding the markers:** each corner quadrant (`0:cy, 0:cx`, and so on) is searched for a contour with $50 < \text{Area} < 5000$ and a width-to-height ratio between $0.7$ and $1.3$.
- **Warping:** the four points are mapped onto a fixed $2828 \times 2000$ pixel canvas.

```python
src = np.array([tl, tr, br, bl], dtype="float32")
dst = np.array([[0, 0], [temp_w, 0], [temp_w, temp_h], [0, temp_h]], dtype="float32")
warped = cv2.warpPerspective(img, cv2.getPerspectiveTransform(src, dst), (temp_w, temp_h))
```

### 2. Fixed-ratio cropping

Once every page sits on the same canvas, the regions can be cut out with fixed percentages. No contour detection needed:

```python
ROIS_P1 = {
    'Student_ID':    {'x': (0.202, 0.518),   'y': (0.0534, 0.2051)},
    'DOB':           {'x': (0.5265, 0.719),  'y': (0.0537, 0.2044)},
    'Name':          {'x': (0.7285, 0.993),  'y': (0.0127, 0.0566)},
    'Wongoji_P1':    {'x': (0.0095, 0.993),  'y': (0.2207, 0.976)}
}
```

### 3. Reading bubbles with projections

To read the ID and birth-date grids, `read_omr_smart` sums the dark pixels along each row and column. The peaks and valleys in those sums show where the cell boundaries are, much like the timing tracks on a printed answer sheet.

- **Marked or not:** the red channel ($I_R$) is thresholded so pencil strokes separate from the red grid lines. Then the fill ratio of each cell is:

$$
\text{Ratio} = \frac{\text{NonZero}(I_R \le 180)}{\text{Cell Area}}
$$

A cell at or above $12\%$ counts as marked. Anything between $5\%$ and $12\%$ is flagged as uncertain (`!`) and sent to a person to check.

## Cleaning up the Korean output

The grid lines on wongoji paper sometimes confuse the vision-language model, and it produces characters that aren't real Korean syllables.

Unicode's Hangul Syllables block (`U+AC00` to `U+D7A3`) contains 11,172 possible combinations of initial consonant, vowel, and optional final consonant. Only **2,350** of them are in everyday use and included in the **KS X 1001** standard. The filter uses that fact:

1. Go through the transcription one character at a time.
2. Check whether the character is in the Hangul Syllables block.
3. If it is, check whether it's one of the 2,350 KS X 1001 syllables.
4. Remove syllables that don't exist in real Korean, or map them to the closest-sounding valid one, so they don't pollute the database.
5. Run Kiwi (`kiwipiepy`) morphological analysis to pull out nouns (`NNG`, `NNP`) for indexing.
