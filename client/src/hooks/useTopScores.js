import { useState, useEffect } from 'react';
import { fetchData } from '../services/apiService';

export default function useTopScores(trigger) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const getTopScores = async () => {
      try {
        const rawScores = await fetchData('/top-scores?limit=8');

        const scoresWithUserDetails = await Promise.all(
          rawScores.map(async (score) => {
            const userData = await fetchData(`/user/${score.user}`);
            return { ...score, userDetails: userData };
          }),
        );

        setScores(scoresWithUserDetails);
      } catch (error) {
        console.error("Error fetching top scores:", error);
      }
    };

    getTopScores();
  }, [trigger]);

  return scores;
};
