// "Download as skills" on the recipes overview (layouts/recipes/list.html). Fetches the
// skill files that layouts/recipes/list.md publishes, as listed in their manifest, and
// zips them in the browser with JSZip.
(function () {
  const button = document.getElementById("download-skills");
  const status = document.getElementById("download-skills-status");
  if (!button || typeof JSZip === "undefined") {
    return;
  }
  const initialStatus = status.textContent;

  async function fetchOk(url) {
    const response = await fetch(url, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`${url}: HTTP ${response.status}`);
    }
    return response;
  }

  button.addEventListener("click", async () => {
    button.disabled = true;
    status.textContent = "Preparing the download…";
    try {
      const manifestUrl = new URL(button.dataset.manifest, window.location.href);
      const manifest = await (await fetchOk(manifestUrl)).json();
      const base = new URL(manifest.root, manifestUrl);

      const zip = new JSZip();
      const texts = await Promise.all(
        manifest.files.map(async (file) => (await fetchOk(new URL(file, base))).text())
      );
      manifest.files.forEach((file, index) => zip.file(manifest.root + file, texts[index]));

      const blob = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${manifest.name}.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      // Revoke later: revoking right after click() can cancel the download in some browsers
      setTimeout(() => URL.revokeObjectURL(link.href), 10000);
      status.textContent = initialStatus;
    } catch (error) {
      console.error("Skills download failed", error);
      status.textContent = "The download failed. Reload the page and try again.";
    } finally {
      button.disabled = false;
    }
  });
})();
