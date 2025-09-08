wkhtmltopdf \
 --page-size A4 --margin-top 20mm --margin-bottom 20mm --margin-left 20mm --margin-right 20mm \
 --title "Legal notices" \
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
   http://localhost:1313/docs/legal-notices/copyright/ \
  http://localhost:1313/docs/legal-notices/third-party-information/ \
  http://localhost:1313/docs/legal-notices/privacy-notice/ \
  http://localhost:1313/docs/legal-notices/us-state-privacy-notice/ \
  http://localhost:1313/docs/legal-notices/license-terms-and-conditions/ \
  http://localhost:1313/docs/legal-notices/export-control-compliance/ \
  http://localhost:1313/docs/legal-notices/limited-use-license-for-docker/ \
  http://localhost:1313/docs/legal-notices/acceptable-use-policy/ \
  http://localhost:1313/docs/legal-notices/cloud-trial-service-agreement/ \
  http://localhost:1313/docs/legal-notices/responsible-disclosure-policy/ \
  http://localhost:1313/docs/legal-notices/imprint/ \
"Legal notices-y2025.pdf"
