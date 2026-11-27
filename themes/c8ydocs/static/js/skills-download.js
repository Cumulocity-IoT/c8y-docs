// Skill downloads (partials/footer.html loads this script on the home page and the skills pages):
// - Card buttons (partials/skills/download-button.html): "Download all skills" on the Skills card
//   of the home page and "Download skills" on each topic card of the Skills landing page. They
//   fetch the skill files that layouts/skills/list.md publishes, as listed in their manifest
//   (all files, or the files of one topic), and zip them.
// - "Copy SKILL.md" and "Download skill" on a skill page (layouts/skills/single.html), and
//   "Download skill" on the skill cards (partials/skills/card.html), use the skill's index.md,
//   which is the same text as its SKILL.md.
// JSZip (the script's data-jszip URL) loads on the first download.
(function () {
  const jszipUrl = document.currentScript && document.currentScript.dataset.jszip;
  let jszipLoading = null;

  function loadJSZip() {
    if (typeof JSZip !== "undefined") {
      return Promise.resolve();
    }
    if (!jszipLoading) {
      jszipLoading = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = jszipUrl;
        script.onload = resolve;
        script.onerror = () => {
          jszipLoading = null;
          reject(new Error(`${jszipUrl} did not load`));
        };
        document.head.appendChild(script);
      });
    }
    return jszipLoading;
  }

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

  // Runs action while the button is disabled; show(text) reports progress, null restores the start
  async function run(button, show, busyText, doneText, errorText, action) {
    button.disabled = true;
    show(busyText);
    try {
      await action();
      show(doneText);
    } catch (error) {
      console.error("Skill download failed", error);
      show(errorText);
    } finally {
      button.disabled = false;
    }
  }

  // One skill as a ZIP file with its folder, ready to unpack into the skills folder of an agent
  async function downloadSkill(button) {
    await loadJSZip();
    const name = button.dataset.skillName;
    const zip = new JSZip();
    zip.file(`${name}/SKILL.md`, await (await fetchOk(button.dataset.skillDownload)).text());
    saveBlob(await zip.generateAsync({ type: "blob" }), `${name}.zip`);
  }

  // For card buttons: show(text) puts the progress in the button label
  function labelProgress(button) {
    const label = button.querySelector(".skills-download__label");
    const initialLabel = label.textContent;
    let resetTimer = null;
    return (text) => {
      clearTimeout(resetTimer);
      label.textContent = text === null ? initialLabel : text;
      // A failure shows briefly in the label, then the button reads as before
      if (text === "Download failed") {
        resetTimer = setTimeout(() => (label.textContent = initialLabel), 4000);
      }
    };
  }

  // Card buttons: the progress shows in the button label
  document.querySelectorAll("[data-skills-download]").forEach((button) => {
    const show = labelProgress(button);
    button.addEventListener("click", () =>
      run(button, show, "Preparing…", null, "Download failed", async () => {
        await loadJSZip();
        const manifestUrl = new URL(button.dataset.skillsDownload, window.location.href);
        const manifest = await (await fetchOk(manifestUrl)).json();
        const base = new URL(manifest.root, manifestUrl);
        // A topic card downloads the topic's skills, the skills they build on, and the README
        const topic = button.dataset.topic;
        const files = topic ? manifest.topics[topic].files : manifest.files;
        const zip = new JSZip();
        const texts = await Promise.all(
          files.map(async (file) => (await fetchOk(new URL(file, base))).text())
        );
        files.forEach((file, index) => zip.file(manifest.root + file, texts[index]));
        saveBlob(await zip.generateAsync({ type: "blob" }), topic ? `${manifest.name}-${topic}.zip` : `${manifest.name}.zip`);
      })
    );
  });

  // "Download skill" on the skill cards (partials/skills/card.html) of the topic pages and the
  // Skills tabs: the progress shows in the button label
  document.querySelectorAll(".skill-card [data-skill-download]").forEach((button) => {
    const show = labelProgress(button);
    button.addEventListener("click", () =>
      run(button, show, "Preparing…", null, "Download failed", () => downloadSkill(button))
    );
  });

  // Skill pages: the progress shows in the status line of the box
  document.querySelectorAll(".skill-agent").forEach((box) => {
    const status = box.querySelector(".skill-agent__status");
    const show = (text) => {
      status.classList.remove("sr-only");
      status.textContent = text === null ? "" : text;
    };

    // Copying shows "Copied!" above the button, like the copy buttons of code blocks (main.js,
    // clipboardCode). The status line says it only to screen readers, and shows errors.
    const copy = box.querySelector("[data-skill-copy]");
    const copied = "SKILL.md copied to the clipboard.";
    const showCopy = (text) => {
      show(text);
      if (text === copied) {
        status.classList.add("sr-only");
        copy.classList.add("copied");
        setTimeout(() => copy.classList.remove("copied"), 1500);
      }
    };
    if (copy && navigator.clipboard) {
      copy.addEventListener("click", () =>
        run(copy, showCopy, null, copied, "That did not work. Reload the page and try again.", async () => {
          const text = await (await fetchOk(copy.dataset.skillCopy)).text();
          await navigator.clipboard.writeText(text);
        })
      );
    } else if (copy) {
      copy.hidden = true;
    }

    const download = box.querySelector("[data-skill-download]");
    if (download) {
      download.addEventListener("click", () =>
        run(download, show, "Preparing the download…", null, "That did not work. Reload the page and try again.", () => downloadSkill(download))
      );
    }
  });
})();
