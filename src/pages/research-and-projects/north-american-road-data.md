---
layout: ../../layouts/Layout.astro
title: "North American Road Data Curation & Auto-Labeling"
description: "A Mapillary-based road-image pipeline using DINOv3 embeddings, FAISS similarity search, and human review for scalable data curation."
date: "2026-07-01"
category: "Computer Vision Infrastructure"
tags: ["Mapillary", "DINOv3", "FAISS", "Data Curation", "Computer Vision"]
---

## Overview

This ongoing project supports the construction of North American road-image data for terrain and chassis-related research. It is a collaboration involving the Hyundai Motor Genesis Chassis Test Team, Vegas, and Korea University's Big Data Mining Lab.

My role is to design the data pipeline and conduct the AI vision research. The central problem is not simply downloading images. The data must match geographic, capture-time, and resolution requirements while avoiding unnecessary duplicates and keeping human validation practical.

## Pipeline design

1. **Conditional collection:** Mapillary API requests are organized around region, capture time, and image-resolution conditions.
2. **Visual representation:** DINOv3 converts road images into feature vectors, which are compact numerical representations of visual content.
3. **Similarity search:** FAISS searches those vectors efficiently to surface visually similar images for screening and organization.
4. **Human review:** A dedicated labeling and review tool lets a person verify selected images before they enter the dataset.

## Engineering focus

The project treats data quality as a system-design problem. Important considerations include API constraints, duplicate and near-duplicate imagery, metadata consistency, and the amount of manual review required. This approach reduces avoidable processing and keeps decisions traceable.

## Current status

The pipeline and review workflow have been under active development since July 2026. This page describes the engineering approach without exposing partner data or confidential implementation details.
