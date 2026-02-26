import { motion } from "framer-motion";
import GameLogo from "./GameLogo";

export default function MonthSelect({ game, data, onSelect, onBack, theme }) {
  const months = [
    ...new Set(
      data
        .filter(entry => entry.game === game)
        .map(entry => entry.month)
    )
  ].sort((a, b) => a - b);

  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -40, opacity: 0 }}
      transition={{ duration: 0.4 }}
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
          Select Month
        </h2>

        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {months.map((month, index) => (
              <motion.button
                key={month}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(month)}
                className={`
                  ${theme.button}
                  text-xl
                  font-bold
                  px-10 py-6
                  shadow-lg
                  transition-all
                `}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)"
                }}
              >
                {month}
              </motion.button>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}