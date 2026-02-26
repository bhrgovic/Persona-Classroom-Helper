const puppeteer = require("puppeteer");
const fs = require("fs-extra");

const URL =
  "https://www.rpgsite.net/feature/9825-persona-4-golden-answers-school-class-quiz-classroom-test-and-exam-questions-and-solutions";

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

    const nodes = document.querySelectorAll("h2, h3, p, li");

    nodes.forEach(node => {
      const text = node.innerText.trim();
      if (!text) return;

      const lower = text.toLowerCase();

      if (
        lower.includes("midterm") ||
        lower.includes("final") ||
        lower.includes("exam")
      ) {
        currentType = "exam";
      }

      // ==========================
      // Detect date (like 5/9)
      // ==========================
      const dateMatch = text.match(/(\d+)\/(\d+)/);
      if (dateMatch && !text.startsWith("Q")) {
        const month = parseInt(dateMatch[1]);
        const day = parseInt(dateMatch[2]);
        const key = `${month}-${day}`;

        if (!grouped[key]) {
          grouped[key] = {
            game: "p4g",
            month,
            day,
            date: `${month}/${day}`,
            type: currentType,
            questions: []
          };
        }

        currentDate = key;
      }

      // ==========================
      // CLASSROOM FORMAT (flat LI)
      // ==========================
      if (node.tagName === "LI" && text.match(/^(\d+)\/(\d+)/)) {

        const match = text.match(/^(\d+)\/(\d+)\s*-\s*(.+)/);
        if (!match) return;

        const month = parseInt(match[1]);
        const day = parseInt(match[2]);
        const key = `${month}-${day}`;

        if (!grouped[key]) {
          grouped[key] = {
            game: "p4g",
            month,
            day,
            date: `${month}/${day}`,
            type: currentType,
            questions: []
          };
        }

        const parts = text.split("\n").map(t => t.trim()).filter(Boolean);

        if (parts.length >= 2) {
          const question = parts[0].replace(/^(\d+\/\d+)\s*-\s*/, "");
          const answer = parts[1];
          grouped[key].questions.push({ question, answer });
        }

        currentDate = key;
      }

      // ==========================
      // EXAM FORMAT (Q inside LI with nested UL)
      // ==========================
      if (node.tagName === "LI" && text.match(/^Q\d+/) && currentDate) {

        const question = text
          .replace(/^Q\d+\s*-\s*/, "")
          .split("\n")[0]
          .trim();

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

  await fs.writeJson("p4g.json", results, { spaces: 2 });

  console.log("Grouped P4G entries:", results.length);
}

scrape();