---
title: "TopInG: Topologically Interpretable Graph Learning via Persistent Rationale Filtration"
collection: publications
permalink: /publication/TopInG_ICML2025
excerpt: 'A topologically interpretable GNN with a novel topological discrepancy loss is proved to be uniquely optimized by ground truth.'
date: 2025-05-01
venue: '42nd International Conference on Machine Learning (ICML)'
paperurl: 'https://openreview.net/pdf?id=u4LlYWJHUF'
---

## Abstract

Graph Neural Networks (GNNs) have shown remarkable success across various scientific fields, yet their adoption in critical decision-making is often hindered by a lack of interpretability. Recently, intrinsic interpretable GNNs have been studied to provide insights into model predictions by identifying rationale substructures in graphs. However, existing methods face challenges when the underlying rationale subgraphs are complex and varied. In this work, we propose TopInG: Topologically Interpretable Graph Learning, a novel topological framework that leverages persistent homology to identify persistent rationale subgraphs. TopInG employs a rationale filtration learning approach to model an autoregressive generating process of rationale subgraphs, and introduces a self-adjusted topological constraint, termed topological discrepancy, to enforce a persistent topological distinction between rationale subgraphs and irrelevant counterparts. We provide theoretical guarantees that our loss function is uniquely optimized by the ground truth under specific conditions. Extensive experiments demonstrate TopInG's effectiveness in tackling key challenges, such as handling variform rationale subgraphs, balancing predictive performance with interpretability, and mitigating spurious correlations. Results show that our approach improves upon state-of-the-art methods on both predictive accuracy and interpretation quality.

## Key Ideas

### Motivation
- **Problem**: Existing interpretable GNNs struggle with complex and varied rationale subgraphs
- **Challenge**: Balancing predictive accuracy with interpretability quality
- **Goal**: Develop a principled topological approach to identify persistent, meaningful rationale substructures

### Core Contributions
1. **Topological Framework**: First to leverage persistent homology for graph interpretability
2. **Rationale Filtration Learning**: Novel autoregressive approach for generating rationale subgraphs
3. **Topological Discrepancy**: Self-adjusted constraint ensuring persistent distinction between rationale and irrelevant subgraphs
4. **Theoretical Guarantees**: Proof that our loss function is uniquely optimized by ground truth under specific conditions

## Method Overview

<div style="text-align: center;">
  <img src="/files/toping/overview.png" alt="TopInG Method Overview" style="max-width: 100%; height: auto; margin: 20px 0;">
  <p><em>Figure 1: Overview of TopInG framework showing the rationale filtration learning process and topological discrepancy constraint.</em></p>
</div>

### Rationale Filtration Learning
Our approach models the generation of rationale subgraphs as an autoregressive filtration process:
- **Filtration Process**: Systematically grows rationale subgraphs through learned edge addition sequences
- **Persistent Homology**: Captures topological features that persist across different scales
- **Autoregressive Generation**: Enables flexible modeling of complex, variform rationale structures

### Topological Discrepancy
The key innovation is our topological discrepancy constraint:
- **Persistent Distinction**: Enforces topological differences between rationale and non-rationale subgraphs
- **Self-Adjustment**: Automatically adapts to different graph structures and domains
- **Theoretical Foundation**: Provably leads to optimal solutions under mild conditions

<div style="text-align: center;">
  <img src="/files/toping/horg_n.png" alt="Topological Analysis" style="max-width: 80%; height: auto; margin: 20px 0;">
  <p><em>Figure 2: Topological analysis showing persistent homology structures in rationale vs. non-rationale subgraphs.</em></p>
</div>

## Experimental Results

### Datasets and Baselines
- **Datasets**: Multiple graph classification benchmarks including molecular property prediction and social network analysis
- **Baselines**: Comparison with state-of-the-art interpretable GNN methods including GNNExplainer, PGExplainer, and recent intrinsic methods

### Key Results

#### Predictive Performance
- **Accuracy**: Consistent improvements over existing interpretable GNN methods
- **Robustness**: Superior performance on datasets with spurious correlations
- **Scalability**: Maintains efficiency on large-scale graphs

#### Interpretability Quality
- **Fidelity**: High agreement between rationale subgraphs and ground truth explanations
- **Stability**: Consistent interpretations across different runs and perturbations
- **Sparsity**: Identifies compact, meaningful rationale substructures

#### Theoretical Validation
- **Convergence**: Empirical validation of theoretical guarantees
- **Optimality**: Demonstrates unique optimization properties of the topological discrepancy loss

### Ablation Studies
- **Component Analysis**: Individual contributions of rationale filtration and topological discrepancy
- **Hyperparameter Sensitivity**: Robustness across different parameter settings
- **Computational Efficiency**: Runtime comparison with existing methods

## Impact and Applications

### Scientific Applications
- **Drug Discovery**: Identifying key molecular substructures for property prediction
- **Social Networks**: Understanding influential community structures
- **Biological Networks**: Discovering functional modules in protein interactions

### Methodological Contributions
- **Topological ML**: Pioneering use of persistent homology in graph interpretability
- **Theoretical Framework**: Rigorous mathematical foundation for interpretable GNNs
- **Practical Algorithm**: Efficient implementation suitable for real-world applications

## Links

[Paper](https://openreview.net/pdf?id=u4LlYWJHUF) | [PDF](http://jackal092927.github.io/files/toping/toping_icml25.pdf) 