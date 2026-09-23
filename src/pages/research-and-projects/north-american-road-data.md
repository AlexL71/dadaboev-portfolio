---
layout: ../../layouts/Layout.astro
title: "North American Road Data Curation and Auto-Labeling"
description: "A Mapillary-based pipeline that uses DINOv3 embeddings, FAISS similarity search, and human review to build a road-image dataset."
date: "2026-07-01"
category: "Data Pipeline"
tags: ["Mapillary", "DINOv3", "FAISS", "Data Curation"]
---

## Overview

This ongoing project builds a North American road-image dataset for research on terrain and vehicle chassis. It's a collaboration between the Hyundai Motor Genesis Chassis Test Team, Vegas, and the Big Data Mining Lab at Korea University.

I design the data pipeline and lead the vision side. The hard part isn't downloading images. It's making sure every image matches the required region, capture time, and resolution, avoiding a flood of near-duplicates, and keeping the human review step small enough that people can actually do it.

## Pipeline

<ol class="flow">
  <li><strong>Filtered collection</strong>Requests to the Mapillary API are built around region, capture time, and minimum resolution.</li>
  <li><strong>Embeddings</strong>DINOv3 turns each road image into a feature vector, a compact numeric summary of what the image shows.</li>
  <li><strong>Similarity search</strong>FAISS searches those vectors quickly, grouping visually similar scenes and flagging near-duplicates.</li>
  <li><strong>Human review</strong>A small labeling and review tool lets a person confirm each selected image before it goes into the dataset.</li>
</ol>

## What I focus on

I treat data quality as a design problem, not a clean-up job at the end. That means thinking early about API limits, duplicate and near-duplicate images, inconsistent metadata, and how much manual review the process will need. Getting those right up front avoids wasted processing and makes every decision easy to trace later.

## Status

The pipeline and review workflow have been in active development since July 2026. This page describes the approach only; partner data and confidential implementation details are left out.
