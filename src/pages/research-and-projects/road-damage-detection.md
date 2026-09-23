---
layout: ../../layouts/Layout.astro
title: "Road Damage Segmentation and Severity Classification"
description: "A road-damage model that found 91% of damage in the test data, confirmed by an independent test report."
date: "2025-12-17"
category: "Computer Vision"
tags: ["Instance Segmentation", "YOLO11", "Post-Processing", "Model Evaluation"]
---

## Overview

Automatic road inspection needs vision models that hold up outside the lab. Alligator cracks and longitudinal cracks are thin, irregular, and don't have a fixed shape, so a rectangular bounding box can't describe them well. Box-based detectors end up with a lot of false positives and fuzzy boundaries.

This project is the **Road Damage Segmentation AI Vision Model v1.0**, built for TQS Korea Co., Ltd. In test report **TWR-202512-A-0072**, **AIWORKX** measured a detection rate of **91% (recall 0.91)** and confirmed that the model met all three performance targets.

## The AIWORKX test report

Testing ran from December 4 to 17, 2025, on 604 test images, using criteria supplied by the client. The reported results:

| Metric | Target | Result | Status |
|---|---|---|---|
| Detection rate (recall) | $\ge 0.90$ | 0.91 | Pass |
| Detection performance (mAP@50) | $\ge 0.85$ | 0.88 | Pass |
| Segmentation quality (mIoU) | $\ge 0.70$ | 0.79 | Pass |

Recall is the share of real damage the model found. These results apply to the model and test data that were submitted. The report also notes that they fall outside the testing agency's KOLAS accreditation scope.

## Architecture

Instead of one network doing everything, the system first segments damage at the pixel level and then judges severity as a separate step. Keeping the two apart limits how far errors spread, and the classifier only ever sees regions that actually contain damage.

<ol class="flow">
  <li><strong>Input</strong>A road image cropped and resized to 1920 × 648.</li>
  <li><strong>Segmentation</strong>YOLO11l-seg predicts masks for alligator cracks (<code>ac</code>), longitudinal cracks (<code>lc</code>), and repair patches (<code>pc</code>).</li>
  <li><strong>Mask cleanup</strong><code>clean_mask</code> removes specks and thin, disconnected tendrils.</li>
  <li><strong>Overlap filter</strong><code>apply_detection_filter</code> resolves overlapping detections.</li>
  <li><strong>Severity</strong>YOLO11m-cls classifies each crack crop as Caution or Danger.</li>
</ol>

### Step 1: Segmentation

The input images are cropped to $1920 \times 648$ so that sky, sidewalks, and other non-road areas are left out. A **YOLO11l-seg** model is trained to predict instance masks for three classes:

- **Alligator crack (`ac`)**
- **Longitudinal crack (`lc`)**
- **Repair patch (`pc`)**

### Step 2: Post-processing

Low-contrast asphalt produces noisy masks with little stray blobs and thin tendrils along the edges. Two filters clean them up:

1. **Morphological cleanup (`clean_mask`):** an opening (erosion followed by dilation) removes small floating blobs and thin disconnected strands, and only the largest connected component of each mask is kept.

2. **Overlap suppression (`apply_detection_filter`):** a rule-based filter uses IoU to settle overlapping detections. For example, if an alligator-crack mask ($M_{ac}$) and a longitudinal-crack mask ($M_{lc}$) overlap heavily, the weaker prediction is dropped so the same damage isn't counted twice.

### Step 3: Severity

The cleaned `ac` and `lc` detections are cropped from the original image and passed to class-specific **YOLO11m-cls** classifiers, which label each one **Caution** or **Danger**:

- **Alligator cracks:** 5,120 test instances (3,293 caution, 1,827 danger). **Accuracy 0.879**, **F1 0.866**.
- **Longitudinal cracks:** 3,048 test instances (2,651 caution, 397 danger). **Accuracy 0.956**, **F1 0.959**.

## Per-class results

Our own evaluation on 2,083 validation instances, broken down by class:

| Class | Instances | mAP@50 | mIoU | Recall | Miss rate |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Alligator crack (`ac`)** | 1,022 | 0.912 | 0.801 | 0.950 | 4.99% |
| **Longitudinal crack (`lc`)** | 785 | 0.786 | 0.739 | 0.862 | 13.76% |
| **Repair patch (`pc`)** | 201 | 0.915 | 0.764 | 0.950 | 4.98% |
| **Pothole (`ph`)** * | 75 | 0.887 | 0.726 | 0.906 | 9.33% |
| **Weighted average** | **2,083** | **0.864** | **0.772** | **0.915** | **8.45%** (176 instances) |

*\* Potholes (`ph`) are handled by a separate network that runs alongside the main pipeline.*

Longitudinal cracks are clearly the hardest class, with the lowest recall and the highest miss rate of the four.

## What I took away

1. **Splitting the pipeline paid off.** With segmentation and classification separated, each could be tuned on its own, and the severity classifiers got clean, focused crops to work with.
2. **Simple morphology goes a long way.** The opening filter cut false-positive pixels by 14.2% on the validation set, mostly by removing thin strands that had nothing to do with the actual damage.
3. **Be precise about what was tested.** The model met all three targets in the AIWORKX report. That is solid evidence for the data and conditions that were tested, not a promise about every road.
