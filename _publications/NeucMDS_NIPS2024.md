### 4. `NeucMDS_NIPS2024.md` (NeurIPS 2024)

```markdown
---
title: "Neuc-MDS: Non-Euclidean Multidimensional Scaling Through Bilinear Forms"
collection: publications
permalink: /publication/NeucMDS_NIPS2024
excerpt: 'Generalizing MDS to accommodate non-Euclidean and non-metric inputs via symmetric bilinear forms.'
date: 2024-12-10
venue: 'The Thirty-Eighth Annual Conference on Neural Information Processing Systems (NeurIPS 2024)'
paperurl: 'http://jackal092927.github.io/files/neucmds.pdf'
---

## Abstract

We introduce **N**on-**Euc**lidean-**MDS** (Neuc-MDS), an extension of classical Multidimensional Scaling (MDS) that accommodates non-Euclidean and non-metric inputs. The key idea is to generalize the standard inner product to symmetric bilinear forms so negative eigenvalues of dissimilarity Gram matrices can be used productively. Neuc-MDS efficiently chooses both positive and negative eigenvalues to reduce STRESS, the sum of squared pairwise error. We provide error analysis, proofs of optimality for minimizing lower bounds of STRESS, and evaluations on synthetic and real-world datasets against linear and non-linear dimension reduction methods.

---

## The Challenge: Dimensionality Paradox

Classical MDS (cMDS) assumes Euclidean geometry and discards negative eigenvalues from the Gram matrix. On non-Euclidean data (e.g., biological sequence dissimilarity, non-metric crowd-sourced similarity), this leads to a **Dimensionality Paradox**: increasing the number of target dimensions $k$ in cMDS can actually *increase* the STRESS error.

Our method, **Neuc-MDS**, embraces the indefinite geometry (pseudo-Euclidean space) by selecting a mix of positive and negative eigenvalues, ensuring that STRESS monotonically decreases as dimensions are added.

---

## Experimental Results

We evaluated Neuc-MDS on datasets with significant non-Euclidean components (indicated by negative eigenvalues), such as "Random-Simplex" and biological datasets (Brain, Breast Cancer).

<div style="overflow-x: auto;">
<p style="font-size: 0.9em; font-weight: bold; margin-bottom: 10px;">Table 1: STRESS Comparison (Lower is better)</p>
<table style="font-size: 0.75em; width: 100%; border-collapse: collapse; margin: 0 auto;">
<thead>
<tr style="background-color: #f8f9fa;">
<th style="padding: 4px 6px; text-align: left; border: 1px solid #dee2e6;">Dataset</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">Classical MDS</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">Lower-MDS</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">SMACOF</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">Neuc-MDS (Ours)</th>
</tr>
</thead>
<tbody>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">Random-Simplex</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">80.52</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">31.54</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">15.96</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">**1.18**</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">Euclidean Ball</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">36.97</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">17.30</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">4e6</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">**1.19**</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">Brain (Genomics)</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">2.89</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">0.289</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">0.081</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">**0.046**</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">CIFAR10</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">26.59</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">1.27</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">1.63e5</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">**0.85**</td></tr>
</tbody>
</table>
</div>

---

## Key Contributions

- **Generalization**: Extends MDS with symmetric bilinear forms to handle non-Euclidean and non-metric inputs.
- **Optimization**: Proposes an $O(n)$ greedy algorithm to select the optimal subset of positive and negative eigenvalues.
- **Theoretical Guarantees**: Proves that STRESS is decomposed into three terms, and Neuc-MDS minimizes the dominant lower bound.
- **Validation**: Superior performance on synthetic and real datasets, resolving the dimensionality paradox.

---

```bibtex
@inproceedings{deng2024neucmds,
  title={Neuc-MDS: Non-Euclidean Multidimensional Scaling Through Bilinear Forms},
  author={Chengyuan Deng and Jie Gao and Kevin Lu and Feng Luo and Hongbin Sun and Cheng Xin},
  booktitle={Conference on Neural Information Processing Systems (NeurIPS)},
  year={2024},
  url={[http://jackal092927.github.io/files/neucmds.pdf](http://jackal092927.github.io/files/neucmds.pdf)}
}
```

## Links

[Paper](http://jackal092927.github.io/files/neucmds.pdf) | [Code](https://github.com/KLu9812/MDSPlus)
