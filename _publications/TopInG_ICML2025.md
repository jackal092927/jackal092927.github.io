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

Graph Neural Networks (GNNs) have shown remarkable success across various scientific fields, but their adoption in critical decision-making is often hindered by a lack of interpretability. Recently, intrinsically interpretable GNNs have been developed to provide insights into model predictions by identifying "rationale" substructures in graphs. However, existing methods struggle when these underlying rationale subgraphs are complex and varied in their structure.

To address this, we propose **TopInG: Topologically Interpretable Graph Learning**, a novel framework that leverages persistent homology to identify stable and meaningful rationale subgraphs. TopInG uses a rationale filtration learning approach to model the generation of these subgraphs. We introduce a self-adjusting topological constraint, which we term **topological discrepancy**, to enforce a clear and persistent topological distinction between the crucial rationale subgraphs and irrelevant parts of the graph. We provide theoretical guarantees that our loss function is uniquely optimized by the ground truth under specific conditions. Extensive experiments show that TopInG effectively handles variform rationales, balances predictive performance with interpretability, and mitigates spurious correlations, outperforming state-of-the-art methods in both prediction accuracy and interpretation quality.

---

## The Challenge: Variform Rationales

Existing interpretable GNNs struggle with **variform rationale subgraphs**—explanatory substructures that vary significantly in shape, size, and topology within the same class. We created the **BA-HouseOrGrid-nRnd** dataset to test this challenge. As rationale complexity increases, existing methods degrade sharply while TopInG maintains stable performance.

<div style="text-align: center;">
  <img src="/files/toping/horg_n.png" alt="Comparison on BA-HouseOrGrid-nRnd dataset" style="max-width: 90%; height: auto; margin: 20px 0;">
  <p style="font-size: 0.9em;"><em><b>Figure 1</b>: As rationale complexity (nRnd) increases, TopInG maintains high interpretation performance (ROC AUC) while other methods degrade significantly.</em></p>
</div>

---

## Our Method: Persistent Rationale Filtration

TopInG learns an optimal "filtration"—an ordered edge sequence based on importance. We first construct the rationale subgraph (G<sub>X</sub>), then add remaining edges (G<sub>ε</sub>). **Persistent homology** analyzes topological features that emerge during this process.

<div style="text-align: center;">
  <img src="/files/toping/overview.png" alt="TopInG Method Overview" style="max-width: 100%; height: auto; margin: 20px 0;">
  <p style="font-size: 0.9em;"><em><b>Figure 2</b>: An overview of the TopInG framework.</em></p>
</div>

Our key innovation is the **topological discrepancy** loss that maximizes differences between rationale and complement topological signatures, creating a clear "persistent homology gap."

<div style="text-align: center;">
  <embed src="/files/toping/barcode_prereview.pdf" type="application/pdf" width="100%" height="400px" style="margin: 20px 0;" />
  <p style="font-size: 0.9em;"><em><b>Figure 3</b>: Persistent homology barcode showing the topological discrepancy between rationale and complement subgraphs.</em></p>
</div>

---

## Experimental Results

We evaluated TopInG on eight benchmark datasets against leading interpretation methods, achieving new state-of-the-art results in both interpretation quality and predictive accuracy.

### Interpretation Performance (AUC)

TopInG consistently identifies correct rationale subgraphs with higher fidelity. With the **CINpp** backbone, TopInG achieves perfect scores on challenging datasets.

<div style="overflow-x: auto;">
<p style="font-size: 0.9em; font-weight: bold; margin-bottom: 10px;">Table 1: Interpretation Performance (AUC) on Test Datasets</p>
<table style="font-size: 0.8em; width: 100%; border-collapse: collapse; margin: 0 auto;">
<thead>
<tr style="background-color: #f8f9fa;">
<th style="padding: 4px 6px; text-align: left; border: 1px solid #dee2e6;">Method</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">BA-2Motifs</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">BA-HouseGrid</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">SPmotif0.5</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">SPMotif0.9</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">BA-HouseAndGrid</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">BA-HouseOrGrid</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">Mutag</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">Benzene</th>
</tr>
</thead>
<tbody>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">GNNExplainer</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">67.35 ± 3.29</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">50.73 ± 0.34</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">62.62 ± 1.35</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">58.85 ± 1.93</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">53.04 ± 0.38</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">53.21 ± 0.36</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">61.98 ± 5.45</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">48.72 ± 0.14</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">PGExplainer</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">84.59 ± 9.09</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">50.92 ± 1.51</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">69.54 ± 5.64</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">72.34 ± 2.91</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">10.36 ± 4.37</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">3.14 ± 0.01</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">60.91 ± 17.10</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">4.26 ± 0.36</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">MatchExplainer</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">86.06 ± 28.37</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">64.32 ± 2.32</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">57.29 ± 14.35</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">47.29 ± 13.39</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">81.67 ± 0.48</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">79.87 ± 1.61</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">91.04 ± 6.59</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">55.65 ± 1.16</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">Mage</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">79.81 ± 2.27</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">82.69 ± 4.78</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">76.63 ± 0.95</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">74.38 ± 0.64</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">99.95 ± 0.06</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">99.93 ± 0.07</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">99.57 ± 0.47</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">96.03 ± 0.63</td></tr>
<tr style="background-color: #f8f9fa;"><td colspan="9" style="padding: 2px; border: 1px solid #dee2e6; text-align: center; font-size: 0.7em;"><em>Intrinsic Methods</em></td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">DIR</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">82.78 ± 10.97</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">65.50 ± 15.31</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">78.15 ± 1.32</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">49.08 ± 3.66</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">64.96 ± 14.31</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">59.71 ± 21.56</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">64.44 ± 28.81</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">54.08 ± 13.75</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">GIN+GSAT</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">98.85 ± 0.47</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">98.55 ± 0.59</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">74.49 ± 4.46</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">65.25 ± 4.42</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">92.92 ± 2.03</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">83.56 ± 3.57</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">99.38 ± 0.25</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">91.57 ± 1.48</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">GIN+GMT-Lin</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">97.72 ± 0.59</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">85.68 ± 2.79</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">76.26 ± 5.07</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">69.08 ± 5.14</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">76.12 ± 7.47</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">74.36 ± 5.41</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>99.87</strong> ± 0.09</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">83.90 ± 6.07</td></tr>
<tr style="background-color: #e8f4fd;"><td style="padding: 3px 6px; border: 1px solid #dee2e6;"><strong>GIN+TopInG</strong></td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>99.57*</strong> ± 0.60</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>99.24*</strong> ± 0.66</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>79.50</strong> ± 3.71</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>80.82*</strong> ± 4.22</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>95.35</strong> ± 0.95</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>88.56</strong> ± 2.04</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">95.79 ± 1.93</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>98.22*</strong> ± 0.92</td></tr>
<tr style="background-color: #f8f9fa;"><td colspan="9" style="padding: 2px; border: 1px solid #dee2e6; text-align: center; font-size: 0.7em;"><em>CINpp Backbone</em></td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">CINpp+GSAT</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">91.12 ± 4.93</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">91.04 ± 6.59</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">78.20 ± 4.48</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">80.24 ± 3.66</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">95.17 ± 2.46</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">69.30 ± 2.48</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">97.27 ± 0.47</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">95.40 ± 3.05</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">CINpp+GMT-Lin</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">91.03 ± 5.24</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">93.68 ± 4.79</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">83.23 ± 4.30</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">76.40 ± 2.38</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">85.08 ± 3.85</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">67.91 ± 5.10</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>97.48</strong> ± 0.81</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">94.44 ± 2.49</td></tr>
<tr style="background-color: #e8f4fd;"><td style="padding: 3px 6px; border: 1px solid #dee2e6;"><strong>CINpp+TopInG</strong></td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>100.00*</strong> ± 0.00</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>99.87*</strong> ± 0.13</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>95.08*</strong> ± 1.84</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>92.82*</strong> ± 2.45</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>100.00*</strong> ± 0.00</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>100.00*</strong> ± 0.00</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">96.38 ± 2.56</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>100.00*</strong> ± 0.00</td></tr>
</tbody>
</table>
</div>

<p style="font-size: 0.8em; text-align: left; margin-top: 5px;"><em>*Results are statistically significant and outperform the best baseline.</em></p>

### Prediction Performance (Accuracy)

TopInG achieves higher prediction accuracy, especially with spurious correlations that mislead other models.

**Table 2: Prediction Performance (Accuracy) on Test Datasets**

| Model | Method | Mutag | Benzene | SpuriousMotif (b=0.5) | SpuriousMotif (b=0.7) | SpuriousMotif (b=0.9) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| GIN | DIR | 68.72 ± 2.51 | 50.67 ± 0.93 | 45.49 ± 3.81 | 41.13 ± 2.62 | 37.61 ± 2.02 |
| GIN | GSAT | **98.28** ± 0.78 | **100.00** ± 0.00 | 47.45 ± 5.87 | 43.57 ± 2.43 | 45.39 ± 5.02 |
| GIN | GMT-Lin | 91.20 ± 2.75 | **100.00** ± 0.00 | 51.16 ± 3.51 | 53.11 ± 4.12 | 47.60 ± 2.06 |
| GIN | **TopInG** | 94.20 ± 5.61 | **100.00** ± 0.00 | **52.22** ± 2.07 | **54.46** ± 5.76 | **50.21** ± 3.22 |
| **---** | **---** | **---** | **---** | **---** | **---** | **---** |
| CINpp | GSAT | **96.14** ± 0.67 | 99.43 ± 0.54 | 74.70 ± 3.37 | 70.41 ± 3.44 | 65.90 ± 4.18 |
| CINpp | GMT-Lin | 95.27 ± 1.36 | 98.87 ± 0.92 | 73.16 ± 3.51 | 69.11 ± 4.12 | 68.60 ± 6.06 |
| CINpp | **TopInG** | 92.92 ± 7.02 | **100.00*** ± 0.00 | **79.30*** ± 3.92 | **75.46*** ± 4.62 | **77.68*** ± 4.64 |

<p style="font-size: smaller; text-align: left;"><em>*Results are statistically significant and outperform the best baseline.</em></p>

---

## Key Contributions

- **Novel Framework**: First to leverage persistent homology for graph interpretability
- **Theoretical Guarantees**: Topological discrepancy loss uniquely optimized by ground truth
- **Superior Performance**: State-of-the-art interpretation quality and predictive accuracy
- **Robustness**: Handles variform rationales and spurious correlations

---

## Links

**Paper:** [OpenReview](https://openreview.net/pdf?id=u4LlYWJHUF) | **PDF:** [Download PDF](/files/toping/toping_icml25.pdf)