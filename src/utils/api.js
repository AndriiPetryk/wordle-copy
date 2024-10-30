import axios from 'axios';

// Function to validate a guess against the Wordle API
export const validateGuess = async (guess) => {
    try {
        const response = await axios.post(
            'https://wordle-apis.vercel.app/api/validate',
            { guess }
        );
        return response.data;
    } catch (error) {
        console.error('Error validating guess:', error);
        return { isvalidword: false, score: [] };
    }
};
