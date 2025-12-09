---
title: "DL3DV-10K: A Large-Scale Scene Dataset for Deep Learning-based 3D Vision"
collection: publications
permalink: /publication/DL3DV-10K_CVPR2024
excerpt: 'Presenting a massive 10K real-world scene benchmark dataset for 3D vision with 51.2 million frames.'
date: 2024-06-01
venue: 'IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)'
paperurl: 'http://jackal092927.github.io/files/DL3DV-10K_CVPR2024.pdf'
---

## Abstract

We have witnessed significant progress in deep learning-based 3D vision, ranging from neural radiance field (NeRF) based 3D representation learning to applications in novel view synthesis (NVS). However, existing scene-level datasets—limited to either synthetic environments or a narrow selection of real-world scenes—are insufficient. This gap hinders comprehensive benchmarking and caps what could be explored in 3D analysis. To address this, we present **DL3DV-10K**, a large-scale scene dataset featuring 51.2 million frames from 10,510 videos captured across 65 types of points of interest, covering bounded and unbounded scenes with diverse reflection, transparency, and lighting. We benchmark recent NVS methods on DL3DV-10K and report insights for future research, including a pilot study on generalizable NeRF that underscores the need for large-scale scene-level data.

---

## Dataset Statistics

DL3DV-10K is designed to cover the complexity of the real world.

- **Scale**: 10,510 videos, 51.2 million frames at 4K resolution.
- **Diversity**: 65 categories of Points of Interest (POIs) including shopping centers, historical sites, and nature.
- **Complexity Annotations**: Fine-grained labels for reflection, transparency, lighting conditions (natural/artificial), and texture frequency.
- **Quality**: Low motion blur, 4K 60fps standard, professionally captured with $360^\circ$ coverage.

---

## Benchmark Results (DL3DV-140)

We evaluated state-of-the-art methods on a challenging subset of 140 scenes. Zip-NeRF and 3DGS generally outperform others, but challenges remain in unbounded and high-frequency scenes.

<div style="overflow-x: auto;">
<p style="font-size: 0.9em; font-weight: bold; margin-bottom: 10px;">Table 1: Performance on DL3DV-140 Benchmark</p>
<table style="font-size: 0.75em; width: 100%; border-collapse: collapse; margin: 0 auto;">
<thead>
<tr style="background-color: #f8f9fa;">
<th style="padding: 4px 6px; text-align: left; border: 1px solid #dee2e6;">Method</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">PSNR $\uparrow$</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">SSIM $\uparrow$</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">LPIPS $\downarrow$</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">Train Time</th>
</tr>
</thead>
<tbody>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">Instant-NGP</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">25.01</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">0.834</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">0.228</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">1.2 hr</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">Nerfacto</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">24.61</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">0.848</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">0.211</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">2.6 hr</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">Mip-NeRF 360</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">30.98</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">0.911</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">0.132</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">48.0 hr</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">3DGS</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">29.82</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">0.919</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">0.120</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">2.1 hr</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">**Zip-NeRF**</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">**31.22**</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">**0.921**</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">**0.112**</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">4.0 hr</td></tr>
</tbody>
</table>
</div>

---

## Key Contributions

- **Unprecedented Scale**: The largest real-world scene-level dataset to date with 10K+ scenes.
- **Real-World Complexity**: Captures non-Lambertian surfaces (glass, water), view-dependent lighting, and unbounded outdoor environments lacking in synthetic datasets.
- **Generalization**: Pilot experiments show that pre-training on DL3DV-10K significantly improves the performance of generalizable NeRF models (like IBRNet) compared to training on smaller datasets.

---

```bibtex
@inproceedings{ling2024dl3dv,
  title={DL3DV-10K: A Large-Scale Scene Dataset for Deep Learning-based 3D Vision},
  author={Lu Ling and Yichen Sheng and Zhi Tu and Wentian Zhao and Lantao Yu and Qianyu Guo and Zixun Yu and Yawen Lu and Xuanmao Li and Xingpeng Sun and Rohan Ashok and Aniruddha Mukherjee and Cheng Xin and Kun Wan and Hao Kang and Xiangrui Kong and Gang Hua and Tianyi Zhang and Bedrich Benes and Aniket Bera},
  booktitle={IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)},
  year={2024}
}
```

## Links

[Project](https://dl3dv-10k.github.io/DL3DV-10K/) | [Code](https://github.com/DL3DV-10K/Dataset) | [Paper](http://jackal092927.github.io/files/DL3DV-10K_CVPR2024.pdf)
