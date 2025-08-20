wkhtmltopdf \
 --page-size A4 --margin-top 20mm --margin-bottom 20mm --margin-left 20mm --margin-right 20mm \
 --title "Device certificate authentication" \
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
   http://localhost:1313/docs/device-certificate-authentication/certificate-authority \
  http://localhost:1313/docs/device-certificate-authentication/device-certificates \
  http://localhost:1313/docs/device-certificate-authentication/device-enroll-and-re-enroll \
  http://localhost:1313/docs/device-certificate-authentication/managing-trusted-certificate-settings \
  http://localhost:1313/docs/device-certificate-authentication/managing-trusted-certificates \
"Device certificate authentication-y.pdf"
