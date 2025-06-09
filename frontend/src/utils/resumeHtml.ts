export function generateResumeHtml(
  resumeContent: HTMLElement | null,
): string | null {
  if (!resumeContent) return null;

  const html = resumeContent.outerHTML;
  const styleSheets = Array.from(document.styleSheets);
  const styles = styleSheets
    .map((sheet) => {
      try {
        return Array.from(sheet.cssRules)
          .map((rule) => rule.cssText)
          .join("\n");
      } catch {
        return "";
      }
    })
    .join("\n");

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          ${styles}
          @page {
            size: A4;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;
}

export function downloadHtml(html: string, filename: string = "resume.html") {
  const blob = new Blob([html], { type: "text/html" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
