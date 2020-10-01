const playwright = require("playwright");
const playwrightP = require("playwright/package.json");
const path = require("path");
const { cwd, exit } = require("process");

// allow await
(async () => {
  const options = {
    headless: true,
  };

  const chrome = await playwright["chromium"].launch(options);

  const newPage = async (browser) => {
    const context = await browser.newContext({
        viewport: { width: 1280, height: 800 },
      }),
      page = await context.newPage();
    return page;
  };

  newPage(chrome).then(async (page) => {
    await page.evaluate((body) => {
      const div = document.createElement("div");
      div.style.width = "1250px";
      div.style.height = "8440px";
      div.style.background = "linear-gradient(#e66465, #9198e5)";
      document.body.appendChild(div);
    });
    const divHandle = await page.$("div");
    const dest = path.join(
      process.cwd(),
      "screenshots",
      `${playwrightP.version}.png`
    );
    await divHandle.screenshot({ path: dest });

    exit();
  });
})();
