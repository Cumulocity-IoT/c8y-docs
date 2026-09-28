# PDF Generator

This directory generates **PDF documentation** from markdown card files (`*-card.md`) and the links listed in `sitemap.xml`.  
It uses **Node.js** + **TypeScript** to prepare content, applies custom HTML templates, and runs a **Bash script** (`wkhtmltopdf`) to produce PDFs.  
The process is automated in **GitHub Actions**, so PDFs are generated and deployed whenever the site is built.  

---

## Repository Layout

```
c8y-docs
│──content # Markdown card files
│──pdf-generator/
    │── pdf-generator.ts # Main script for generating PDFs
    │── package.json # Dependencies and npm scripts
    │── templates/ # HTML, CSS, XSL, and Bash script templates
    │ ├── command.template.sh
    │ ├── cover.template.html
    │ ├── header.template.html
    │ ├── pdf-copyright-page.html
    │ ├── style.css
    │ └── cumulocity-toc-style.xsl
│── public/
     ├── pdfs/ # Final generated PDFs
     └── sitemap.xml # Sitemap with URLs
```

---

## How It Works (Step by Step)

1. **Clean up temporary files**  
   - Removes `./tmp` if it exists.  
   - Deletes old PDFs from `/public/pdfs`.  

2. **Find markdown card files**  
   - Scans `/content` (recursively) for `*-card.md` files.  
   - Each card file represents one PDF bundle.  

3. **Parse sitemap.xml**  
   - Reads `/public/sitemap.xml`.  
   - Collects all URLs related to the folder of the card file.  
   - Skips top-level folder URLs.  

4. **Read metadata**  
   - Each `*-card.md` file contains front matter:  
     - `title` → PDF title and filename  
     - `bundlefolder` → folder name used for sitemap links  

5. **Generate template files**  
   - Replaces placeholders (`{{ title }}`, `{{ urls }}`, `{{ current_year }}`) inside the template files.  
   - Produces ready-to-use files:  
     - `cover.html`  
     - `header.html`  
     - `copyright.html`  
     - `command.sh`  

6. **Run wkhtmltopdf via Bash**  
   - Executes `command.sh`.  
   - Combines cover page, copyright page, TOC, and URLs.  
   - Applies `style.css` and `cumulocity-toc-style.xsl`.  

7. **Save the PDF**  
   - Copies the generated PDF into `/public/pdfs`.  
   - Cleans up temp files.  

8. **Automated Workflow (CI/CD)**  
   - The GitHub Actions workflow (`build-and-deploy.yml`) also runs the PDF generator.  
   - After the documentation is built and deployed, the workflow:  
     - Moves into the `pdf-generator` folder  
     - Installs dependencies with `npm ci`  
     - Runs `npm run generate` to create PDFs  
     - Uploads the generated PDFs to the target server under `/pdfs`  

   **Workflow snippet:**

   ```
   - name: Generate PDFs
     run: |
       cd pdf-generator
       npm ci
       npm run generate

   - name: Upload PDFs
     run: |
       rsync -e 'ssh -A -J ${{ secrets.SSH_USER }}@${{ secrets.SSH_JUMPHOST }}' \
         -avh ./public/pdfs/ \
         ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:${{ env.DESTINATION_PATH }}/pdfs \
         --delete-after
      ```

---

## PDF Download Button Integration

To make the generated PDFs accessible from the site itself, a **Download PDF** button has been added.

### How it works
- A new `_print.scss` file in `themes/c8ydocs/assets/scss/` provides **print-specific styles** after Hugo builds the content.  
- The `layouts/_default/list.html` template has been updated to:
  - Check whether a `.Params.pdf_url` is defined in front matter:
    - If yes → uses that URL directly.
    - If not → generates a safe filename from the page title and maps it to `public/pdfs/<title>.pdf`.
  - Render a **Download button** below each product card.
  - Open the PDF in a new browser tab when clicked.

---

## Warnings

### libpng warning: iCCP: known incorrect sRGB profile
When generating PDFs, you may see warnings like: `libpng warning: iCCP: known incorrect sRGB profile`

This happens because some PNG images contain an invalid or unnecessary ICC color profile.  
It does **not** stop PDF generation, but you can clean up your images to remove the warnings.

#### Solution
1) Install ImageMagick Tool 
2) Go to the `static/images` folder and check if any PNGs have `iCCP` or `sBIT` tags:
3) Use this command ```magick identify -verbose *.png | grep -E "iCCP|sBIT"``` to verify the image
4) To resolve the warnings, use this command: ```magick mogrify -strip *.png```