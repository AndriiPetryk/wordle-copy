import React from 'react';

export default function Modal({ isCorrect, solution, turn }) {
  return (
      <div className="modal">
        {isCorrect ? (
            <div>
              <h1>You Win!</h1>
              <p className="solution">{solution}</p>
              <p>You found the solution in {turn} guesses!</p>
            </div>
        ) : (
            <div>
              <h1>Try Again!</h1>
              <p className="solution">The word was: {solution}</p>
              <p>Better luck next time!</p>
            </div>
        )}
      </div>
  );
}
