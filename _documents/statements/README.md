# Website statement sources

These sources rebuild `files/research_stat.pdf` and `files/teaching_stat.pdf`.
The statement headers contain Cheng Xin's current affiliation and institutional
email at California State University, Fresno. Historical teaching and
collaboration references remain in the body where relevant.

From this directory, run `latexmk -pdf research_stat.tex` and
`latexmk -pdf teaching_stat.tex`. Review the resulting PDFs before copying them
to the website's `files` directory. The bibliography contains only cited works.

The public academic CV source is `files/resumes/cheng-xin-cv-academic.html`.
Print it to PDF using its A4 print stylesheet, with backgrounds enabled and
browser headers/footers disabled, whenever the HTML is updated.

`_documents` is excluded from the generated website.
