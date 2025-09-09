wkhtmltopdf \
 --page-size A4 --margin-top 20mm --margin-bottom 20mm --margin-left 20mm --margin-right 20mm \
 --title "Sensor App" \
 --header-html header.html --header-line --header-spacing 3 --header-font-size 10 \
 --footer-line --footer-spacing 3 --footer-left "[section]" --footer-right "Page [page] of [toPage]" --footer-font-size 8 \
 --no-background \
 --print-media-type \
 --user-style-sheet ../../templates/style.css \
 --javascript-delay 6000 \
 --enable-local-file-access \
 --dpi 300 \
 --load-error-handling ignore \
 cover cover.html \
 copyright.html \
 toc \
 --xsl-style-sheet ../../templates/cumulocity-toc-style.xsl \
   http://localhost:1313/docs/sensor-app/sensorapp-introduction/ \
  http://localhost:1313/docs/sensor-app/installing-the-sensor-app/ \
  http://localhost:1313/docs/sensor-app/registering-the-sensor-app/ \
  http://localhost:1313/docs/sensor-app/sending-sensor-data/ \
  http://localhost:1313/docs/sensor-app/viewing-sensor-data/ \
  http://localhost:1313/docs/sensor-app/connecting-bluetooth-devices/ \
  http://localhost:1313/docs/sensor-app/connecting-obd-devices/ \
  http://localhost:1313/docs/sensor-app/configuration/ \
  http://localhost:1313/docs/sensor-app/adjusting-sensor-properties/ \
  http://localhost:1313/docs/sensor-app/peaks-alarms-events/ \
  http://localhost:1313/docs/sensor-app/controlling-devices/ \
"Sensor App.pdf"
