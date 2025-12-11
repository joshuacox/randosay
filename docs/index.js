/**
 * Fetches the repository's README.md file and displays its raw content
 * inside the <pre id="readme"> element.
 *
 * This script runs in the browser, so it relies on the README.md file
 * being served from the same origin (e.g., via GitHub Pages or a local
 * static server).
 */
(async function () {
  const readmeElement = document.getElementById('readme');
  if (!readmeElement) return;

  try {
    const response = await fetch('../README.md');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    // Escape HTML entities to avoid rendering markdown as HTML.
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    readmeElement.textContent = escaped;
  } catch (err) {
    readmeElement.textContent = `Failed to load README.md: ${err.message}`;
    console.error(err);
  }
})();
