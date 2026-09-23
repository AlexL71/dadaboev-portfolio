---
layout: ../../layouts/Layout.astro
title: "Text Mining Fundamentals with Python"
description: "A hands-on course I built as a teaching assistant, from web scraping and word counts to topic models and LSTM sentiment analysis."
date: "2025-12-15"
category: "Teaching / NLP"
tags: ["NLP", "Course Design", "Jupyter", "Kiwi"]
---

## Overview

Text mining sits right between messy raw text and the structured data that models need. When I was a teaching assistant, I noticed students usually got stuck in two places: setting up their environment, and making the jump from tf-idf matrices to neural embeddings.

To help with both, I built **Text Mining Fundamentals with Python** for the Department of Big Data Science at **Korea University**. It's a set of 11 task-focused Jupyter notebooks that cover the whole text-mining workflow, and it follows the Korean textbook *"잡아라! 텍스트마이닝 with 파이썬"*.

## What the course covers

The notebooks are grouped into four parts:

<ol class="flow">
  <li><strong>Getting data</strong>Web scraping (<code>Crawling.ipynb</code>).</li>
  <li><strong>Counting and lexicons</strong>Word frequencies, sentiment dictionaries, and co-occurrence.</li>
  <li><strong>Grouping documents</strong>Partitional and hierarchical clustering.</li>
  <li><strong>Meaning</strong>LDA topic models, Word2Vec embeddings, and LSTM sentiment networks.</li>
</ol>

### Notebook by notebook

1. **Scraping (`Crawling.ipynb`):** sending HTTP requests and parsing HTML with `requests` and BeautifulSoup.
2. **Word frequencies (`Word Frequency Analysis.ipynb`):** tokenizing, removing stop words, and plotting frequencies with NLTK and Matplotlib.
3. **Lexicon-based sentiment (`Simple sentiment analysis.ipynb`, `Sentiment Analysis.ipynb`):** scoring text with AFINN and custom dictionaries.
4. **Co-occurrence (`Co-occurrence Frequency Analysis.ipynb`):** building word co-occurrence matrices and word networks with NetworkX.
5. **Similarity (`Association Analysis with TF-IDF & Cosine Similarity.ipynb`):** computing TF-IDF weights and cosine similarity between documents.
6. **Clustering (`Partitional Clustering.ipynb`, `Hierarchical Clustering.ipynb`):** K-means and agglomerative clustering with scikit-learn and SciPy.
7. **Word embeddings (`Association Analysis with Word2Vec.ipynb`):** training CBOW and skip-gram models with Gensim.
8. **Topic modeling (`LDA Topic Modeling.ipynb`):** finding hidden topics in a collection with Latent Dirichlet Allocation.
9. **Deep learning (`LSTM-based Sentiment Analysis.ipynb`):** an LSTM network in TensorFlow/Keras that classifies sentiment from padded token sequences.

## Making it run on every laptop

Nothing kills a class faster than "it works on my machine," so the course starts with a fixed setup that every student follows.

### Conda environment

```bash
# 1. Create a clean environment
conda create -n textmining python=3.9 -y

# 2. Activate it
conda activate textmining

# 3. Install Jupyter support
pip install ipykernel notebook

# 4. Register the environment as a Jupyter kernel
python -m ipykernel install --user --name textmining --display-name "Python (textmining)"
```

### Dependencies

`requirements.txt` pins the main libraries:

- **Core:** `numpy`, `pandas`, `scipy`
- **Plots:** `matplotlib`, `seaborn`, `wordcloud`
- **Machine learning:** `scikit-learn`, `pyclustering`, `networkx`
- **NLP:** `nltk`, `gensim`, `afinn`
- **Deep learning:** `tensorflow`
- **Scraping:** `beautifulsoup4`, `requests`
- **Korean NLP:** `kiwipiepy` (the Kiwi morphological analyzer)
