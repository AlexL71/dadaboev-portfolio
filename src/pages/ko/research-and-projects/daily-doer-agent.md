---
layout: ../../../layouts/Layout.astro
title: "DailyDoer: 텔레그램 비서 봇"
description: "Gemini 기반 Python 텔레그램 봇으로, 일정 등록, 이메일 발송, 뉴스 요약, 음성 명령 처리를 한 채팅창에서 해결합니다."
date: "2025-06-15"
category: "대화형 AI"
tags: ["Gemini API", "텔레그램 봇", "Google API", "Python", "웹 스크래핑"]
---

## 개요

매일 아침 캘린더, 메일함, 뉴스 탭 여러 개를 오가는 게 번거로웠습니다. **DailyDoer**는 그 일들을 텔레그램 채팅 하나로 모은 봇입니다.

평소 말투로 글을 쓰거나 말을 하면, 봇이 Google Gemini API로 무슨 뜻인지 파악합니다. 그런 다음 일정을 추가하거나, 메일을 보내거나, 음성 메시지를 받아 적거나, 기사를 요약합니다.

## 요청이 처리되는 흐름

<ol class="flow">
  <li><strong>메시지</strong>텔레그램으로 봇에게 글이나 음성 메시지를 보냅니다.</li>
  <li><strong>받아쓰기</strong>음성 메시지는 먼저 Google Cloud Speech-to-Text로 텍스트가 됩니다.</li>
  <li><strong>이해</strong>Gemini가 텍스트를 읽고 의도와 필요한 정보(누구, 언제, 무엇)를 돌려줍니다.</li>
  <li><strong>실행</strong>Python 코어가 Gmail API, Google Calendar API, 뉴스 스크래퍼 중 필요한 것을 호출합니다.</li>
  <li><strong>답장</strong>봇이 같은 채팅창에서 처리 결과를 알려 줍니다.</li>
</ol>

## 기능

### 평소 말투 이해하기

**Gemini**(`gemini-1.5-flash-latest`)를 제로샷 의도 분류기로 씁니다. “*내일 오후 2시에 팀 회의 잡아 줘*” 같은 메시지가 날짜, 시간, 참석자, 설명이 채워진 API 호출로 바뀝니다.

### 음성 명령

음성 메시지는 **Google Cloud Speech-to-Text API**(`google-cloud-speech`)로 받아 적은 뒤 글로 쓴 메시지와 똑같이 처리합니다. 손을 쓰지 않고도 봇을 쓸 수 있습니다.

### 캘린더와 이메일

- **캘린더:** **Google Calendar API**로 일정을 조회하고, 겹치는 일정을 찾고, 시작·종료 시간을 넣어 새 일정을 만듭니다.
- **이메일:** OAuth2 인증(`credentials.json`, `token.json`)을 거쳐 **Gmail API**로 메일을 작성하고 보냅니다.

### 뉴스 요약

- 기사 링크를 보내면 **`newspaper3k`** 와 **`httpx`** 로 본문을 가져옵니다.
- **BeautifulSoup4** 스크래퍼가 미리 정해 둔 뉴스 사이트 첫 화면에서 기사들을 모으면, Gemini가 요약하고 봇이 짧은 일일 브리핑으로 보내 줍니다.

## 부딪힌 문제들

1. **자꾸 깨지는 스크래퍼.** 뉴스 사이트는 HTML 구조를 자주 바꾸기 때문에 BeautifulSoup4의 CSS 선택자가 계속 실패했습니다.
   - *해결:* 본문 추출은 이 일을 훨씬 잘하는 `newspaper3k`에 맡기고, BeautifulSoup4는 첫 화면에서 링크를 모으는 용도로만 썼습니다.
2. **계속되는 재로그인.** Gmail과 캘린더 토큰이 만료될 때마다 다시 로그인하는 게 금방 지겨워졌습니다.
   - *해결:* 토큰을 `token.json`에 저장해 자동으로 갱신하고, 토큰이 취소됐거나 갱신이 안 될 때만 다시 로그인하도록 했습니다.

## 소스 코드

설치 방법, 인증 설정 안내, 전체 Python 코드는 GitHub에 있습니다: [AlexL71/Daily-Doer---Agent](https://github.com/AlexL71/Daily-Doer---Agent)
