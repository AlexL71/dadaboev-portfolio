---
layout: ../../../layouts/Layout.astro
title: "로컬 LLM 어시스턴트: 내 휴대폰 속 비공개 채팅"
description: "내 PC에서 FastAPI와 Ollama로 돌리는 DeepSeek-7B에 Flutter 앱으로 접속합니다. 데이터는 집 안 네트워크를 벗어나지 않습니다."
date: "2025-04-15"
category: "AI · 모바일"
tags: ["Flutter", "FastAPI", "DeepSeek", "Ollama", "Python"]
---

## 개요

대부분의 AI 어시스턴트는 입력한 내용을 전부 클라우드 API로 보냅니다. 개인정보가 걱정되고, 인터넷이 없으면 쓸 수 없고, 사용료도 계속 쌓입니다. 이런 것 없이 어디까지 할 수 있는지 직접 해 보고 싶었습니다.

**로컬 LLM 어시스턴트**는 휴대폰의 채팅 앱이 제 컴퓨터에서 돌아가는 언어 모델과 대화하는 구조입니다. 모든 통신이 집 와이파이나 휴대폰 핫스팟 같은 로컬 네트워크 안에서만 이루어지기 때문에, 데이터가 밖으로 나가지 않고, 클라우드를 거치는 지연도 없고, 사용량 제한도 없습니다.

## 구성

<ol class="flow">
  <li><strong>휴대폰 앱</strong>Android와 iOS에서 쓰는 Flutter(Dart) 채팅 앱입니다.</li>
  <li><strong>로컬 네트워크</strong>앱은 와이파이나 핫스팟을 통해 PC와 통신합니다.</li>
  <li><strong>API 서버</strong>PC의 FastAPI(Python) 서버가 요청을 받고 대화 맥락을 관리합니다.</li>
  <li><strong>모델</strong>Ollama가 PC의 GPU에서 DeepSeek-7B를 실행하고 답을 JSON으로 돌려줍니다.</li>
</ol>

## 세부 구현

### Flutter 앱

- **서버 자동 찾기:** 앱이 로컬 서브넷을 스캔해 FastAPI 서버를 찾기 때문에 IP 주소를 직접 입력할 필요가 없습니다.
- **채팅 화면:** 말풍선, 입력 중 표시, 코드와 서식 있는 글을 위한 마크다운 렌더링을 지원합니다.

### FastAPI 서버

- **비동기 처리:** `asyncio`와 `httpx`로 만들어서, 같은 네트워크의 여러 기기가 동시에 쓸 수 있습니다.
- **간단한 API:** JSON 엔드포인트가 휴대폰의 대화 기록을 Ollama 요청 형식으로 바꿔 주기 때문에, 모델이 대화 맥락을 이어 갑니다.

### 모델

- **Ollama**가 PC에서 양자화와 GPU 가속 추론을 맡습니다.
- **DeepSeek-7B**는 요약, 일반 질문, 코딩 도움에서 속도와 품질의 균형이 좋았습니다. 모두 오프라인으로 돌아갑니다.

## 왜 이렇게 만들었나

- **개인정보:** 프롬프트, 메타데이터, 문서가 로컬 네트워크 밖으로 나가지 않아 민감한 자료도 다룰 수 있습니다.
- **운영 비용 없음:** 이미 가진 하드웨어로 돌아가니 API 구독료가 들지 않습니다.
- **오프라인 동작:** 인터넷 없이 공유기나 핫스팟만 있으면 됩니다.

## 소스 코드

Flutter 프로젝트, 서버 코드, 설치 스크립트는 GitHub에 있습니다: [AlexL71/local-llm-chat](https://github.com/AlexL71/local-llm-chat)
