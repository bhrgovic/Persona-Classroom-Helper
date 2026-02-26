import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import data from "./data/persona-data.json";
import GameSelect from "./components/GameSelect";
import MonthSelect from "./components/MonthSelect";
import DaySelect from "./components/DaySelect";
import AnswerView from "./components/AnswerView";
import { themes } from "./theme";

function App() {
  const [game, setGame] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);

  const theme = game ? themes[game] : null;

  // Determine current view
  let view = "game";
  if (game && !month) view = "month";
  if (game && month && !day) view = "day";
  if (game && month && day) view = "answer";

  return (
    <div className={`min-h-screen ${theme ? theme.bg : "bg-black"} text-white relative overflow-hidden transition-colors duration-500`}>

      {/* Subtle background glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_left,_white_0%,_transparent_40%)]" />

      <AnimatePresence mode="wait">

        {view === "game" && (
          <GameSelect
            key="game"
            onSelect={setGame}
          />
        )}

        {view === "month" && (
          <MonthSelect
            key="month"
            game={game}
            data={data}
            theme={theme}
            onSelect={setMonth}
            onBack={() => setGame(null)}
          />
        )}

        {view === "day" && (
          <DaySelect
            key="day"
            game={game}
            month={month}
            data={data}
            theme={theme}
            onSelect={setDay}
            onBack={() => setMonth(null)}
          />
        )}

        {view === "answer" && (
          <AnswerView
            key="answer"
            game={game}
            month={month}
            day={day}
            data={data}
            theme={theme}
            onBack={() => setDay(null)}
          />
        )}

      </AnimatePresence>
    </div>
  );
}

export default App;