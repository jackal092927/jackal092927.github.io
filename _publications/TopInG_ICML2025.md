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

[cite_start]Graph Neural Networks (GNNs) have shown remarkable success across various scientific fields, but their adoption in critical decision-making is often hindered by a lack of interpretability[cite: 4]. [cite_start]Recently, intrinsically interpretable GNNs have been developed to provide insights into model predictions by identifying "rationale" substructures in graphs[cite: 5]. [cite_start]However, existing methods struggle when these underlying rationale subgraphs are complex and varied in their structure[cite: 6].

[cite_start]To address this, we propose **TopInG: Topologically Interpretable Graph Learning**, a novel framework that leverages persistent homology to identify stable and meaningful rationale subgraphs[cite: 7]. TopInG uses a rationale filtration learning approach to model the generation of these subgraphs. [cite_start]We introduce a self-adjusting topological constraint, which we term **topological discrepancy**, to enforce a clear and persistent topological distinction between the crucial rationale subgraphs and irrelevant parts of the graph[cite: 8]. [cite_start]We provide theoretical guarantees that our loss function is uniquely optimized by the ground truth under specific conditions[cite: 9]. [cite_start]Extensive experiments show that TopInG effectively handles variform rationales, balances predictive performance with interpretability, and mitigates spurious correlations, outperforming state-of-the-art methods in both prediction accuracy and interpretation quality[cite: 10, 11].

---

## The Challenge: Variform Rationales

[cite_start]A key limitation of existing interpretable GNNs is their struggle with **variform rationale subgraphs**—cases where the explanatory substructures vary significantly in shape, size, and topology, even for graphs in the same class[cite: 36]. [cite_start]This is common in real-world scenarios, such as in molecular biology, where different functional groups can cause the same bioactivity[cite: 37].

[cite_start]We created the **BA-HouseOrGrid-nRnd** synthetic dataset to specifically test this challenge[cite: 61, 292]. [cite_start]As the complexity of rationales increases (higher `nRnd`), the interpretation performance of state-of-the-art methods like GSAT and GMT-Lin declines sharply[cite: 314, 344]. [cite_start]In contrast, TopInG's performance remains highly stable and effective, demonstrating its superior ability to handle such variability[cite: 315, 345].

<div style="text-align: center;">
  <img src="horg_n.jpg" alt="Comparison on BA-HouseOrGrid-nRnd dataset" style="max-width: 90%; height: auto; margin: 20px 0;">
  [cite_start]<p><em><b>Figure 1</b>: As rationale complexity (nRnd) increases, TopInG maintains high interpretation performance (ROC AUC) while other methods degrade significantly[cite: 344, 345].</em></p>
</div>

---

## Our Method: Persistent Rationale Filtration

[cite_start]TopInG identifies rationales by learning an optimal "filtration," which is an ordered sequence of adding edges based on their importance[cite: 190, 194]. [cite_start]The core idea is to learn a filtration that first constructs the essential rationale subgraph ($G_X$) and then adds the remaining, less relevant edges ($G_\epsilon$)[cite: 192].

[cite_start]We use **persistent homology** to analyze the topological features (like connected components and cycles) that emerge and persist during this filtration process[cite: 49, 111]. This allows us to capture the underlying structure in a robust way.

<div style="text-align: center;">
  <img src="overview.png" alt="TopInG Method Overview" style="max-width: 100%; height: auto; margin: 20px 0;">
  <p><em><b>Figure 2</b>: An overview of the TopInG framework. An input graph is processed by a filtration learning module (GNN<sub>f</sub> + MLP<sub>f</sub>) to determine edge importance. This creates a filtration from which rationale (G<sub>X</sub>) and complement (G<sub>є</sub>) subgraphs are sampled. [cite_start]We then enforce a <b>topological discrepancy</b> (L<sub>topo</sub>) between the persistent homology of these two subgraphs, ensuring they are structurally distinct[cite: 89, 90].</em></p>
</div>

[cite_start]A key innovation in our work is the **topological discrepancy** loss term[cite: 52, 57]. [cite_start]This term pushes the model to maximize the difference between the topological signatures of the rationale and the complement graph[cite: 51, 217]. [cite_start]By doing so, TopInG learns to create a clear "persistent homology gap," effectively separating the meaningful subgraph from the noise[cite: 205, 208].

<div style="text-align: center;">
  <img src="barcode_prereview.pdf" alt="Persistent Homology Gap" style="max-width: 100%; height: auto; margin: 20px 0;">
  [cite_start]<p><em><b>Figure 3</b>: An illustration of a learned filtration and the resulting persistent homology barcode for the first-degree cycles (H<sub>1</sub>)[cite: 140, 144]. [cite_start]Edges of the rationale subgraph (G<sub>X</sub>) are assigned high importance values (e.g., > 0.323), causing their topological features (long bars) to appear early and persist[cite: 203, 205]. [cite_start]The complement subgraph's features (G<sub>є</sub>) appear later and are short-lived[cite: 207]. [cite_start]This clear separation is quantified by our topological discrepancy loss[cite: 128, 208].</em></p>
</div>

---
## Experimental Results

[cite_start]We evaluated **TopInG** on eight benchmark datasets against leading post-hoc and intrinsic GNN interpretation methods[cite: 284, 288]. [cite_start]Our results show that TopInG sets a new state-of-the-art in both interpretation quality and predictive accuracy, especially on complex and challenging graph data[cite: 285, 317].

### Interpretation Performance (AUC)

[cite_start]TopInG consistently identifies the correct rationale subgraphs with much higher fidelity than existing methods[cite: 317]. [cite_start]We measure this using the **Area Under the Curve (AUC)**, where higher is better[cite: 308]. [cite_start]When paired with a topologically-aware **CINpp** backbone, TopInG achieves perfect or near-perfect scores across the most challenging datasets[cite: 298].

**Table 1: Interpretation Performance (AUC) on Test Datasets**
| Method | BA-2Motifs | BA-HouseGrid | SPmotif0.5 | SPMotif0.9 | BA-HouseAndGrid | BA-HouseOrGrid | Mutag | Benzene |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| GNNExplainer | 67.35 ± 3.29 | 50.73 ± 0.34 | 62.62 ± 1.35 | 58.85 ± 1.93 | 53.04 ± 0.38 | 53.21 ± 0.36 | 61.98 ± 5.45 | 48.72 ± 0.14 |
| PGExplainer | 84.59 ± 9.09 | 50.92 ± 1.51 | 69.54 ± 5.64 | 72.34 ± 2.91 | 10.36 ± 4.37 | 3.14 ± 0.01 | 60.91 ± 17.10 | 4.26 ± 0.36 |
| MatchExplainer | 86.06 ± 28.37 | 64.32 ± 2.32 | 57.29 ± 14.35 | 47.29 ± 13.39 | 81.67 ± 0.48 & 79.87 ± 1.61 | 91.04 ± 6.59 | 55.65 ± 1.16 |
| Mage | 79.81 ± 2.27 | 82.69 ± 4.78 | 76.63 ± 0.95 | 74.38 ± 0.64 | 99.95 ± 0.06 & 99.93 ± 0.07 | 99.57 ± 0.47 | 96.03 ± 0.63 |
| **---** | **---** | **---** | **---** | **---** | **---** | **---** | **---** | **---** |
| DIR | 82.78 ± 10.97 | 65.50 ± 15.31 | 78.15 ± 1.32 | 49.08 ± 3.66 | 64.96 ± 14.31 | 59.71 ± 21.56 | 64.44 ± 28.81 | 54.08 ± 13.75 |
| GIN+GSAT | 98.85 ± 0.47 | 98.55 ± 0.59 | 74.49 ± 4.46 | 65.25 ± 4.42 | 92.92 ± 2.03 | 83.56 ± 3.57 | 99.38 ± 0.25 | 91.57 ± 1.48 |
| GIN+GMT-Lin | 97.72 ± 0.59 | 85.68 ± 2.79 | 76.26 ± 5.07 | 69.08 ± 5.14 | 76.12 ± 7.47 | 74.36 ± 5.41 | **99.87** ± 0.09 | 83.90 ± 6.07 |
| GIN+TOPING | ***99.57**** ± 0.60 | ***99.24**** ± 0.66 | **79.50** ± 3.71 | ***80.82**** ± 4.22 | **95.35** ± 0.95 | **88.56** ± 2.04 | 95.79 ± 1.93 | ***98.22**** ± 0.92 |
| **---** | **---** | **---** | **---** | **---** | **---** | **---** | **---** | **---** |
| CINpp+GSAT | 91.12 ± 4.93 | 91.04 ± 6.59 | 78.20 ± 4.48 | 80.24 ± 3.66 | 95.17 ± 2.46 | 69.30 ± 2.48 | 97.27 ± 0.47 | 95.40 ± 3.05 |
| CINpp+GMT-Lin| 91.03 ± 5.24 | 93.68 ± 4.79 | 83.23 ± 4.30 | 76.40 ± 2.38 | 85.08 ± 3.85 | 67.91 ± 5.10 | **97.48** ± 0.81 | 94.44 ± 2.49 |
| CINpp+TOPING | ***100.00**** ± 0.00 | ***99.87**** ± 0.13 | ***95.08**** ± 1.84 | ***92.82**** ± 2.45 | ***100.00**** ± 0.00 | ***100.00**** ± 0.00 | 96.38 ± 2.56 | ***100.00**** ± 0.00 |

<p style="font-size: smaller; text-align: left;"><em>*Result is statistically significant and outperforms the best baseline. [cite_start]All data from Table 1 in the paper[cite: 298].</em></p>

### Prediction Performance (Accuracy)

[cite_start]By focusing on the true explanatory subgraphs, TopInG also achieves higher and more robust prediction accuracy, particularly in the presence of spurious correlations that can fool other models[cite: 322, 346].

**Table 2: Prediction Performance (Accuracy) on Test Datasets**
| Model | Method | Mutag | Benzene | SpuriousMotif (b=0.5) | SpuriousMotif (b=0.7) | SpuriousMotif (b=0.9) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| GIN | DIR | 68.72 ± 2.51 | 50.67 ± 0.93 | 45.49 ± 3.81 | 41.13 ± 2.62 | 37.61 ± 2.02 |
| GIN | GSAT | **98.28** ± 0.78 | **100.00** ± 0.00 | 47.45 ± 5.87 | 43.57 ± 2.43 | 45.39 ± 5.02 |
| GIN | GMT-Lin | 91.20 ± 2.75 | **100.00** ± 0.00 | 51.16 ± 3.51 | 53.11 ± 4.12 | 47.60 ± 2.06 |
| GIN | **TOPING** | 94.20 ± 5.61 | **100.00** ± 0.00 | **52.22** ± 2.07 | **54.46** ± 5.76 | **50.21** ± 3.22 |
| **---** | **---** | **---** | **---** | **---** | **---** | **---** |
| CINpp | GSAT | **96.14** ± 0.67 | 99.43 ± 0.54 | 74.70 ± 3.37 | 70.41 ± 3.44 | 65.90 ± 4.18 |
| CINpp | GMT-Lin | 95.27 ± 1.36 | 98.87 ± 0.92 | 73.16 ± 3.51 | 69.11 ± 4.12 | 68.60 ± 6.06 |
| CINpp | **TOPING** | 92.92 ± 7.02 | ***100.00**** ± 0.00 | ***79.30**** ± 3.92 | ***75.46**** ± 4.62 | ***77.68**** ± 4.64 |

<p style="font-size: smaller; text-align: left;"><em>*Result is statistically significant and outperforms the best baseline. [cite_start]All data from Table 2 in the paper[cite: 301].</em></p>

---

## Links

<!-- **Paper:** [TopInG: Topologically Interpretable Graph Learning via Persistent Rationale Filtration](https://proceedings.mlr.press/v267/fan25a.html) -->

**PDF:** [Download from proceedings.mlr.press](https://proceedings.mlr.press/v267/fan25a/fan25a.pdf)