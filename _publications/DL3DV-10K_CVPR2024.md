---
title: "DL3DV-10K: A Large-Scale Scene Dataset for Deep Learning-based 3D Vision"
collection: publications
permalink: /publication/DL3DV-10K_CVPR2024
excerpt: 'Present a 10K real-world scene benchmark dataset for 3D vision.'
date: 2024-06-01
venue: '41st Computer Vision and Pattern Recognition Conference (CVPR)'
paperurl: 'http://jackal092927.github.io/files/DL3DV-10K_CVPR2024.pdf'
---

## Abstract

We have witnessed significant progress in deep learning-based 3D vision, ranging from neural radiance field (NeRF) based 3D representation learning to applications in novel view synthesis (NVS). However, existing scene-level datasets—limited to either synthetic environments or a narrow selection of real-world scenes—are insufficient. This gap hinders comprehensive benchmarking and caps what could be explored in 3D analysis. To address this, we present **DL3DV-10K**, a large-scale scene dataset featuring 51.2 million frames from 10,510 videos captured across 65 types of points of interest, covering bounded and unbounded scenes with diverse reflection, transparency, and lighting. We benchmark recent NVS methods on DL3DV-10K and report insights for future research, including a pilot study on generalizable NeRF that underscores the need for large-scale scene-level data.

---

## The Challenge: Data Scarcity in 3D Vision

Existing scene-level datasets are often limited to synthetic environments or contain only a narrow selection of real-world scenes. This limitation prevents robust benchmarking and restricts the development of generalizable 3D models.

<div style="text-align: center;">
  <img src="/files/dl3dv/dataset_comparison.png" alt="Dataset Comparison" style="max-width: 90%; height: auto; margin: 20px 0;">
  <p style="font-size: 0.9em;"><em><b>Figure 1</b>: Comparison of DL3DV-10K with existing 3D vision datasets.</em></p>
</div>

---

## Our Contribution: The DL3DV-10K Dataset

We introduce a massive dataset comprising **10,510 videos** and **51.2 million frames**. The data captures 65 different types of real-world Points of Interest (POIs), including bounded and unbounded scenes, with challenging conditions like reflection, transparency, and complex lighting.

<div style="text-align: center;">
  <img src="/files/dl3dv/dataset_overview.png" alt="DL3DV-10K Dataset Overview" style="max-width: 100%; height: auto; margin: 20px 0;">
  <p style="font-size: 0.9em;"><em><b>Figure 2</b>: Sample scenes from the DL3DV-10K dataset showing diverse environments.</em></p>
</div>

---

## Benchmark & Experiments

We performed comprehensive benchmarking of recent Novel View Synthesis (NVS) methods and conducted a pilot study on generalizable NeRF.

### NVS Benchmarking

<div style="overflow-x: auto;">
<p style="font-size: 0.9em; font-weight: bold; margin-bottom: 10px;">Table 1: NVS Method Performance on DL3DV-10K</p>
<table style="font-size: 0.75em; width: 100%; border-collapse: collapse; margin: 0 auto;">
<thead>
<tr style="background-color: #f8f9fa;">
<th style="padding: 4px 6px; text-align: left; border: 1px solid #dee2e6;">Method</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">PSNR $\uparrow$</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">SSIM $\uparrow$</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">LPIPS $\downarrow$</th>
</tr>
</thead>
<tbody>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">NeRF</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">--</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">--</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">--</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">Instant-NGP</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">--</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">--</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">--</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">3DGS</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">--</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">--</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">--</td></tr>
</tbody>
</table>
</div>

---

## Key Contributions

- **Large-Scale Scale**: 10,510 videos and 51.2 million frames spanning 65 types of real-world POIs.
- **Diversity**: Covers bounded and unbounded scenes with varied reflection, transparency, and lighting.
- **Comprehensive Benchmark**: Extensive evaluation of NVS methods.
- **Generalization Study**: Pilot results for generalizable NeRF underscoring the need for large-scale data.

---

## Links

[Project](https://dl3dv-10k.github.io/DL3DV-10K/) | [Code](https://github.com/DL3DV-10K/Dataset) | [Paper](http://jackal092927.github.io/files/DL3DV-10K_CVPR2024.pdf)
