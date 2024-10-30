import React from 'react';

export default function Keypad({ usedKeys }) {

  const letters = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  return (
      <div className="keypad">
        {letters.map((l, index) => {
          const color = usedKeys[l] || '';
          return (
              <div key={index} className={`key ${color}`}>
                {l}
              </div>
          );
        })}
      </div>
  );
}
