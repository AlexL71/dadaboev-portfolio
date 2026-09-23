---
layout: ../../layouts/Layout.astro
title: "Efficient Semantic Segmentation with Fewer Sensors"
description: "Teaching an RGB-only U-Net to imitate a teacher that also sees near-infrared and LiDAR, using response-based knowledge distillation."
date: "2025-08-22"
category: "Computer Vision"
tags: ["Knowledge Distillation", "Semantic Segmentation", "U-Net", "Remote Sensing"]
---

## Overview

Mapping urban vegetation accurately matters for city planning, and the best systems get there by combining several data sources: regular RGB imagery, near-infrared (NIR) sensors, and LiDAR. The extra sensors do improve accuracy. But they are expensive, and capturing and aligning all of them every time you want a prediction is slow and awkward.

The question we asked was simple: how much of that accuracy can a model keep if it only ever sees RGB? We trained a 7-channel U-Net **teacher** on RGB + NIR + LiDAR, then used **response-based knowledge distillation (KD)** to pass what it learned to a lightweight 3-channel **student** U-Net that sees RGB alone.

## The paper

The work was published as [**“Efficient Semantic Segmentation: Leveraging Knowledge Distillation for Modality Reduction”**](https://doi.org/10.1109/AEECA65693.2025.00147), co-authored with **Seohoon Jin**, at the **2025 International Conference on Advances in Electrical Engineering and Computer Applications (AEECA)** in Dalian, China (August 22–24, 2025). It was added to IEEE Xplore on January 19, 2026.

[View the paper on IEEE Xplore](https://ieeexplore.ieee.org/document/11327683)

## Data

We used an urban subset of the multi-source vegetation dataset compiled by the **National Geographic Information Institute of Korea (NGII)** and **NASA's GEDI program (2022)**:

- **Size:** 132,000 orthorectified GeoTIFF tiles.
- **Resolution:** $512 \times 512$ pixels per tile at a $10\text{ cm}$ ground sampling distance.
- **Teacher input:** 7 aligned channels
  - 3 RGB channels, normalized to $[0, 1]$
  - 3 NIR channels, normalized to $[0, 1]$
  - 1 LiDAR canopy-height channel ($[1, 16]\text{ m}$, normalized to $[0, 1]$)
- **Student input:** 3 channels, RGB only.
- **Classes:** 6 land-cover types: *coniferous trees*, *broadleaf trees*, *non-forest area* (dominant, over $70\%$ of pixels), *street trees* (under $3\%$), *grassland*, and *shrubs* (under $3\%$).

## How the distillation works

The student learns from two signals at once: the real labels, and the teacher's "soft" predictions, which carry information about how confident the teacher is and which classes it confuses.

<ol class="flow">
  <li><strong>Teacher</strong>The multi-sensor U-Net sees RGB + NIR + LiDAR and produces logits.</li>
  <li><strong>Softening</strong>Both teacher and student logits are divided by a temperature <em>T</em> before the softmax.</li>
  <li><strong>Soft loss</strong>KL divergence measures how far the student's softened output is from the teacher's.</li>
  <li><strong>Hard loss</strong>Ordinary cross-entropy compares the student's predictions with the ground-truth labels.</li>
  <li><strong>Total loss</strong>The two losses are combined with a balance factor α.</li>
</ol>

### Settings

We set $\alpha = 0.5$, so the ground-truth labels and the teacher's guidance count equally.

The temperature was $T = 3$. Softening the distributions this way keeps small probabilities from collapsing to zero, which lets the student pick up subtle distinctions between neighbouring classes, such as where shrubs end and grassland begins.

## Results

We compared four models under the same settings: no data augmentation, Adam optimizer, learning rate $1 \times 10^{-4}$.

### Overall

| Model | Input | mIoU | Macro F1 | Gap closed |
| :--- | :--- | :--- | :--- | :--- |
| **Teacher** (supervised) | RGB + NIR + LiDAR (7 ch) | **0.7132** | **0.8253** | — |
| **Student** (distilled) | RGB only (3 ch) | **0.6002** | **0.7342** | **62.8%** |
| **Baseline** | RGB only (3 ch) | 0.4091 | 0.5206 | — |
| **Baseline** | NIR only (3 ch) | 0.5044 | 0.6366 | — |

The distilled student reaches **0.6002 mIoU**, closing **62.8%** of the gap between the plain RGB baseline and the multi-sensor teacher, while using half as many input channels and no extra sensors.

### Per class (mIoU)

| Class | Teacher (7 ch) | Student (RGB) | Baseline (RGB) | Student vs. baseline |
| :--- | :--- | :--- | :--- | :--- |
| Coniferous trees | 0.5717 | 0.4725 | 0.1447 | **3.26×** |
| Broadleaf trees | 0.7500 | 0.6488 | 0.5120 | **1.26×** |
| Non-forest area | 0.9512 | 0.9164 | 0.8928 | About the same |
| Street trees | 0.5945 | 0.4788 | 0.2547 | **1.88×** |
| Grassland | 0.8111 | 0.7177 | 0.6016 | **1.19×** |
| **Shrubs** | 0.6008 | 0.3671 | 0.0491 | **7.47×** |

### What stood out

1. **Rare classes gained the most.** Small, scattered classes like *shrubs* and *street trees* improved the most. Shrub mIoU went up **7.47×** over the RGB baseline.
2. **Simpler deployment.** The student runs on ordinary RGB images, so there's no need to install, calibrate, and synchronize NIR and LiDAR sensors in the field.
