---
layout: ../../layouts/Layout.astro
title: "An 18-DOF Hexapod Robot"
description: "A six-legged walking robot with a tripod gait, ultrasonic obstacle avoidance, and a camera that lets it follow a green marker."
date: "2022-03-20"
category: "Robotics"
tags: ["Embedded Systems", "Arduino", "PCA9685", "C++", "3D Printing"]
---

## Overview

Legged robots can handle rough ground and step over things that would stop a wheeled robot. The price is complexity: many joints have to move in sync, the robot has to stay balanced, and the power supply has to survive all the motors moving at once.

For our capstone design project we built an **18-degree-of-freedom hexapod**. It has a 3D-printed body, an Arduino Uno R3 for control, and a PCA9685 PWM driver for the servos. It walks with a stable gait, avoids obstacles on its own, and uses a camera to follow a colored marker.

## Hardware layout

<ol class="flow">
  <li><strong>Brain</strong>An Arduino Uno R3 generates the gait and reads the sensors.</li>
  <li><strong>Muscles</strong>Over I²C, it drives a PCA9685 16-channel PWM board, which controls 18 SG90 micro servos (three per leg: shoulder, femur, tibia).</li>
  <li><strong>Senses</strong>An HC-SR04 ultrasonic sensor handles obstacle avoidance, and a Raspberry Pi camera tracks a green marker so the robot can follow its owner.</li>
  <li><strong>Power</strong>LM2596 buck converters step an 11.1 V LiPo battery down to 5 V for the servos.</li>
  <li><strong>Face</strong>An 8×8 LED matrix with a MAX7219 driver shows simple expressions (happy, sad, scanning) depending on what the robot is doing.</li>
</ol>

### Circuit

Power distribution, the PCA9685 connections to all 18 servos, and the Arduino interface:

<div class="schematic"><img src="/images/spider_bot_circuit.png" alt="Hexapod robot circuit schematic" loading="lazy" /></div>

## Implementation notes

### Walking with a tripod gait

With 18 joints, staying balanced is the whole game. We used a **tripod gait**: the legs are split into two sets of three (legs 1-3-5 and 2-4-6) that take turns.

- **Swing and stance:** while one set lifts and swings forward, the other stays planted and pushes the body along. The center of mass always sits inside the triangle formed by the three planted feet, so the robot never tips.
- **Fitting it into 2 KB of RAM:** the gait angle tables didn't fit in the Uno's 2 KB of SRAM and caused stack overflows. Moving the static tables into flash memory with `PROGMEM` solved it.

### Power for 18 servos

An SG90 draws little current on average but spikes up to about 800 mA when it starts moving or lifts weight. With 18 of them, peak demand can go past 10 A, which is enough to cook an ordinary regulator.

- **Buck converters:** we built a power board around high-current LM2596 converters that step the 11.1 V LiPo down to a steady 5 V, with up to 3 A continuous per segment.
- **Decoupling capacitors:** large electrolytic capacitors across the servo rails absorb the spikes and stop the controller from resetting.

## Problems we hit

1. **Overheating converters.** The small buck converters we started with shut down from overload whenever the joints met friction.
   - *Fix:* heavier LM2596 converters, the load split across separate power lines, and heat sinks on the driver chips.
2. **Slipping feet.** Bare 3D-printed leg tips had almost no grip, so the robot slid around during turns.
   - *Fix:* rubber tips on the ends of the tibias.
3. **A burned-out PCA9685.** While we were rewiring, back-EMF from the servos sent reverse voltage spikes into the driver and killed some of its pins.
   - *Fix:* P-channel MOSFETs on the power inputs for over-current and reverse-polarity protection.

## Demo video

The hexapod walking, showing expressions, and following a green marker:

<div class="video">
  <iframe src="https://www.youtube.com/embed/ncwSMs6z5Ug" title="18-DOF hexapod robot test" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
