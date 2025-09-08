wkhtmltopdf \
 --page-size A4 --margin-top 20mm --margin-bottom 20mm --margin-left 20mm --margin-right 20mm \
 --title "DataHub" \
 --header-html header.html --header-line --header-spacing 3 --header-font-size 10 \
 --footer-line --footer-spacing 3 --footer-left "[section]" --footer-right "Page [page] of [toPage]" --footer-font-size 8 \
 --no-background \
 --print-media-type \
 --user-style-sheet ../../templates/style.css \
 --javascript-delay 2000 \
 --enable-local-file-access \
 --dpi 300 \
 --load-error-handling ignore \
 cover cover.html \
 copyright.html \
 toc \
 --xsl-style-sheet ../../templates/cumulocity-toc-style.xsl \
   http://localhost:1313/docs/datahub/datahub-overview/ \
  http://localhost:1313/docs/datahub/getting-started-with-datahub/ \
  http://localhost:1313/docs/datahub/setting-up-datahub/ \
  http://localhost:1313/docs/datahub/working-with-datahub/ \
  http://localhost:1313/docs/datahub/operating-datahub/ \
  http://localhost:1313/docs/datahub/running-datahub-on-the-edge/ \
  http://localhost:1313/docs/datahub/integrating-datahub-with-other-products/ \
"DataHub-y2025.pdf"
