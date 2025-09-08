wkhtmltopdf \
 --page-size A4 --margin-top 20mm --margin-bottom 20mm --margin-left 20mm --margin-right 20mm \
 --title "Device integration" \
 --header-html header.html --header-line --header-spacing 3 --header-font-size 10 \
 --footer-line --footer-spacing 3 --footer-left "[section]" --footer-right "Page [page] of [toPage]" --footer-font-size 8 \
 --no-background \
 --print-media-type \
 --user-style-sheet ../../templates/style.css \
 --javascript-delay 2000 \
 --enable-local-file-access \
 --dpi 300 \
 --disable-javascript \
 --load-error-handling ignore \
 cover cover.html \
 copyright.html \
 toc \
 --xsl-style-sheet ../../templates/cumulocity-toc-style.xsl \
   http://localhost:1313/docs/device-integration/device-integration-introduction/ \
  http://localhost:1313/docs/device-integration/interfacing-devices/ \
  http://localhost:1313/docs/device-integration/device-integration-thin-edge/ \
  http://localhost:1313/docs/device-integration/mqtt/ \
  http://localhost:1313/docs/device-integration/mqtt-service/ \
  http://localhost:1313/docs/device-integration/device-integration-rest/ \
  http://localhost:1313/docs/device-integration/fragment-library/ \
  http://localhost:1313/docs/device-integration/opcua/ \
  http://localhost:1313/docs/device-integration/lwm2m/ \
  http://localhost:1313/docs/device-integration/lora-loriot/ \
  http://localhost:1313/docs/device-integration/lora-actility/ \
  http://localhost:1313/docs/device-integration/sigfox/ \
  http://localhost:1313/docs/device-integration/lpwan-custom-codec/ \
  http://localhost:1313/docs/device-integration/cloud-fieldbus/ \
"Device integration.pdf"
