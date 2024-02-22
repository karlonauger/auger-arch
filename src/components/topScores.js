import React, { useEffect, useState } from "react";

const Score = (props) => (
  <tr>
    <td>{props.score.userDetails.username}</td>
    <td>{props.score.score}</td>
    <td>{props.score.level}</td>
  </tr>
);

const TopScores = ({ onScoreUpdate }) => {
  const [scores, setTopScores] = useState([]);
  // This method fetches the records from the database.
  useEffect(() => {
    async function getTopScores() {
      const response = await fetch(`http://localhost:5000/top-scores/`);
      
      if (!response.ok) {
        console.log(`An error occurred: ${response.statusText}`);
        return;
      }
      
      const scores = await response.json();

      // Fetch user details for each score
      const scoresWithUserDetails = await Promise.all(
        scores.map(async (score) => {
          const userResponse = await fetch(`http://localhost:5000/user/${score.user}`);
          if (!userResponse.ok) {
            throw new Error('Failed to fetch user details');
          }

          const userData = await userResponse.json();
          return { ...score, userDetails: userData };
        })
      );
      
      setTopScores(scoresWithUserDetails);
    }
    getTopScores();
    return;
  }, [onScoreUpdate]);

  // This method will map out the records on the table
  function TopScores() {
    return scores.map((score) => {
      return (
        <Score score={score} key={score._id}/>
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div className="position-relative">
      <table className="table table-striped text-start">
        <thead>
          <tr>
            <th>Player</th>
            <th>High Score</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>{TopScores()}</tbody>
      </table>
    </div>
  );
};

export default TopScores;
