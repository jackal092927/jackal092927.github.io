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

## The Challenge: Non-Euclidean Inputs

Classical MDS relies on Euclidean distances, often discarding negative eigenvalues which contain valuable information when dealing with non-metric or non-Euclidean data. This leads to suboptimal embeddings and loss of structural information.

<div style="text-align: center;">
  <img src="/files/neucmds/geometry_issue.png" alt="Non-Euclidean Geometry Challenge" style="max-width: 90%; height: auto; margin: 20px 0;">
  <p style="font-size: 0.9em;"><em><b>Figure 1</b>: The limitations of classical MDS on non-Euclidean data.</em></p>
</div>

---

## Our Method: Neuc-MDS

We generalize the standard inner product to **symmetric bilinear forms**. This allows us to productively utilize the negative eigenvalues of dissimilarity Gram matrices. Our method, **Neuc-MDS**, efficiently selects a combination of positive and negative eigenvalues to directly minimize STRESS.

<div style="text-align: center;">
  <img src="/files/neucmds/neucmds_overview.png" alt="Neuc-MDS Framework" style="max-width: 100%; height: auto; margin: 20px 0;">
  <p style="font-size: 0.9em;"><em><b>Figure 2</b>: Overview of the Neuc-MDS embedding process.</em></p>
</div>

---

## Experimental Results

We evaluated Neuc-MDS on both synthetic and real-world datasets, comparing it against standard linear and non-linear dimension reduction techniques.

### STRESS Reduction

<div style="overflow-x: auto;">
<p style="font-size: 0.9em; font-weight: bold; margin-bottom: 10px;">Table 1: Comparison of STRESS (Lower is better)</p>
<table style="font-size: 0.75em; width: 100%; border-collapse: collapse; margin: 0 auto;">
<thead>
<tr style="background-color: #f8f9fa;">
<th style="padding: 4px 6px; text-align: left; border: 1px solid #dee2e6;">Method</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">Dataset A</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">Dataset B</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">Dataset C</th>
</tr>
</thead>
<tbody>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">Classical MDS</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">--</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">--</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">--</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">Isomap</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">--</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">--</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">--</td></tr>
<tr style="background-color: #e8f4fd;"><td style="padding: 3px 6px; border: 1px solid #dee2e6;"><strong>Neuc-MDS</strong></td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>--</strong></td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>--</strong></td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>--</strong></td></tr>
</tbody>
</table>
</div>

---

## Key Contributions

- **Generalization**: Extends MDS with symmetric bilinear forms to handle non-Euclidean and non-metric inputs.
- **Optimization**: Efficiently uses positive and negative eigenvalues to reduce STRESS.
- **Theoretical Guarantees**: Proofs of optimality for minimizing lower bounds of STRESS.
- **Validation**: Superior performance on synthetic and real datasets compared to baselines.

---

## Links

[Paper](https://arxiv.org/pdf/2411.10889) | [Local PDF](http://jackal092927.github.io/files/neucmds.pdf)
