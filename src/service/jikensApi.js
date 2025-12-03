const BASE_URL = "https://api.jikan.moe/v4";

export const fetchFromApi = async (endpoint) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json()
};
