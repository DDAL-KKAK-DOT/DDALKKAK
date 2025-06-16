export function generateResumeHtml(
  resumeContent: HTMLElement | null,
  theme: "type1" | "type2" | "type3" | "type4" | "type5" = "type1",
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

  // 테마별 배경색 설정
  const themeBackgroundColors = {
    type1: "#ffffff",
    type2: "#ffffff",
    type3: "#0f172a",
    type4: "#ffffff",
    type5: "#ffffff",
  };

  const themeBackgroundColor = themeBackgroundColors[theme];
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
            min-height: 100vh;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: ${themeBackgroundColor};
          }
          html {
            background-color: ${themeBackgroundColor};
            min-height: 100vh;
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
