---
title: "Johnson-Lindenstrauss Lemma Beyond Euclidean Geometry"
collection: publications
permalink: /publication/neucJL_NeurIPS2025
excerpt: 'Extending the Johnson-Lindenstrauss lemma to non-Euclidean geometry with fine-grained error analysis based on geometric deviation.'
date: 2025-12-01
venue: 'Conference on Neural Information Processing Systems (NeurIPS)'
paperurl: 'http://jackal092927.github.io/files/NeucJL/neucJL.pdf'
---

## Abstract

The Johnson-Lindenstrauss (JL) lemma is a cornerstone of dimensionality reduction in Euclidean space, but its applicability to non-Euclidean data has remained limited. This paper extends the JL lemma beyond Euclidean geometry to handle general dissimilarity matrices that are prevalent in real-world applications. We present two complementary approaches: First, we show the JL transform can be applied to vectors in pseudo-Euclidean space with signature (p, q), providing theoretical guarantees that depend on the ratio of the (p, q) norm and Euclidean norm of two vectors, measuring the deviation from Euclidean geometry. Second, we prove that any symmetric hollow dissimilarity matrix can be represented as a matrix of generalized power distances, with an additional parameter representing the uncertainty level within the data. In this representation, applying the JL transform yields multiplicative approximation with a controlled additive error term proportional to the deviation from Euclidean geometry. Our theoretical results provide fine-grained performance analysis based on the degree to which the input data deviates from Euclidean geometry, making practical and meaningful reduction in dimensionality accessible to a wider class of data. We validate our approaches on both synthetic and real-world datasets, demonstrating the effectiveness of extending the JL lemma to non-Euclidean settings.

---

## Method: Two Approaches

We propose two distinct frameworks to handle non-Euclidean data:

1.  **Pseudo-Euclidean JL Transform**: We map dissimilarities to a pseudo-Euclidean space with signature $(p, q)$. We prove that standard random projections can be applied separately to the positive and negative components. The distortion is bounded by $1 \pm \epsilon \cdot C_{ij}$, where $C_{ij}$ measures the local deviation from Euclidean geometry.
2.  **Power Distance JL Transform**: We prove that any symmetric hollow matrix is a matrix of *generalized power distances* between balls. We apply random projections to the centers of these balls. This yields a $(1 \pm \epsilon)$ multiplicative approximation with an additive error term $4\epsilon r^2$, where $r$ is derived from the smallest eigenvalue of the Gram matrix.

---

## Experimental Results

We evaluated our methods on 10 datasets, including synthetic non-Euclidean sets (Simplex, Ball) and real-world data (Genomics, Graphs).

### Relative Error Comparison

Our methods (JL-PE and JL-Power) significantly outperform classical JL on non-Euclidean datasets where classical JL often fails (yielding infinite error when mapping distinct points to the same location).

<div style="overflow-x: auto;">
<p style="font-size: 0.9em; font-weight: bold; margin-bottom: 10px;">Table 1: Median Relative Error (Lower is better)</p>
<table style="font-size: 0.75em; width: 100%; border-collapse: collapse; margin: 0 auto;">
<thead>
<tr style="background-color: #f8f9fa;">
<th style="padding: 4px 6px; text-align: left; border: 1px solid #dee2e6;">Dataset</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">Classical JL</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">JL-PE (Ours)</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">JL-Power (Ours)</th>
</tr>
</thead>
<tbody>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">Simplex</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">6.36</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">2.57</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">12.79</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">Ball</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">6.68</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">2.78</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">1.00</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">Brain</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">2.69e12</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">1284.06</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">1.01e7</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">Facebook</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">5.08</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">5.83</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">1.16</td></tr>
</tbody>
</table>
</div>

---

## Key Contributions

- **Theoretical Extension**: First formulation of JL lemma guarantees for general symmetric hollow matrices using Pseudo-Euclidean and Power Distance representations.
- **Fine-Grained Analysis**: Error bounds are not worst-case but dependent on the data's specific deviation from Euclidean geometry.
- **Universal Representation**: Proof that any symmetric hollow matrix is a generalized power distance matrix.
- **Empirical Validation**: Superior performance on biological, graph, and synthetic non-metric datasets compared to classical approaches.

---

## BibTeX Citation

```bibtex
@inproceedings{neucjl2025,
  title={NeucJL: [Full Title To Be Added]},
  author={[Author List To Be Added]},
  booktitle={Conference on Neural Information Processing Systems (NeurIPS)},
  year={2025},
  url={[http://jackal092927.github.io/files/NeucJL/neucJL.pdf](http://jackal092927.github.io/files/NeucJL/neucJL.pdf)}
}
```

---

## Links
[Paper](http://jackal092927.github.io/files/NeucJL/neucJL.pdf) 