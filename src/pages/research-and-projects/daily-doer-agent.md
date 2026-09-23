---
layout: ../../layouts/Layout.astro
title: "DailyDoer: A Telegram Assistant"
description: "A Python Telegram bot built on Gemini that schedules events, sends email, summarizes news, and understands voice messages."
date: "2025-06-15"
category: "Conversational AI"
tags: ["Gemini API", "Telegram Bot", "Google APIs", "Python", "Web Scraping"]
---

## Overview

I was tired of jumping between a calendar, an inbox, and a dozen news tabs every morning. **DailyDoer** is a Telegram bot that pulls those jobs into one chat.

You write or say what you want in plain language, and the bot uses the Google Gemini API to work out what you mean. It can then add a calendar event, send an email, transcribe a voice note, or summarize an article.

## How a request flows

<ol class="flow">
  <li><strong>Message</strong>You send a text or voice message to the bot on Telegram.</li>
  <li><strong>Transcription</strong>Voice messages go through Google Cloud Speech-to-Text first.</li>
  <li><strong>Understanding</strong>Gemini reads the text and returns the intent plus the details it needs: who, when, what.</li>
  <li><strong>Action</strong>The Python core calls the Gmail API, the Google Calendar API, or the news scraper.</li>
  <li><strong>Reply</strong>The bot confirms what it did in the same chat.</li>
</ol>

## Features

### Understanding plain language

The bot uses **Gemini (`gemini-1.5-flash-latest`)** as a zero-shot intent classifier. A message like *“Set up a sync with the team tomorrow at 2 PM”* becomes a structured API call with the date, time, attendees, and description filled in.

### Voice commands

Voice notes are transcribed with the **Google Cloud Speech-to-Text API** (`google-cloud-speech`) and then handled exactly like typed messages, so you can use the bot hands-free.

### Calendar and email

- **Calendar:** lists events, spots conflicts, and creates new events with start and end times through the **Google Calendar API**.
- **Email:** drafts and sends mail through the **Gmail API** using OAuth2 (`credentials.json`, `token.json`).

### News digest

- Pulls the text of any article link with **`newspaper3k`** and **`httpx`**.
- A **BeautifulSoup4** scraper collects headlines from a few preset news homepages. Gemini summarizes them, and the bot sends a short daily digest.

## Problems I hit

1. **Scrapers kept breaking.** News sites change their HTML often, so CSS selectors in BeautifulSoup4 kept failing.
   - *Fix:* I let `newspaper3k`, which is much better at finding the main text, handle article extraction, and kept BeautifulSoup4 only for collecting links from homepages.
2. **Re-authenticating all the time.** Gmail and Calendar tokens expire, and logging in again every time got old quickly.
   - *Fix:* tokens are stored locally in `token.json` and refreshed automatically. The bot asks you to sign in again only when a token is revoked or can't be refreshed.

## Source code

Setup instructions, credential guide, and the full Python source are on GitHub: [AlexL71/Daily-Doer---Agent](https://github.com/AlexL71/Daily-Doer---Agent)
