wkhtmltopdf \
 --page-size A4 --margin-top 20mm --margin-bottom 20mm --margin-left 20mm --margin-right 20mm \
 --title "Cockpit" \
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
   http://localhost:1313/docs/cockpit/alarms \
  http://localhost:1313/docs/cockpit/cockpit-configuration \
  http://localhost:1313/docs/cockpit/cockpit-introduction \
  http://localhost:1313/docs/cockpit/dashboard-manager \
  http://localhost:1313/docs/cockpit/data-explorer \
  http://localhost:1313/docs/cockpit/data-point-library \
  http://localhost:1313/docs/cockpit/exports \
  http://localhost:1313/docs/cockpit/home-dashboard \
  http://localhost:1313/docs/cockpit/managing-assets \
  http://localhost:1313/docs/cockpit/smart-rules \
  http://localhost:1313/docs/cockpit/smart-rules-collection \
  http://localhost:1313/docs/cockpit/using-widgets \
  http://localhost:1313/docs/cockpit/widgets-collection \
  http://localhost:1313/docs/cockpit/working-with-dashboards \
  http://localhost:1313/docs/cockpit/working-with-reports \
"Cockpit-y.pdf"
