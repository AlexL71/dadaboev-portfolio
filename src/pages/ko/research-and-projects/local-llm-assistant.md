---
layout: ../../../layouts/Layout.astro
title: "Local LLM Assistant: Private Offline Chat"
description: "A private, offline AI assistant running on a mobile phone, powered by a local DeepSeek-7B model hosted on a PC via FastAPI and Ollama."
date: "2025-04-15"
category: "AI & Mobile Integration"
tags: ["Flutter", "FastAPI", "DeepSeek", "Ollama", "Mobile Development", "Python"]
---

## Overview

Most modern AI assistants rely heavily on cloud APIs, which raises concerns about data privacy, connectivity dependencies, and API usage costs. To address these issues, **Local LLM Assistant** is a private, completely offline AI assistant ecosystem that lives on your mobile phone, powered by a local large language model running on your personal computer. 

By keeping all computations within a local network (Wi-Fi or hotspot), the system guarantees zero data leaks, zero cloud latency, and no usage boundaries.

---

## System Architecture

```mermaid
graph LR
    A[Flutter Mobile App] -->|Local Wi-Fi / Hotspot| B[FastAPI Server on PC]
    B -->|Local Request| C[Ollama Engine]
    C -->|DeepSeek-7B Inference| B
    B -->|JSON Response| A
```

The system is split into three main components:
1. **Frontend Mobile Client**: A clean, responsive mobile chat interface built with **Flutter (Dart)** that runs on any Android or iOS device.
2. **Backend API Gateway**: A high-performance **FastAPI (Python)** server running on a local PC, routing network requests and managing connection handshakes.
3. **Local LLM Inference Engine**: A local instance of **Ollama** running the **DeepSeek-7B** model on the host PC's GPU.

---

## Technical Features

### 1. Flutter Mobile Client
- **Wi-Fi Handshake**: Automatically scans the local network subnet to locate the active FastAPI server IP, resolving connectivity without requiring manual user configuration.
- **Fluid Chat UI**: Designed with clean message bubbles, typing indicators, and markdown rendering support for code and structured text formatting.

### 2. FastAPI Request Routing
- **Asynchronous Gateways**: Built with Python `asyncio` and `httpx` to handle concurrent connections from multiple mobile devices in the same local network.
- **Clean API Spec**: Exposes structured JSON endpoints that format mobile chat history into Ollama-compatible payload dictionaries, maintaining context across conversation turns.

### 3. Local Inference Engine
- Uses **Ollama** as the local deployment runner to orchestrate model quantization and hardware-accelerated inference.
- Powered by the **DeepSeek-7B** model, optimizing response speeds and accuracy for offline text completion, summarization, and coding tasks.

---

## Key Benefits
- **Absolute Privacy**: No user text, metadata, or document data ever leaves the local network, making it safe for confidential tasks.
- **Zero Operating Cost**: Leverages local desktop hardware, bypassing commercial API subscription models.
- **Offline Reliability**: Operates independently of internet service availability, requiring only a local router or hotspot connection.

---

## GitHub Repository
Explore the complete source code, deployment scripts, and Flutter project files on GitHub:
👉 [AlexL71/local-llm-chat](https://github.com/AlexL71/local-llm-chat)
