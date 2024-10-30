import { useState } from 'react';
import { validateGuess } from '../utils/api'; // Import the API function

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(6)]); // Each guess is an array
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); // Tracks used keys and their colors

  // Format a guess based on API response
  const formatGuess = (score) => {
    let formattedGuess = [...currentGuess].map((l, i) => {
      let color = 'grey'; // Default color
      if (score[i] === 2) color = 'green'; // Correct position
      else if (score[i] === 1) color = 'yellow'; // Present but wrong position

      return { key: l, color };
    });

    return formattedGuess;
  };

  // Add a new guess to the state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess.toLowerCase() === solution) setIsCorrect(true);

    setGuesses((prev) => {
      const newGuesses = [...prev];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setUsedKeys((prev) => {
      const newKeys = { ...prev };
      formattedGuess.forEach((l) => {
        const currentColor = newKeys[l.key];

        // Update key colors only if the new color is more important
        if (l.color === 'green') newKeys[l.key] = 'green';
        else if (l.color === 'yellow' && currentColor !== 'green') newKeys[l.key] = 'yellow';
        else if (l.color === 'grey' && !['green', 'yellow'].includes(currentColor)) {
          newKeys[l.key] = 'grey';
        }
      });
      return newKeys;
    });

    setTurn((prev) => prev + 1);
    setCurrentGuess('');
  };

  // Handle keyboard input
  const handleKeyup = async ({ key }) => {
    if (key === 'Enter') {
      // Validate conditions before sending the guess
      if (turn > 5) {
        console.log('You have used all your guesses.');
        return;
      }
      if (currentGuess.length !== 5) {
        console.log('The word must be 5 letters long.');
        return;
      }

      // Call the API to validate the guess
      const response = await validateGuess(currentGuess.toLowerCase());

      if (!response.isvalidword) {
        console.log('Invalid word! Try again.');
        return;
      }

      // Format guess based on API response and update state
      const formatted = formatGuess(response.score);
      addNewGuess(formatted);
    } else if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};

export default useWordle;
