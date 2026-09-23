---
layout: ../../../layouts/Layout.astro
title: "Amorphous Bottleneck: 재현율 중심 앙상블"
description: "일반적인 탐지 모델이 흐릿하고 형태 없는 도로 결함을 놓치는 이유와, 증강 전문 모델 앙상블로 그 결함 대부분을 되찾은 과정입니다."
date: "2026-04-15"
category: "모델 아키텍처"
tags: ["컴퓨터 비전", "앙상블 학습", "데이터 중심 AI", "WBF"]
---

## 개요

대부분의 객체 탐지 모델은 자동차나 사람처럼 경계가 분명한 *사물*(things)을 찾도록 만들어져 있습니다. 그런데 도로 균열이나 표면 결함은 오히려 *재질*(stuff)에 가깝습니다. 대비가 낮고, 질감으로만 구분되며, 일정한 형태가 없습니다. 사물용 탐지기가 이런 대상을 만나면 문제가 한꺼번에 터집니다. 모델은 패턴을 잘 못 보고, 라벨러마다 결함의 경계를 다르게 그리고, 평소 쓰던 지표도 실제 성능을 제대로 보여 주지 못합니다. 저는 이 세 가지가 겹친 상태를 **Amorphous Bottleneck**이라고 부릅니다.

이 프로젝트는 이 문제를 데이터 쪽에서 풀었습니다. Mask R-CNN(ResNet-50-FPN) 기준 모델 하나에서 출발해 **증강 기법별 전문 모델 19개**를 학습하고, 각 모델을 기준 모델과 결함 단위로 비교했습니다. 그다음 **Greedy Forward Selection**(GFS)으로 **6개 모델 조합**을 고르고, **Weighted Boxes Fusion**(WBF)으로 예측을 합쳤습니다.

## 발표 및 출판

이 연구는 **CVGAI 2026**에서 “**The Amorphous Bottleneck: A Recall Optimized Ensemble for Anomaly Detection**”이라는 제목으로 발표했습니다. 일반적인 탐지 모델이 흐릿하고 불규칙한 도로 결함에 약한 이유와 파이프라인 구성을 설명했습니다. 최종 앙상블은 운영 재현율을 **7.7%p** 높였고, 원래 라벨에서 빠져 있던 실제 결함도 찾아냈습니다.

전체 논문은 **SPIE Conference Proceedings**(ISSN 0277-786X) 출판 절차를 밟고 있으며, EI Compendex와 Scopus 등재가 예정되어 있습니다. [LinkedIn에 올린 학회 후기](https://www.linkedin.com/posts/abdurakhmon-dadaboev_computervision-anomalydetection-machinelearning-activity-7477337404710756353-5TZz)도 있습니다.

<div class="project-gallery">
  <figure class="project-figure project-figure-wide">
    <img src="/images/amorphous-bottleneck-overview.jpg" width="800" height="397" alt="Amorphous Bottleneck의 세 가지 실패 요인을 보여 주는 다이어그램" loading="lazy" />
    <figcaption>Amorphous Bottleneck: 패턴 인식, 라벨 일관성, 평가가 동시에 무너집니다.</figcaption>
  </figure>
  <figure class="project-figure">
    <img src="/images/amorphous-bottleneck-cvgai-speaker.jpg" width="480" height="319" alt="CVGAI 2026에서 발표하는 다다버예브 압두라흐먼" loading="lazy" />
    <figcaption>CVGAI 2026 발표 모습.</figcaption>
  </figure>
  <figure class="project-figure">
    <img src="/images/amorphous-bottleneck-cvgai-audience.jpg" width="480" height="320" alt="Amorphous Bottleneck 발표를 듣는 CVGAI 2026 청중" loading="lazy" />
    <figcaption>청중에게 ‘사물’과 ‘재질’의 차이를 설명하는 장면.</figcaption>
  </figure>
</div>

## 데이터가 얼마나 어려운지, 숫자로 보면

### 대비

결함이 실제로 얼마나 눈에 띄는지 보기 위해, 라벨링된 결함마다 주변 배경과의 Weber 대비 $C_w = |I_{\text{object}} - I_{\text{background}}| / I_{\text{background}}$를 계산했습니다. 9,028개 인스턴스의 평균은 **0.0824**였고, **결함의 95.67%가 일반적인 시인성 기준인 $C_w = 0.2$보다 낮았습니다**. 대비가 이렇게 낮으면 사람도 경계를 일관되게 그리기 어렵기 때문에, 라벨 자체에 잡음이 많이 섞입니다.

### 재현율을 우선하는 점수

도로 점검에서는 결함 하나를 놓치는 것이 오탐 하나보다 훨씬 치명적입니다. 그래서 GFS는 검증 세트에서 비대칭 안전 점수 $S = T_{TP} - \alpha \cdot T_{FP}$로 모델을 평가합니다. $T_{TP}$와 $T_{FP}$는 참 양성과 거짓 양성의 개수이고 $\alpha = 0.1$입니다. 즉, 결함 하나를 놓치는 것을 오탐 하나보다 열 배 나쁘게 봅니다.

## 파이프라인

<ol class="flow">
  <li><strong>기준 모델</strong>Mask R-CNN(ResNet-50-FPN) 하나를 학습합니다.</li>
  <li><strong>전문 모델</strong>증강 기법을 달리한 모델 19개를 학습합니다.</li>
  <li><strong>탐지/누락 감사</strong>정답 결함 하나하나에 대해 각 전문 모델을 기준 모델과 비교합니다.</li>
  <li><strong>조합 선택</strong>Greedy Forward Selection으로 모델을 하나씩 추가하며, 안전 점수를 높이는 모델만 남깁니다.</li>
  <li><strong>융합</strong>선택된 6개 모델의 예측을 Weighted Boxes Fusion으로 합칩니다.</li>
</ol>

### 탐지/누락 감사

평균 정밀도(AP)는 모든 결과를 숫자 하나로 뭉뚱그리기 때문에, 모델이 *어떤* 결함을 찾는지 알 수 없습니다. 그래서 검증 이미지마다, 정답 박스마다($IoU \ge 0.5$) 다음 세 가지를 기록했습니다.

- **유지:** 기준 모델과 전문 모델이 모두 찾은 결함
- **구조(rescue):** 기준 모델은 놓쳤지만 전문 모델이 찾은 결함
- **퇴보(regression):** 기준 모델은 찾았지만 전문 모델이 놓친 결함

이 표를 보면 어떤 증강이 정말 서로를 보완하는지, 어떤 증강이 잡음만 더하는지 한눈에 드러났습니다.

## 결과

홀드아웃 테스트 세트(이미지 591장, 정답 박스 1,812개)에서, $IoU = 0.55$와 신뢰도 임계값 $0.90$으로 융합한 최종 6개 모델 앙상블의 결과는 다음과 같습니다.

| 지표 | 기준 모델 | 6개 모델 앙상블 | 변화 |
| :--- | :--- | :--- | :--- |
| **mAP@50:95** | 0.5420 | 0.5598 | **+0.0178** |
| **AP@50** | 0.7958 | 0.8033 | **+0.0075** |
| **운영 재현율** (conf > 0.50) | 0.8317 | 0.9089 | **+0.0772** |
| **최적 F1 임계값** | 0.75 | 0.90 | 상향 이동 |

### 퇴보 1건당 구조 27건

테스트 세트의 결함 단위 감사 결과:

- **구조 135건:** 기준 모델이 놓쳤지만 앙상블이 찾은 결함
- **퇴보 5건:** 기준 모델이 찾았지만 앙상블이 놓친 결함

비율로 **27 : 1** 입니다. 증강 기법마다 모델이 실제로 서로 다른 것을 배운다는 뜻으로 볼 수 있습니다.

## ‘오탐’이 사실은 정답이었을 때

임계값 0.50에서 앙상블의 정밀도는 0.7125에서 0.5457로 떨어집니다. 처음엔 나빠 보이는 숫자입니다. 원인을 알아보려고, **어떤 정답 박스와도 거의 겹치지 않는($IoU < 0.05$) 고신뢰도 예측 168건**을 뽑아 이미지 114장에서 하나씩 직접 확인했습니다.

- **168건 중 160건**(95.2%)은 라벨러가 놓친 실제 결함이었습니다.
- 나머지 **8건**은 흙, 이물질, 시멘트 보수 흔적처럼 균열과 매우 비슷해 보이는 애매한 경우였습니다.
- 모델이 없는 것을 지어낸 경우는 한 건도 없었습니다.

즉, 정밀도 하락의 상당 부분은 모델이 아니라 라벨에서 비롯된 것입니다. 정답 데이터에 잡음이 이 정도로 많으면, 정밀도는 라벨보다 나은 모델에게 오히려 벌점을 줍니다. 흐릿하고 형태 없는 결함을 다룰 때는 재현율을 우선하고, 데이터셋 자체도 점검하고 고쳐야 할 대상으로 봐야 한다고 생각합니다.
