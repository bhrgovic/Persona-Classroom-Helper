import p3rLogo from "../assets/p3r-logo.png";
import p4gLogo from "../assets/p4g-logo.png";
import p5rLogo from "../assets/p5r-logo.png";

const logos = {
  p3r: p3rLogo,
  p4g: p4gLogo,
  p5r: p5rLogo,
};

export default function GameLogo({ game, size = "large" }) {
  const sizeClasses = {
    small: "h-10",
    medium: "h-16",
    large: "h-32 md:h-40",
  };

  return (
    <img
      src={logos[game]}
      alt={game}
      className={`${sizeClasses[size]} object-contain drop-shadow-xl`}
    />
  );
}