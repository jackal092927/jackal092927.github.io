---
title: "D-GRIL: End-To-End Topological Learning with 2-Parameter Persistence"
collection: publications
permalink: /publication/DGRIL_SoCG2026
excerpt: 'A differentiable GRIL-based topological learning layer for end-to-end graph and bio-activity prediction.'
date: 2026-06-02
venue: '42nd International Symposium on Computational Geometry (SoCG 2026)'
paperurl: 'https://drops.dagstuhl.de/storage/00lipics/lipics-vol367-socg2026/LIPIcs.SoCG.2026.79/LIPIcs.SoCG.2026.79.pdf'
---

## Abstract

End-to-end topological learning with 1-parameter persistence has become an important way to incorporate topological information into machine learning models. This paper extends that direction to 2-parameter persistence by building on the GRIL vectorization. We analyze differentiability properties of GRIL, establish a gradient-based learning framework for bifiltration functions, and develop D-GRIL as a differentiable topological layer. The resulting framework is evaluated on graph learning benchmarks and bio-activity prediction tasks, showing how 2-parameter topological features can be learned directly in a machine learning pipeline.

## Key Contributions

- **Differentiable 2-parameter topology**: Develops a differentiable learning layer based on the GRIL vectorization.
- **Bifiltration learning**: Learns a bifiltration function instead of relying on hand-designed filter functions.
- **Theory for optimization**: Analyzes the structure needed for gradient-based learning with GRIL.
- **Applications**: Applies the framework to graph learning and bio-activity prediction.

## Citation

Soham Mukherjee, Shreyas N. Samaga, Cheng Xin, Steve Oudot, and Tamal K. Dey. D-GRIL: End-To-End Topological Learning with 2-Parameter Persistence. In *42nd International Symposium on Computational Geometry (SoCG 2026)*, LIPIcs 367, 79:1-79:17, 2026.

## BibTeX Citation

```bibtex
@inproceedings{mukherjee2026dgril,
  title={D-GRIL: End-To-End Topological Learning with 2-Parameter Persistence},
  author={Soham Mukherjee and Shreyas N. Samaga and Cheng Xin and Steve Oudot and Tamal K. Dey},
  booktitle={42nd International Symposium on Computational Geometry (SoCG 2026)},
  series={Leibniz International Proceedings in Informatics (LIPIcs)},
  volume={367},
  pages={79:1--79:17},
  year={2026},
  doi={10.4230/LIPIcs.SoCG.2026.79}
}
```

## Links

[Dagstuhl](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.SoCG.2026.79) | [Paper](https://drops.dagstuhl.de/storage/00lipics/lipics-vol367-socg2026/LIPIcs.SoCG.2026.79/LIPIcs.SoCG.2026.79.pdf) | [arXiv](https://arxiv.org/pdf/2406.07100) | [Code](https://github.com/TDA-Jyamiti/d-gril/)
