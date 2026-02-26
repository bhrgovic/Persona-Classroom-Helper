const puppeteer = require("puppeteer");
const fs = require("fs-extra");

const URL =
  "https://www.rpgsite.net/feature/9602-persona-5-royal-exam-answers-class-test-solutions";

async function scrape() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  await page.goto(URL, {
    waitUntil: "domcontentloaded",
    timeout: 60000
  });

  const results = await page.evaluate(() => {
    const grouped = {};
    let currentType = "classroom";
    let currentDate = null;

    // Grab all list items and heading nodes
    const nodes = document.querySelectorAll("h2, h3, li, p");

    nodes.forEach(node => {
      const raw = node.innerText.trim();
      if (!raw) return;

      const text = raw.replace(/\u00A0/g, " ").trim();
      const lower = text.toLowerCase();

      // Detect exam section headers
      if (
        lower.includes("midterm") ||
        lower.includes("final") ||
        lower.includes("exam")
      ) {
        currentType = "exam";
      }

      // ==================================
      // DATE DETECTION
      // ==================================

      // Detect date like `4/12 - …`
      const dateMatch = text.match(/^(\d+)\/(\d+)/);
      if (dateMatch && text.includes("-")) {
        const month = parseInt(dateMatch[1]);
        const day = parseInt(dateMatch[2]);
        const key = `${month}-${day}`;

        if (!grouped[key]) {
          grouped[key] = {
            game: "p5r",
            month,
            day,
            date: `${month}/${day}`,
            type: currentType,
            questions: []
          };
        }

        currentDate = key;
      }

      // ==================================
      // CLASSROOM ENTRY (flat LI)
      // ==================================
      if (node.tagName === "LI" && text.match(/^(\d+)\/(\d+)/)) {
        const parts = text.split("\n").map(t => t.trim()).filter(Boolean);

        if (parts.length >= 2 && currentDate) {
          const question = parts[0].replace(/^(\d+\/\d+)\s*-\s*/, "");
          const answer = parts[1];

          grouped[currentDate].questions.push({ question, answer });
        }
      }

      // ==================================
      // EXAM ENTRY (LI with nested UL)
      // ==================================
      if (node.tagName === "LI" && text.match(/^Q\d+/) && currentDate) {
        const question = text.replace(/^Q\d+\s*-\s*/, "").trim();

        const nestedUl = node.querySelector("ul");
        if (nestedUl) {
          const answerLi = nestedUl.querySelector("li");
          if (answerLi) {
            const answer = answerLi.innerText.trim();

            grouped[currentDate].questions.push({
              question,
              answer
            });
          }
        }
      }
    });

    return Object.values(grouped);
  });

  await browser.close();

  await fs.writeJson("p5r.json", results, { spaces: 2 });

  console.log("Grouped P5R entries:", results.length);
}

scrape();