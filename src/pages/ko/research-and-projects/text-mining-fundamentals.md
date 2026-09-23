---
layout: ../../../layouts/Layout.astro
title: "Python으로 배우는 텍스트 마이닝 기초"
description: "조교로 일하며 만든 실습 과정입니다. 웹 스크래핑과 단어 빈도부터 토픽 모델, LSTM 감성 분석까지 다룹니다."
date: "2025-12-15"
category: "교육 · 자연어 처리"
tags: ["자연어 처리", "교육 과정 설계", "Jupyter", "Kiwi"]
---

## 개요

텍스트 마이닝은 정리되지 않은 텍스트와 모델이 필요로 하는 구조화된 데이터 사이를 잇는 일입니다. 조교를 하면서 보니 학생들이 막히는 지점은 대개 두 군데였습니다. 실습 환경을 설정하는 단계, 그리고 tf-idf 행렬에서 신경망 임베딩으로 넘어가는 단계였습니다.

두 가지를 모두 돕기 위해 고려대학교 **빅데이터사이언스학부** 수업용으로 **Python으로 배우는 텍스트 마이닝 기초**를 만들었습니다. 텍스트 마이닝의 전체 흐름을 다루는 과제 중심의 Jupyter 노트북 11개로 구성했고, 교재 *『잡아라! 텍스트마이닝 with 파이썬』*을 따라갑니다.

## 과정 구성

노트북은 네 부분으로 나뉩니다.

<ol class="flow">
  <li><strong>데이터 모으기</strong>웹 스크래핑(<code>Crawling.ipynb</code>)</li>
  <li><strong>세고 사전으로 분석하기</strong>단어 빈도, 감성 사전, 동시 출현 분석</li>
  <li><strong>문서 묶기</strong>분할 군집과 계층적 군집</li>
  <li><strong>의미 다루기</strong>LDA 토픽 모델, Word2Vec 임베딩, LSTM 감성 분석</li>
</ol>

### 노트북별 내용

1. **스크래핑(`Crawling.ipynb`):** `requests`와 BeautifulSoup으로 HTTP 요청을 보내고 HTML을 파싱합니다.
2. **단어 빈도(`Word Frequency Analysis.ipynb`):** 토큰화, 불용어 제거, NLTK와 Matplotlib을 이용한 빈도 시각화
3. **사전 기반 감성 분석(`Simple sentiment analysis.ipynb`, `Sentiment Analysis.ipynb`):** AFINN과 직접 만든 사전으로 감성 점수를 매깁니다.
4. **동시 출현(`Co-occurrence Frequency Analysis.ipynb`):** 단어 동시 출현 행렬을 만들고 NetworkX로 단어 네트워크를 그립니다.
5. **유사도(`Association Analysis with TF-IDF & Cosine Similarity.ipynb`):** TF-IDF 가중치와 문서 간 코사인 유사도를 계산합니다.
6. **군집 분석(`Partitional Clustering.ipynb`, `Hierarchical Clustering.ipynb`):** scikit-learn과 SciPy로 K-평균과 병합 군집을 실습합니다.
7. **단어 임베딩(`Association Analysis with Word2Vec.ipynb`):** Gensim으로 CBOW와 skip-gram 모델을 학습합니다.
8. **토픽 모델링(`LDA Topic Modeling.ipynb`):** 잠재 디리클레 할당(LDA)으로 문서 집합에 숨은 주제를 찾습니다.
9. **딥러닝(`LSTM-based Sentiment Analysis.ipynb`):** TensorFlow/Keras로 LSTM 네트워크를 만들어 패딩한 토큰 시퀀스의 감성을 분류합니다.

## 누구의 컴퓨터에서든 똑같이 돌아가게

수업을 가장 빨리 망치는 말은 “제 컴퓨터에서는 되는데요”입니다. 그래서 과정은 모든 학생이 똑같이 따라 하는 환경 설정으로 시작합니다.

### Conda 환경

```bash
# 1. 깨끗한 가상 환경 만들기
conda create -n textmining python=3.9 -y

# 2. 환경 활성화
conda activate textmining

# 3. Jupyter 지원 설치
pip install ipykernel notebook

# 4. 이 환경을 Jupyter 커널로 등록
python -m ipykernel install --user --name textmining --display-name "Python (textmining)"
```

### 의존성

`requirements.txt`에 주요 라이브러리 버전을 고정했습니다.

- **기본:** `numpy`, `pandas`, `scipy`
- **시각화:** `matplotlib`, `seaborn`, `wordcloud`
- **머신러닝:** `scikit-learn`, `pyclustering`, `networkx`
- **자연어 처리:** `nltk`, `gensim`, `afinn`
- **딥러닝:** `tensorflow`
- **스크래핑:** `beautifulsoup4`, `requests`
- **한국어 처리:** `kiwipiepy`(Kiwi 형태소 분석기)
