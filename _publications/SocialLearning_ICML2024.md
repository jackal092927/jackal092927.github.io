---
title: "Optimally Improving Cooperative Learning in a Social Setting"
collection: publications
permalink: /publication/SocialLearning_ICML2024
excerpt: 'Algorithms for optimally fixing classifiers in a cooperative network to maximize aggregate or egalitarian accuracy.'
date: 2024-07-01
venue: '41st International Conference on Machine Learning (ICML)'
paperurl: 'http://jackal092927.github.io/files/social_learning_arxiv.pdf'
---

## Abstract

We study cooperative learning where networked agents, each owning a classifier for the same task, update predictions via communication or observation. If highly influential vertices rely on erroneous classifiers, accuracy degrades for the whole network. We ask how to optimally fix a few classifiers to maximize overall accuracy. We propose aggregate and egalitarian objectives, give a polynomial-time algorithm for the aggregate objective, prove the egalitarian objective is NP-hard, and design approximation algorithms for that setting. Mathematical analysis and experiments on synthetic and real data validate the approach.

---

## Methodology

We model the network using DeGroot and Friedkin-Johnsen dynamics where agents update beliefs based on neighbors. We define two optimization problems:

1.  **Aggregate Improvement**: Maximize the total accuracy of the network. We prove this can be solved in **polynomial time** by selecting nodes with the highest "influence scores" derived from the network topology.
2.  **Egalitarian Improvement**: Maximize the accuracy of the worst-performing agents (or count of improved agents). We prove this is **NP-hard** via reduction from Set Cover. We propose a greedy algorithm (`EgalAlg`) with a $(1-1/e)$ approximation guarantee.

---

## Experimental Results

We tested our algorithms on synthetic graphs (Erdős-Rényi, Barabási-Albert) and real-world networks (Facebook, Wiki). Our greedy approach (`EgalAlg`) consistently outperforms heuristics like random selection or degree-based selection.

<div style="overflow-x: auto;">
<p style="font-size: 0.9em; font-weight: bold; margin-bottom: 10px;">Table 1: Number of modified nodes required to achieve >90% accuracy (Lower is better)</p>
<table style="font-size: 0.75em; width: 100%; border-collapse: collapse; margin: 0 auto;">
<thead>
<tr style="background-color: #f8f9fa;">
<th style="padding: 4px 6px; text-align: left; border: 1px solid #dee2e6;">Dataset</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">Random</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">Degree Heuristic</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">EgalAlg (Ours)</th>
</tr>
</thead>
<tbody>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">Erdős-Rényi (ER)</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">>100</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">>100</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">**55**</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">Barabási-Albert (PA)</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">7</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">4</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">**1**</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">Facebook (FB)</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">94</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">93</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">**9**</td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">Wiki</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">22</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">26</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">**2**</td></tr>
</tbody>
</table>
</div>

---

## Key Contributions

- **Framework**: Defined "Cooperative Learning in a Social Setting" where agents share predictions rather than parameters.
- **Algorithms**: Provided an exact polynomial-time algorithm for aggregate improvement and an approximation algorithm for the NP-hard egalitarian objective.
- **Theoretical Guarantees**: Rigorous proofs for hardness and approximation ratios.
- **Impact**: Demonstrated that intervening on a small set of influential nodes can drastically improve network-wide consensus and accuracy.

---

## BibTeX Citation

```bibtex
@inproceedings{haddadan2024optimally,
  title={Optimally Improving Cooperative Learning in a Social Setting},
  author={Shahrzad Haddadan and Cheng Xin and Jie Gao},
  booktitle={International Conference on Machine Learning (ICML)},
  year={2024},
  url={[http://jackal092927.github.io/files/social_learning_arxiv.pdf](http://jackal092927.github.io/files/social_learning_arxiv.pdf)}
}
```

## Links

[Paper](http://jackal092927.github.io/files/social_learning_arxiv.pdf) | [Code](https://github.com/jackal092927/social_learning_public)
