import React, { useEffect, useState } from "react";

const Score = (props) => (
  <tr>
    <td>{props.score.score}</td>
    <td>{props.score.userDetails.name}</td>
    <td>{props.score.score}</td>
  </tr>
);

const TopScores = () => {
  const [scores, setTopScores] = useState([]);
  // This method fetches the records from the database.
  useEffect(() => {
    async function getTopScores() {
      const response = await fetch(`http://localhost:5000/top-scores/`);
      
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      
      const scores = await response.json();

      console.log(scores);

      // Fetch user details for each score
      const scoresWithUserDetails = await Promise.all(
        scores.map(async (score) => {
          const userResponse = await fetch(`http://localhost:5000/user/${score.user}`);
          console.log(userResponse);
          if (!userResponse.ok) {
            throw new Error('Failed to fetch user details');
          }

          const userData = await userResponse.json();
          return { ...score, userDetails: userData };
        })
      );
      console.log(scoresWithUserDetails);

      setTopScores(scoresWithUserDetails);
    }
    getTopScores();
    return;
  }, [scores.length]);

  // This method will map out the records on the table
  function TopScores() {
    return scores.map((score) => {
      return (
        <Score
          score={score}
          key={score._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div className="position-relative">
      <h3>Top Scores</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Score</th>
            <th>Name</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>{TopScores()}</tbody>
      </table>
    </div>
  );
};

export default TopScores;
