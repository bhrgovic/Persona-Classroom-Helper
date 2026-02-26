import { motion } from "framer-motion";
import GameLogo from "./GameLogo";

export default function AnswerView({ game, month, day, data, onBack, theme }) {
  const entry = data.find(
    (e) => e.game === game && e.month === month && e.day === day
  );

  if (!entry) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className={`min-h-screen ${theme.bg} text-white relative overflow-hidden`}
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} pointer-events-none`}
      />

      {/* Back pinned */}
      <button
        onClick={onBack}
        className={`absolute top-6 left-6 ${theme.accent} hover:underline text-sm`}
      >
        ← Back
      </button>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 pt-20 relative">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <GameLogo game={game} size="large" />
        </div>

        {/* Date */}
        <h2 className={`text-3xl font-semibold text-center mb-16 ${theme.accent}`}>
          {month}/{day}
        </h2>

        {/* Questions */}
        <div className="space-y-10">
          {entry.questions.map((q, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`
                ${theme.card}
                p-8
                rounded-xl
                shadow-2xl
                relative
              `}
              style={{
                clipPath:
                  game === "p5r"
                    ? "polygon(0 0, 100% 0, 100% 92%, 92% 100%, 0 100%)"
                    : game === "p4g"
                    ? "polygon(0 0, 100% 0, 100% 96%, 96% 100%, 0 100%)"
                    : "polygon(0 0, 100% 0, 100% 94%, 94% 100%, 0 100%)",
              }}
            >
              <p className="text-lg md:text-xl leading-relaxed mb-6 opacity-90">
                {q.question}
              </p>

              <div className="flex items-center space-x-3">
                <span
                  className={`w-2 h-2 rounded-full ${theme.accent.replace(
                    "text",
                    "bg"
                  )}`}
                />
                <p className={`text-xl md:text-2xl font-bold ${theme.accent}`}>
                  {q.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}