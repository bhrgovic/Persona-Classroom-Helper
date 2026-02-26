import { motion } from "framer-motion";
import GameLogo from "./GameLogo";

export default function DaySelect({ game, month, data, onSelect, onBack, theme }) {
  const days = [
    ...new Set(
      data
        .filter(entry => entry.game === game && entry.month === month)
        .map(entry => entry.day)
    )
  ].sort((a, b) => a - b);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen ${theme.bg} text-white relative overflow-hidden`}
    >
      {/* Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} pointer-events-none`}
      />

      {/* Back */}
      <button
        onClick={onBack}
        className={`absolute top-6 left-6 ${theme.accent} hover:underline text-sm`}
      >
        ← Back
      </button>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 pt-20 relative">

        <div className="flex justify-center mb-6">
          <GameLogo game={game} size="large" />
        </div>

        <h2 className={`text-3xl font-semibold text-center mb-12 ${theme.accent}`}>
          Select Day
        </h2>

        <div className="flex justify-center">
          <div className="grid grid-cols-4 gap-6">
            {days.map((day, index) => (
              <motion.button
                key={day}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(day)}
                className={`
                  ${theme.button}
                  px-8 py-4
                  rounded-xl
                  font-semibold
                  shadow-md
                  transition-all
                `}
              >
                {day}
              </motion.button>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}