const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs-extra");

const URL =
  "https://www.rpgsite.net/guide/15319-persona-3-reload-school-answers-exam-test-solutions-list";

async function scrape() {
  const { data } = await axios.get(URL);
  const $ = cheerio.load(data);

  const grouped = {};

  let currentType = "classroom";

  $("h2, h3").each((_, heading) => {
    const headingText = $(heading).text().toLowerCase();

    if (
      headingText.includes("midterm") ||
      headingText.includes("final") ||
      headingText.includes("exam")
    ) {
      currentType = "exam";
    } else {
      currentType = "classroom";
    }

    let next = $(heading).next();

    while (next.length && !next.is("h2, h3")) {
      if (next.is("ul")) {
        next.find("li").each((_, el) => {
          const text = $(el).text().trim();
          const match = text.match(/^(\d+)\/(\d+)\s*-\s*(.+)/);
          if (!match) return;

          const month = parseInt(match[1]);
          const day = parseInt(match[2]);

          const parts = text
            .split("\n")
            .map((t) => t.trim())
            .filter(Boolean);
          if (parts.length < 2) return;

          const question = parts[0].replace(/^(\d+\/\d+)\s*-\s*/, "");
          const answer = parts[1];

          const key = `${month}-${day}`;

          if (!grouped[key]) {
            grouped[key] = {
              game: "p3r",
              month,
              day,
              date: `${month}/${day}`,
              type: currentType,
              questions: [],
            };
          }

          grouped[key].questions.push({ question, answer });
        });
      }

      next = next.next();
    }
  });
  const results = Object.values(grouped);

  await fs.writeJson("p3r.json", results, { spaces: 2 });
  console.log("Grouped P3R entries:", results.length);
}

scrape();
