import { fetchData } from './apiService';

export const findOrCreatePlayer = async (name) => {
  try {
    const response = await fetchData(`/find-or-create-user/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error("Error finding or creating player:", error);
    throw error;
  }
};

export const postScore = async (player, score, level) => {
  try {
    const response = await fetchData(`/add-score`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: player._id, score, level }),
    });
    return response;
  } catch (error) {
    console.error("Error posting player score:", error);
    throw error;
  }
};