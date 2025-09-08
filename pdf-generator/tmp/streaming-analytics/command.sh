wkhtmltopdf \
 --page-size A4 --margin-top 20mm --margin-bottom 20mm --margin-left 20mm --margin-right 20mm \
 --title "Streaming Analytics" \
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
   http://localhost:1313/docs/streaming-analytics/introduction-analytics/ \
  http://localhost:1313/docs/streaming-analytics/analytics-builder/ \
  http://localhost:1313/docs/streaming-analytics/block-reference/ \
  http://localhost:1313/docs/streaming-analytics/analytics-rules-plugin/ \
  http://localhost:1313/docs/streaming-analytics/epl-apps/ \
  http://localhost:1313/docs/streaming-analytics/analytics-customization/ \
  http://localhost:1313/docs/streaming-analytics/troubleshooting/ \
"Streaming Analytics-y2025.pdf"
