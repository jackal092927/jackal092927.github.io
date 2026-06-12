---
title: "Expressive Higher-Order Link Prediction through Hypergraph Symmetry Breaking"
collection: publications
permalink: /publication/HypergraphSymmetryBreaking_TMLR2024
excerpt: 'A symmetry-breaking approach that improves higher-order link prediction expressivity for hypergraph representation learning.'
date: 2024-11-30
venue: 'Transactions on Machine Learning Research (TMLR)'
paperurl: 'https://openreview.net/pdf?id=oG65SjZNIF'
---

## Abstract

Higher-order link prediction asks whether a missing hyperedge exists in a hypergraph. Many hypergraph representation learning methods inherit expressivity limits from Weisfeiler-Lehman-type message passing, which can fail to distinguish regular or symmetric substructures. This paper introduces a symmetry-breaking approach for higher-order link prediction: a preprocessing algorithm identifies regular subhypergraphs, and training randomly modifies these structures by replacing them with covering hyperedges. The method improves expressive power while adding little computational overhead, and experiments show gains on graph and hypergraph datasets.

## Key Contributions

- **Expressivity analysis**: Identifies limitations of common hypergraph message-passing representations.
- **Symmetry-breaking method**: Uses preprocessing to find regular subhypergraphs and modifies them during training.
- **Efficient implementation**: Keeps the extra computation small relative to the input hypergraph.
- **Higher-order prediction**: Demonstrates improvements for higher-order link prediction on graph and hypergraph benchmarks.

## Citation

Simon Zhang, Cheng Xin, and Tamal K. Dey. Expressive Higher-Order Link Prediction through Hypergraph Symmetry Breaking. *Transactions on Machine Learning Research*, 2024.

## BibTeX Citation

```bibtex
@article{zhang2024hypergraphsymmetry,
  title={Expressive Higher-Order Link Prediction through Hypergraph Symmetry Breaking},
  author={Simon Zhang and Cheng Xin and Tamal K. Dey},
  journal={Transactions on Machine Learning Research},
  year={2024},
  url={https://openreview.net/forum?id=oG65SjZNIF}
}
```

## Links

[OpenReview](https://openreview.net/forum?id=oG65SjZNIF) | [Paper](https://openreview.net/pdf?id=oG65SjZNIF) | [Code](https://github.com/simonzhang00/HypergraphSymmetryBreaking)
