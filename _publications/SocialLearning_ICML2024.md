title: "Optimally Improving Cooperative Learning in a Social Setting"
collection: publications
permalink: /publication/SocialLearning_ICML2024
excerpt: 'Optimizing classifier predictions in networked learning for maximum accuracy using efficient algorithms.'
date: 2024-07-01
venue: '41st International Conference on Machine Learning (ICML)'
paperurl: 'http://jackal092927.github.io/files/social_learning_arxiv.pdf'
---

## Abstract

We study cooperative learning where networked agents, each owning a classifier for the same task, update predictions via communication or observation. If influential vertices rely on erroneous classifiers, accuracy degrades for the whole network. We ask how to optimally fix a few classifiers to maximize overall accuracy. We propose aggregate and egalitarian objectives, give a polynomial-time algorithm for the aggregate objective, prove the egalitarian objective is NP-hard, and design approximation algorithms for that setting. Mathematical analysis and experiments on synthetic and real data validate the approach.

---

## The Challenge: Error Propagation in Networks

In cooperative learning networks, influential agents with erroneous classifiers can propagate errors throughout the system. Identifying which classifiers to fix to maximize the network's overall accuracy is a complex combinatorial problem.

<div style="text-align: center;">
  <img src="/files/social_learning/network_problem.png" alt="Error Propagation in Social Learning" style="max-width: 90%; height: auto; margin: 20px 0;">
  <p style="font-size: 0.9em;"><em><b>Figure 1</b>: Illustration of how errors propagate from influential nodes in a learning network.</em></p>
</div>

---

## Our Method: Optimization Algorithms

We propose two key objectives: **Aggregate** (maximizing total network accuracy) and **Egalitarian** (maximizing the minimum accuracy).

- **Aggregate Objective**: We provide a polynomial-time algorithm to solve this efficiently.
- **Egalitarian Objective**: We prove this is NP-hard and design effective approximation algorithms.

<div style="text-align: center;">
  <img src="/files/social_learning/algorithm_overview.png" alt="Optimization Algorithm Overview" style="max-width: 100%; height: auto; margin: 20px 0;">
  <p style="font-size: 0.9em;"><em><b>Figure 2</b>: Overview of our optimization framework for cooperative learning.</em></p>
</div>

---

## Experimental Results

We validated our algorithms on both synthetic and real-world datasets, demonstrating significant improvements in network accuracy compared to baseline heuristics.

### Accuracy Improvement

<div style="overflow-x: auto;">
<p style="font-size: 0.9em; font-weight: bold; margin-bottom: 10px;">Table 1: Accuracy Improvement on Network Datasets</p>
<table style="font-size: 0.75em; width: 100%; border-collapse: collapse; margin: 0 auto;">
<thead>
<tr style="background-color: #f8f9fa;">
<th style="padding: 4px 6px; text-align: left; border: 1px solid #dee2e6;">Dataset</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">Baseline</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">Greedy</th>
<th style="padding: 4px 6px; text-align: center; border: 1px solid #dee2e6;">Our Algorithm (Aggregate)</th>
</tr>
</thead>
<tbody>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">Synthetic</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">--</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">--</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>--</strong></td></tr>
<tr><td style="padding: 3px 6px; border: 1px solid #dee2e6;">Real-World 1</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">--</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;">--</td><td style="padding: 3px 6px; text-align: center; border: 1px solid #dee2e6;"><strong>--</strong></td></tr>
</tbody>
</table>
</div>

---

## Key Contributions

- **Novel Framework**: Cooperative learning model where agents update predictions collaboratively.
- **Efficient Solutions**: Polynomial-time optimization for the aggregate objective.
- **Theoretical Analysis**: Proof of NP-hardness and approximation algorithms for the egalitarian objective.
- **Empirical Validation**: Strong results on synthetic and real datasets.

---

## Links

[Paper](http://jackal092927.github.io/files/social_learning_arxiv.pdf)
