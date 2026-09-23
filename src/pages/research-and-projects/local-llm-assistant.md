---
layout: ../../layouts/Layout.astro
title: "Local LLM Assistant: Private Chat on My Phone"
description: "A Flutter app that talks to DeepSeek-7B running on my own PC through FastAPI and Ollama, so nothing leaves the local network."
date: "2025-04-15"
category: "AI & Mobile"
tags: ["Flutter", "FastAPI", "DeepSeek", "Ollama", "Python"]
---

## Overview

Most AI assistants send everything you type to a cloud API. That raises questions about privacy, it stops working without internet, and the usage bills add up. I wanted to see how far I could get without any of that.

**Local LLM Assistant** is a chat app on my phone that talks to a language model running on my own computer. Everything stays on the local network (home Wi-Fi or a phone hotspot), so no data leaves it, there is no cloud round trip, and there's no usage limit.

## How it fits together

<ol class="flow">
  <li><strong>Phone app</strong>A Flutter (Dart) chat app for Android or iOS.</li>
  <li><strong>Local network</strong>The app talks to the PC over Wi-Fi or a hotspot.</li>
  <li><strong>API server</strong>A FastAPI (Python) server on the PC receives the request and keeps track of the conversation.</li>
  <li><strong>Model</strong>Ollama runs DeepSeek-7B on the PC's GPU and returns the answer as JSON.</li>
</ol>

## Details

### The Flutter app

- **Finding the server:** the app scans the local subnet for the FastAPI server, so there's no IP address to type in.
- **Chat UI:** message bubbles, a typing indicator, and Markdown rendering for code and formatted text.

### The FastAPI server

- **Async handling:** built on `asyncio` and `httpx`, so several devices on the same network can use it at once.
- **Simple API:** JSON endpoints turn the phone's chat history into Ollama's request format, so the model keeps the context of the conversation.

### The model

- **Ollama** handles quantization and GPU-accelerated inference on the PC.
- **DeepSeek-7B** gave a good balance of speed and quality for summaries, general questions, and coding help, all offline.

## Why bother

- **Privacy:** no prompts, metadata, or documents leave the local network, so it's fine for confidential material.
- **No running costs:** it runs on hardware I already own, with no API subscription.
- **Works offline:** all it needs is a router or a hotspot, not an internet connection.

## Source code

The Flutter project, server code, and setup scripts are on GitHub: [AlexL71/local-llm-chat](https://github.com/AlexL71/local-llm-chat)
