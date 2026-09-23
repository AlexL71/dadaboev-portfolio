---
layout: ../../layouts/Layout.astro
title: "Dodgeball: An Autonomous Ball Launcher"
description: "A Raspberry Pi launcher that tracks a red target with OpenCV, turns to face it, and sets its launch power from the measured distance."
date: "2021-09-15"
category: "Hardware Integration"
tags: ["Computer Vision", "OpenCV", "Raspberry Pi", "Python", "PWM"]
---

## Overview

A typical ball launcher is aimed by hand and fires at one fixed speed, so it's useless against a target that moves. For a core engineering course, our team built **Dodgeball**, a launcher that finds a target on its own, turns to face it, and adjusts how hard it throws based on how far away the target is. It combines real-time vision, closed-loop servo control, and distance-based motor speed control.

## How it works

The system runs two control loops side by side.

<ol class="flow">
  <li><strong>Aim</strong>The Raspberry Pi camera finds the red target. Its horizontal offset from the center of the frame drives a high-torque servo (HS-311) that rotates the launcher platform.</li>
  <li><strong>Measure</strong>An HC-SR04 ultrasonic sensor measures the distance to the target.</li>
  <li><strong>Set power</strong>A mapping function turns that distance into a PWM duty cycle.</li>
  <li><strong>Launch</strong>An L298N H-bridge drives the two DC motor wheels at that speed.</li>
</ol>

### Circuit

The schematic below shows how the Raspberry Pi, servo, L298N motor driver, and sensors are connected.

<div class="schematic"><img src="/images/ball_launcher_circuit.png" alt="Ball launcher circuit schematic" loading="lazy" style="max-width: 600px;" /></div>

## Implementation notes

### Finding the target reliably

Our first version thresholded the image in RGB, and it fell apart as soon as the room lighting changed. Reflections and shadows kept shifting the colors.

Switching to the **HSV color space** fixed this. Hue carries the "redness" separately from brightness, so a tight hue range picks out the target and ignores most of the background noise. From the resulting mask:

- **Centroid:** contour moments give the $(x, y)$ center of the target.
- **Dead band:** if the center is more than $\pm 30$ pixels from the middle of the frame, the servo takes a small step to re-center it. Inside that band it stays still, which prevents jitter.

### Setting launch power

Motor start-up thresholds and friction make the relationship between voltage and throwing distance far from linear. To hit targets reliably between 50 cm and 210 cm, we used a piecewise-linear mapping from the HC-SR04 reading to the PWM duty cycle:

- **Under 50 cm:** the motors stay at a low base duty cycle.
- **50–210 cm:** $\text{Duty} = 10\% + (\text{Distance} - 50) \times 0.05\%$.
- **Over 210 cm:** the motors run at full output.

## Problems we hit

1. **Power dips.** Running the Raspberry Pi, both launch motors, and the servo from one battery pack caused voltage sags that reset the controller.
   - *Fix:* a separate high-current 12 V supply, with independent regulators for the logic and for the motors.
2. **A lopsided platform.** The camera mount and motors sat off-center, so the platform tilted and the servo stalled.
   - *Fix:* we rebuilt the structure from lightweight acrylic and rearranged the weight around the servo's axis to cut the torque load.
3. **Oscillation.** Correcting the servo on every frame made it overshoot and blurred the camera image.
   - *Fix:* a short delay in the control loop, so the servo settles before the next frame is captured.

## Demo video

The launcher tracking the target and firing in real time:

<div class="video">
  <iframe src="https://www.youtube.com/embed/RzG0mym6OIU" title="Dodgeball autonomous ball launcher test" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
