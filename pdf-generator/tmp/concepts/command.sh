wkhtmltopdf \
 --page-size A4 --margin-top 20mm --margin-bottom 20mm --margin-left 20mm --margin-right 20mm \
 --title "Technical concepts" \
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
   http://localhost:1313/docs/concepts/compatibility-policy \
  http://localhost:1313/docs/concepts/concepts-introduction \
  http://localhost:1313/docs/concepts/domain-model \
  http://localhost:1313/docs/concepts/security \
  http://localhost:1313/docs/concepts/tenant-hierarchy \
"Technical concepts-y.pdf"
