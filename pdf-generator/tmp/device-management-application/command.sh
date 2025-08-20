wkhtmltopdf \
 --page-size A4 --margin-top 20mm --margin-bottom 20mm --margin-left 20mm --margin-right 20mm \
 --title "Device Management application" \
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
   http://localhost:1313/docs/device-management-application/connectivity \
  http://localhost:1313/docs/device-management-application/device-management-introduction \
  http://localhost:1313/docs/device-management-application/grouping-devices \
  http://localhost:1313/docs/device-management-application/home-dashboard \
  http://localhost:1313/docs/device-management-application/managing-device-data \
  http://localhost:1313/docs/device-management-application/managing-device-services \
  http://localhost:1313/docs/device-management-application/managing-device-types \
  http://localhost:1313/docs/device-management-application/monitoring-and-controlling-devices \
  http://localhost:1313/docs/device-management-application/registering-devices \
  http://localhost:1313/docs/device-management-application/smartrest-templates \
  http://localhost:1313/docs/device-management-application/viewing-all-devices \
  http://localhost:1313/docs/device-management-application/viewing-device-details \
  http://localhost:1313/docs/device-management-application/working-with-simulators \
"Device Management application-y.pdf"
