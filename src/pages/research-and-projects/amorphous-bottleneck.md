---
layout: ../../layouts/Layout.astro
title: "The Amorphous Bottleneck: A Recall-Optimized Ensemble"
description: "Why standard detectors miss faint, shapeless defects like pavement cracks, and how an ensemble of augmentation specialists recovered most of them."
date: "2026-04-15"
category: "Model Architecture"
tags: ["Computer Vision", "Ensemble Learning", "Data-Centric AI", "WBF"]
---

## Overview

Most object detectors are built for *things*: cars, people, and other rigid objects with clear edges. Pavement cracks and surface defects are closer to *stuff*. They are low-contrast, defined by texture, and have no stable shape. When a detector trained for things meets stuff, several problems pile up at once. The model struggles to see the pattern, annotators can't agree on where a defect begins and ends, and the usual metrics stop telling the truth. I call this combination the **Amorphous Bottleneck**.

This project attacks it from the data side. Starting from a single Mask R-CNN baseline (ResNet-50-FPN), I trained **nineteen augmentation specialists**, audited each one against the baseline instance by instance, picked a **six-model team** with **Greedy Forward Selection (GFS)**, and merged their predictions with **Weighted Boxes Fusion (WBF)**.

## Presentation and publication

I presented the work as **“The Amorphous Bottleneck: A Recall Optimized Ensemble for Anomaly Detection”** at **CVGAI 2026**. The talk covered why standard detectors struggle with faint, irregular road defects and walked through the pipeline. The final ensemble raised operational recall by **7.7 percentage points**, and it also surfaced real defects that were missing from the original annotations.

The full paper is going through publication in the **SPIE Conference Proceedings** (ISSN 0277-786X), with indexing planned in EI Compendex and Scopus. There is also a [short post about the conference on LinkedIn](https://www.linkedin.com/posts/abdurakhmon-dadaboev_computervision-anomalydetection-machinelearning-activity-7477337404710756353-5TZz).

<div class="project-gallery">
  <figure class="project-figure project-figure-wide">
    <img src="/images/amorphous-bottleneck-overview.jpg" width="800" height="397" alt="Diagram of the three-part Amorphous Bottleneck failure cascade" loading="lazy" />
    <figcaption>The Amorphous Bottleneck: pattern recognition, label consistency, and evaluation all break at the same time.</figcaption>
  </figure>
  <figure class="project-figure">
    <img src="/images/amorphous-bottleneck-cvgai-speaker.jpg" width="480" height="319" alt="Abdurakhmon Dadaboev presenting at CVGAI 2026" loading="lazy" />
    <figcaption>Presenting the paper at CVGAI 2026.</figcaption>
  </figure>
  <figure class="project-figure">
    <img src="/images/amorphous-bottleneck-cvgai-audience.jpg" width="480" height="320" alt="CVGAI 2026 audience during the Amorphous Bottleneck presentation" loading="lazy" />
    <figcaption>Explaining “things” versus “stuff” to the audience.</figcaption>
  </figure>
</div>

## How hard is the data, in numbers?

### Contrast

To measure how visible the defects actually are, I computed the Weber contrast $C_w = |I_{\text{object}} - I_{\text{background}}| / I_{\text{background}}$ of each labeled defect against its immediate surroundings. Across 9,028 annotated instances the mean was **0.0824**, and **95.67% of defects fall below the usual visibility threshold of $C_w = 0.2$**. At contrast this low, even human annotators draw boundaries inconsistently, so the labels themselves are noisy.

### A scoring rule that favors recall

For road inspection, a missed defect costs far more than a false alarm. GFS therefore ranks candidate models on the validation set with an asymmetric Safety Score, $S = T_{TP} - \alpha \cdot T_{FP}$, where $T_{TP}$ and $T_{FP}$ are true and false positive counts and $\alpha = 0.1$. In other words, one miss is treated as ten times worse than one false alarm.

## Pipeline

<ol class="flow">
  <li><strong>Baseline</strong>Train a single Mask R-CNN (ResNet-50-FPN).</li>
  <li><strong>Specialists</strong>Train nineteen variants, each with a different augmentation strategy.</li>
  <li><strong>Hit/miss audit</strong>Compare every specialist with the baseline on each ground-truth defect.</li>
  <li><strong>Team selection</strong>Add models one at a time with Greedy Forward Selection, keeping only those that raise the Safety Score.</li>
  <li><strong>Fusion</strong>Merge the six chosen models with Weighted Boxes Fusion.</li>
</ol>

### The hit/miss audit

Average precision blends everything into one number and hides *which* defects a model finds. So instead, for every validation image and every ground-truth box (at $IoU \ge 0.5$), I tracked three outcomes:

- **Kept:** both the baseline and the specialist find the defect.
- **Rescue:** the baseline misses it, but the specialist finds it.
- **Regression:** the baseline finds it, but the specialist misses it.

That table made it obvious which augmentations were actually complementary and which were just adding noise.

## Results

On the held-out test split (591 images, 1,812 ground-truth boxes), the frozen six-model ensemble, fused at $IoU = 0.55$ with a confidence threshold of $0.90$, compared with the baseline as follows:

| Metric | Baseline | 6-model ensemble | Change |
| :--- | :--- | :--- | :--- |
| **mAP@50:95** | 0.5420 | 0.5598 | **+0.0178** |
| **AP@50** | 0.7958 | 0.8033 | **+0.0075** |
| **Operational recall** (conf > 0.50) | 0.8317 | 0.9089 | **+0.0772** |
| **Best-F1 threshold** | 0.75 | 0.90 | Shifted up |

### 27 rescues for every regression

The instance audit on the test set counted:

- **135 rescues**: defects the baseline missed and the ensemble found.
- **5 regressions**: defects the baseline found and the ensemble missed.

That is a **27 : 1** ratio, which suggests the different augmentations really do teach the models different things.

## When the “false alarms” were right

At a 0.50 threshold, the ensemble's precision drops from 0.7125 to 0.5457, which looks bad at first. To understand why, I pulled out the **168 high-confidence predictions that overlapped no ground-truth box at all** ($IoU < 0.05$) and checked each one by hand across 114 images.

- **160 of the 168 (95.2%)** were real defects that the annotators had missed.
- The remaining **8** were borderline: dirt, debris, or cement patches that look a lot like cracks.
- None were outright hallucinations.

So a large part of the precision drop comes from the labels, not the model. When the ground truth is this noisy, precision can punish a model for being better than its annotations. For faint, shapeless defects, I think that makes a strong case for putting recall first and for treating the dataset itself as something to audit and fix.
