import { config } from '../config';

export async function fetchData(endpoint, options = {}) {
  try {
    const response = await fetch(`${config.apiEndpoint}${endpoint}`, options);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    // Handle or throw error
    console.error(error);
    throw error;
  }
};