import React, { useState, useEffect } from "react";

function Navbar() {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [linkTexts, setLinkTexts] = useState(["About", "Projects", "Contact"]);
  const originalLinkTexts = ["About", "Projects", "Contact"];
  const scrambleText = (text) => text.split('').map(() => Math.random().toString(36)[2]).join('');

  const animateScrambleText = (index) => {
    const scrambled = scrambleText(originalLinkTexts[index]);
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < scrambled.length) {
        setLinkTexts((prevTexts) => {
          const newTexts = [...prevTexts];
          newTexts[index] = scrambled.substring(0, i + 1);
          return newTexts;
        });
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, 50);
  };

  useEffect(() => {
    if (hoverIndex !== null) {
      animateScrambleText(hoverIndex);
      const timer = setTimeout(() => {
        setHoverIndex(null);
        setLinkTexts((prevTexts) => {
          const newTexts = [...prevTexts];
          newTexts[hoverIndex] = originalLinkTexts[hoverIndex];
          return newTexts;
        });
      }, 410);
      return () => clearTimeout(timer);
    }
  }, [hoverIndex]);

  return (
    <div className="navbar bg-transparent">
      <div className="navbar__logo">
        <li>K</li>
      </div>
      <div className="navbar__links">
        {linkTexts.map((link, index) => (
          <li
            key={index}
            onMouseOver={() => setHoverIndex(index)}
            className="text-blue-500"
          >
            {link}
          </li>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
