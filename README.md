# Persona Classroom & Exam Answers Web App

A responsive web application for browsing classroom and exam answers
for:

-   Persona 3 Reload
-   Persona 4 Golden
-   Persona 5 Royal

This project includes:

-   A React + Vite frontend
-   Game-specific UI themes
-   Smooth animations with Framer Motion
-   A Puppeteer-based scraping pipeline
-   Unified normalized dataset generation

------------------------------------------------------------------------

## 🚀 Running the Web App

1.  Navigate to the frontend:

    cd webapp

2.  Install dependencies:

    npm install

3.  Start development server:

    npm run dev

Open the local URL shown in the terminal (usually
http://localhost:5173).

------------------------------------------------------------------------

## 🧠 Generating Data

Scraping is handled inside the `scraper/` directory.

### Install scraper dependencies

cd scraper npm install

### Run scrapers

node scrapeP3R.js node scrapeP4G.js node scrapeP5R.js

### Merge all games into frontend dataset

node merge.js

This generates:

webapp/src/data/persona-data.json

------------------------------------------------------------------------

## 🗂 Data Schema

All entries follow this unified structure:

{ "game": "p5r", "month": 4, "day": 12, "date": "4/12", "type":
"classroom", "questions": \[ { "question": "Question text", "answer":
"Correct answer" } \] }

Exam days contain multiple questions inside the `questions` array.

------------------------------------------------------------------------

## 🎨 Features

-   Game selection screen
-   Themed UI per game
-   Smooth page transitions
-   Responsive layout
-   Nested exam support
-   Unified structured dataset

------------------------------------------------------------------------


## ⚠️ Notes

-   Scrapers rely on the current HTML structure of RPGSite.
-   If RPGSite changes its structure, scraper updates may be required.
-   Generated JSON files inside `scraper/` are ignored via `.gitignore`.

------------------------------------------------------------------------

## 📄 License

This project is for educational and personal use only.

All game content belongs to their respective publishers.
