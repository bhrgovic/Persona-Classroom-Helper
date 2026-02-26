import { motion } from "framer-motion";
import GameLogo from "./GameLogo";

export default function GameSelect({ onSelect }) {
  const games = ["p3r", "p4g", "p5r"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8"
    >
      <h1 className="text-2xl tracking-widest uppercase text-zinc-400 mb-16">
        Select Game
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full max-w-6xl">
        {games.map((game, index) => (
          <motion.button
            key={game}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(game)}
            className="p-10 bg-zinc-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)"
            }}
          >
            <GameLogo game={game} />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}