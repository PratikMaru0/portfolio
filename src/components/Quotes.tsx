import { useState } from "react";
import { quotes } from "../mockData";
import { Button } from "./common";

const emojis = ["😂", "🤪", "😜", "🤣", "😹", "😛", "😆", "🙃", "😏", "😇", "🥳", "🤓"];


const Quotes = () => {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % quotes.length);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] w-full overflow-hidden py-16">
      {/* Emoji background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-6xl opacity-20"
            style={{
              left: `${Math.random() * 95}%`,
              top: `${Math.random() * 90}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              userSelect: "none",
            }}
          >
            {emojis[Math.floor(Math.random() * emojis.length)]}
          </span>
        ))}
      </div>
      {/* Quote card */}
      <div className="relative z-10 bg-themeBackground rounded-2xl shadow-lg px-8 py-10 max-w-xl w-full flex flex-col items-center">
        <div className="text-2xl md:text-3xl font-semibold text-center mb-6">
          “{quotes[current].quote}”
        </div>
        <div className="text-base opacity-70 text-center mb-4">
          — {quotes[current].author}
        </div>

        <Button text="Next" onClick={handleNext} style="mt-2 px-6 py-2 rounded-full border border-primary hover:bg-primary/80 transition-colors duration-200 font-medium"/>
      </div>
    </div>
  );
};

export default Quotes;