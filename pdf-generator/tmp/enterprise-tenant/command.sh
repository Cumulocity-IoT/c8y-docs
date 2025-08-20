wkhtmltopdf \
 --page-size A4 --margin-top 20mm --margin-bottom 20mm --margin-left 20mm --margin-right 20mm \
 --title "Enterprise tenant" \
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
   http://localhost:1313/docs/enterprise-tenant/customization \
  http://localhost:1313/docs/enterprise-tenant/enterprise-tenant-introduction \
  http://localhost:1313/docs/enterprise-tenant/managing-tenants \
  http://localhost:1313/docs/enterprise-tenant/managing-user-hierarchies \
  http://localhost:1313/docs/enterprise-tenant/support-user-access \
  http://localhost:1313/docs/enterprise-tenant/usage-and-billing \
"Enterprise tenant-y.pdf"
