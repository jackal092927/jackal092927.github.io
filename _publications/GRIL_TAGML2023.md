---
title: "GRIL: A 2-Parameter Persistence Based Vectorization for Machine Learning"
collection: publications
permalink: /publication/GRIL_TAGML2023
excerpt: 'A stable and differentiable 2-parameter persistence vectorization for machine learning; oral presentation at the ICML 2023 TAG-ML workshop.'
date: 2023-07-28
venue: '2nd Annual Workshop on Topology, Algebra, and Geometry in Machine Learning (TAG-ML, ICML 2023 Workshop)'
paperurl: 'https://proceedings.mlr.press/v221/xin23a/xin23a.pdf'
---

## Abstract

One-parameter persistent homology has become a standard tool for extracting topological features from data, but richer data descriptions often require multiple filtration parameters. This paper introduces the Generalized Rank Invariant Landscape (GRIL), a vector representation for 2-parameter persistence modules designed for machine learning. GRIL is stable, differentiable with respect to underlying filtration functions, and efficiently computable. We evaluate the representation on synthetic and graph-learning benchmarks, including experiments that augment graph neural networks with GRIL features.

## Presentation

This paper appeared in the ICML 2023 TAG-ML workshop proceedings and was selected for an oral presentation.

## Key Contributions

- **2-parameter vectorization**: Introduces GRIL as a machine-learning-ready vector representation for 2-parameter persistence modules.
- **Stability and differentiability**: Proves properties needed to use GRIL robustly in learning pipelines.
- **Efficient computation**: Provides an algorithmic approach for computing the representation.
- **Graph learning applications**: Tests GRIL on graph benchmarks and uses it to augment graph neural networks.

## Citation

Cheng Xin, Soham Mukherjee, Shreyas N. Samaga, and Tamal K. Dey. GRIL: A 2-Parameter Persistence Based Vectorization for Machine Learning. In *Proceedings of the 2nd Annual Workshop on Topology, Algebra, and Geometry in Machine Learning (TAG-ML)*, PMLR 221:313-333, 2023.

## BibTeX Citation

```bibtex
@inproceedings{xin2023gril,
  title={GRIL: A 2-Parameter Persistence Based Vectorization for Machine Learning},
  author={Cheng Xin and Soham Mukherjee and Shreyas N. Samaga and Tamal K. Dey},
  booktitle={Proceedings of the 2nd Annual Workshop on Topology, Algebra, and Geometry in Machine Learning (TAG-ML)},
  series={Proceedings of Machine Learning Research},
  volume={221},
  pages={313--333},
  year={2023},
  url={https://proceedings.mlr.press/v221/xin23a.html}
}
```

## Links

[PMLR](https://proceedings.mlr.press/v221/xin23a.html) | [Paper](https://proceedings.mlr.press/v221/xin23a/xin23a.pdf) | [OpenReview Oral](https://openreview.net/forum?id=t4uavrCJvD) | [Code](https://github.com/soham0209/mpml-graph)
