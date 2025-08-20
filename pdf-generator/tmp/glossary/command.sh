wkhtmltopdf \
 --page-size A4 --margin-top 20mm --margin-bottom 20mm --margin-left 20mm --margin-right 20mm \
 --title "Glossary" \
 --header-html header.html --header-line --header-spacing 3 --header-font-size 10 \
 --footer-line --footer-spacing 3 --footer-left "[section]" --footer-right "Page [page] of [toPage]" --footer-font-size 8 \
 --no-background \
 --print-media-type \
 --user-style-sheet ../../templates/style.css \
 --javascript-delay 2000 \
 --enable-local-file-access \
 --dpi 300 \
 cover cover.html \
 copyright.html \
 toc \
 --xsl-style-sheet ../../templates/cumulocity-toc-style.xsl \
   http://localhost:1313/docs/glossary/a \
  http://localhost:1313/docs/glossary/b \
  http://localhost:1313/docs/glossary/c \
  http://localhost:1313/docs/glossary/d \
  http://localhost:1313/docs/glossary/e \
  http://localhost:1313/docs/glossary/g \
  http://localhost:1313/docs/glossary/i \
  http://localhost:1313/docs/glossary/l \
  http://localhost:1313/docs/glossary/m \
  http://localhost:1313/docs/glossary/n \
  http://localhost:1313/docs/glossary/o \
  http://localhost:1313/docs/glossary/p \
  http://localhost:1313/docs/glossary/r \
  http://localhost:1313/docs/glossary/r/streaming-analytics/introduction-analytics \
  http://localhost:1313/docs/glossary/s \
  http://localhost:1313/docs/glossary/t \
  http://localhost:1313/docs/glossary/w \
  http://localhost:1313/docs/glossary/y \
"Glossary-y.pdf"
