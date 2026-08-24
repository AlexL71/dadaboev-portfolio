---
layout: ../../../layouts/Layout.astro
title: "The Amorphous Bottleneck: Recall-Optimized Ensembles"
description: "A disciplined, agentic engineering approach to anomaly detection in low-contrast, non-rigid structures."
date: "2026-04-15"
category: "Model Architecture"
tags: ["Computer Vision", "Ensemble Learning", "Data-Centric AI", "WBF"]
---

## Overview

Traditional object detection architectures are optimized for "Things" (rigid foreground objects with well-defined boundaries like vehicles or pedestrians). They fail catastrophically when applied to "Stuff" (low-contrast, texture-defined anomalies lacking geometric structure, such as pavement cracks or surface defects). We define this compound failure as the **Amorphous Bottleneck**.

This case study presents a data-centric, recall-optimized ensemble pipeline designed to resolve the Amorphous Bottleneck. Starting with a single Mask R-CNN baseline (ResNet-50-FPN), we train and audit **nineteen augmentation specialists**, fusing their outputs with **Weighted Boxes Fusion (WBF)** and selecting the optimal **6-model team** via a **Greedy Forward Selection (GFS)** algorithm.

## 학회 발표 및 논문 출판 현황

이 연구는 **“The Amorphous Bottleneck: A Recall Optimized Ensemble for Anomaly Detection”**라는 제목으로 **CVGAI 2026**에서 발표했습니다. 발표에서는 일반적인 객체 탐지 모델이 대비가 낮고 형태가 불규칙한 도로 결함을 잘 찾지 못하는 이유를 설명하고, 19개의 데이터 증강 특화 모델과 Greedy Forward Selection, Weighted Boxes Fusion을 결합한 데이터 중심 파이프라인을 소개했습니다. 최종 앙상블은 운영 기준 재현율을 **7.7 퍼센트포인트** 높였으며, 기존 라벨에서 누락된 실제 결함도 찾아냈습니다.

전체 논문은 현재 **SPIE Conference Proceedings**(ISSN 0277-786X) 출판 절차가 진행 중이며, EI Compendex와 Scopus 등재가 예정되어 있습니다. [LinkedIn에서 학회 발표 게시물 보기](https://www.linkedin.com/posts/abdurakhmon-dadaboev_computervision-anomalydetection-machinelearning-activity-7477337404710756353-5TZz).

<div class="project-gallery">
  <figure class="project-figure project-figure-wide">
    <img src="/images/amorphous-bottleneck-overview.jpg" width="800" height="397" alt="Amorphous Bottleneck의 세 가지 연쇄 실패를 설명하는 도식" loading="lazy" />
    <figcaption>Amorphous Bottleneck은 패턴 인식, 라벨 일관성, 평가 단계의 실패가 결합된 문제입니다.</figcaption>
  </figure>
  <figure class="project-figure">
    <img src="/images/amorphous-bottleneck-cvgai-speaker.jpg" width="480" height="319" alt="CVGAI 2026에서 발표하는 다다버예브 압두라흐먼" loading="lazy" />
    <figcaption>CVGAI 2026에서 연구 논문을 발표하는 모습입니다.</figcaption>
  </figure>
  <figure class="project-figure">
    <img src="/images/amorphous-bottleneck-cvgai-audience.jpg" width="480" height="320" alt="CVGAI 2026 청중에게 Amorphous Bottleneck 연구를 설명하는 모습" loading="lazy" />
    <figcaption>학회 청중에게 Things와 Stuff의 차이를 설명하는 장면입니다.</figcaption>
  </figure>
</div>

---

## The Core Mathematical Framework

### 1. Weber Contrast Limitation
To quantify the visual difficulty of the dataset, we calculate the Weber contrast $C_w = |I_{\text{object}} - I_{\text{background}}| / I_{\text{background}}$ of each target anomaly against its immediate background. Across the 9,028 instance annotations, the mean Weber contrast is **0.0824**, and **95.67% of labeled defects sit below the psychophysical detection threshold ($C_w = 0.2$)**. Under this low-contrast regime, human annotation boundaries are highly inconsistent, introducing significant label noise.

### 2. Custom Asymmetric Safety Score
To optimize for recall while keeping false positive accumulation bounded, the GFS algorithm evaluates models on the validation set using an asymmetric Safety Score $S = T_{TP} - \alpha \cdot T_{FP}$ (where $T_{TP}$ is the true positive count, $T_{FP}$ is the false positive count, and $\alpha = 0.1$ reflects that a missed defect is ten times more costly than a false alarm).

---

## Pipeline and Architecture

```mermaid
graph TD
    A[Baseline Mask R-CNN] --> B[Phase I: Train 19 Augmentation Specialists]
    B --> C[Phase II: Hit/Miss Matrix Audit]
    C --> D[Greedy Forward Selection using Safety Score]
    D --> E[Phase III: Weighted Boxes Fusion]
    E --> F[6-Model Optimized Ensemble]
```

### Hit/Miss Matrix Audit
Rather than evaluating models using average precision (AP) which averages out localization details, we execute an instance-level **Hit/Miss audit**. For every validation image and every ground truth bounding box (at $IoU \ge 0.5$), we track:
- **Retained True Positives**: Cases where both baseline and specialist hit the target.
- **Algorithmic Rescues**: Targets missed by the baseline but successfully detected by the specialist.
- **Algorithmic Regressions**: Targets hit by the baseline but missed by the specialist.

---

## Experimental Results

On the held-out test split (591 images, 1,812 ground truth boxes), the final frozen 6-model ensemble (fused at $IoU = 0.55$, confidence threshold $= 0.90$) achieved:

| Metric | Baseline | 6-Model Ensemble | $\Delta$ |
| :--- | :--- | :--- | :--- |
| **mAP@50:95** | 0.5420 | 0.5598 | **+0.0178** |
| **AP@50** | 0.7958 | 0.8033 | **+0.0075** |
| **Operational Recall** (conf > 0.50) | 0.8317 | 0.9089 | **+0.0772** |
| **Optimal F1 Threshold** | 0.75 | 0.90 | **Decisive shift** |

### The 27:1 Rescue-to-Regression Ratio
The instance audit on the test set revealed:
- **135 Algorithmic Rescues** (previously missed defects recovered by the ensemble).
- **5 Algorithmic Regressions** (previously detected defects missed by the ensemble).

This yields a **27:1 rescue-to-regression ratio**, showing that the ensembled augmentations act as highly complementary feature priors.

---

## The Precision Paradox & Ghost Detections

The operational precision of the ensemble drops from 0.7125 to 0.5457 at a threshold of 0.50. To understand this drop, we audited the **168 "Ghost Detections"** (high-confidence ensemble predictions with $IoU < 0.05$ against any ground truth annotation).

A rigorous manual audit of these 168 ghosts across 114 images proved the **Precision Paradox**:
- **95.2% (160/168)** of the "false alarms" were actually valid physical defects that had been missed by human annotators during ground-truth labeling.
- Only **8/168** cases were borderline (dirt, debris, or cement patch textures), and zero cases were actual model hallucinations.

This demonstrates that standard precision metrics penalize AI models when they outperform the noisy human supervision they were trained on, proving that a recall-first, data-centric approach is the only path forward for amorphous defect detection.
