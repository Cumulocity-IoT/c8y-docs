// Skill downloads, loaded on all pages of the skills section (partials/footer.html):
// - "Download all skills" on the overview (layouts/skills/list.html) fetches the skill files
//   that layouts/skills/list.md publishes, as listed in their manifest, and zips them.
// - "Copy SKILL.md" and "Download skill" on a skill page (layouts/skills/single.html) use the
//   page's index.md, which is the same text as its SKILL.md.
(function () {
  async function fetchOk(url) {
    const response = await fetch(url, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`${url}: HTTP ${response.status}`);
    }
    return response;
  }

  function saveBlob(blob, fileName) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    // Revoke later: revoking right after click() can cancel the download in some browsers
    setTimeout(() => URL.revokeObjectURL(link.href), 10000);
  }

  // Runs action while the button is disabled and reports the outcome in status
  async function run(button, status, busyText, doneText, action) {
    const initialText = status.textContent;
    button.disabled = true;
    status.textContent = busyText;
    try {
      await action();
      status.textContent = doneText === null ? initialText : doneText;
    } catch (error) {
      console.error("Skill download failed", error);
      status.textContent = "That did not work. Reload the page and try again.";
    } finally {
      button.disabled = false;
    }
  }

  const all = document.getElementById("download-skills");
  if (all && typeof JSZip !== "undefined") {
    const status = document.getElementById("download-skills-status");
    all.addEventListener("click", () =>
      run(all, status, "Preparing the download…", null, async () => {
        const manifestUrl = new URL(all.dataset.manifest, window.location.href);
        const manifest = await (await fetchOk(manifestUrl)).json();
        const base = new URL(manifest.root, manifestUrl);
        const zip = new JSZip();
        const texts = await Promise.all(
          manifest.files.map(async (file) => (await fetchOk(new URL(file, base))).text())
        );
        manifest.files.forEach((file, index) => zip.file(manifest.root + file, texts[index]));
        saveBlob(await zip.generateAsync({ type: "blob" }), `${manifest.name}.zip`);
      })
    );
  }

  document.querySelectorAll(".skill-agent").forEach((box) => {
    const status = box.querySelector(".skill-agent__status");

    const copy = box.querySelector("[data-skill-copy]");
    if (copy && navigator.clipboard) {
      copy.addEventListener("click", () =>
        run(copy, status, "Copying…", "SKILL.md copied to the clipboard.", async () => {
          const text = await (await fetchOk(copy.dataset.skillCopy)).text();
          await navigator.clipboard.writeText(text);
        })
      );
    } else if (copy) {
      copy.hidden = true;
    }

    // The skill as a ZIP file with its folder, ready to unpack into the skills folder
    const download = box.querySelector("[data-skill-download]");
    if (download && typeof JSZip !== "undefined") {
      download.addEventListener("click", () =>
        run(download, status, "Preparing the download…", "", async () => {
          const name = download.dataset.skillName;
          const zip = new JSZip();
          zip.file(`${name}/SKILL.md`, await (await fetchOk(download.dataset.skillDownload)).text());
          saveBlob(await zip.generateAsync({ type: "blob" }), `${name}.zip`);
        })
      );
    } else if (download) {
      download.hidden = true;
    }
  });
})();
