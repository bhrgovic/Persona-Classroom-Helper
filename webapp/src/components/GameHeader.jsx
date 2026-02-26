export default function GameHeader({ game, theme }) {
  const titles = {
    p3r: "Persona 3 Reload",
    p4g: "Persona 4 Golden",
    p5r: "Persona 5 Royal",
  };

  return (
    <div className="mb-12 text-center">
      <h1 className={`text-5xl font-extrabold tracking-wider ${theme ? theme.accent : "text-red-600"}`}>
        {titles[game]}
      </h1>

      <div className={`mt-3 h-1 w-32 mx-auto ${theme ? theme.accent.replace("text", "bg") : "bg-red-600"} rounded-full`} />
    </div>
  );
}