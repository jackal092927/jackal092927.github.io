---
title: "TopInG: Topologically Interpretable Graph Learning via Persistent Rationale Filtration"
collection: publications
permalink: /publication/TopInG_ICML2025
excerpt: 'A topologically interpretable GNN with a novel topological discrepancy loss is proved to be uniquely optimized by ground truth.'
date: 2025-05-01
venue: '42nd International Conference on Machine Learning (ICML)'
paperurl: 'https://openreview.net/pdf?id=u4LlYWJHUF'
---

# Abstract
Graph Neural Networks (GNNs) have shown remarkable success across various scientific fields, yet their adoption in critical decision-making is often hindered by a lack of interpretability. Recently, intrinsic interpretable GNNs have been studied to provide insights into model predictions by identifying rationale substructures in graphs. However, existing methods face challenges when the underlying rationale subgraphs are complex and varied. In this work, we propose TopInG: Topologically Interpretable Graph Learning, a novel topological framework that leverages persistent homology to identify persistent rationale subgraphs. TopInG employs a rationale filtration learning approach to model an autoregressive generating process of rationale subgraphs, and introduces a self-adjusted topological constraint, termed topological discrepancy, to enforce a persistent topological distinction between rationale subgraphs and irrelevant counterparts. We provide theoretical guarantees that our loss function is uniquely optimized by the ground truth under specific conditions. Extensive experiments demonstrate TopInG's effectiveness in tackling key challenges, such as handling variform rationale subgraphs, balancing predictive performance with interpretability, and mitigating spurious correlations. Results show that our approach improves upon state-of-the-art methods on both predictive accuracy and interpretation quality.

[Paper](https://openreview.net/pdf?id=u4LlYWJHUF) 