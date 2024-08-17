// External Libraries
import axios from 'axios';

// Constants
const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const BASE_URL = 'https://api.unsplash.com/search/photos';
export const IMAGES_PER_PAGE = 15;

// Utility function imitating slow download speed
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchImages = async (query, page) => {
  try {
    const url = new URL(BASE_URL);
    url.searchParams.append('client_id', API_KEY);
    url.searchParams.append('query', query);
    url.searchParams.append('page', page);
    url.searchParams.append('per_page', IMAGES_PER_PAGE);

    const { data } = await axios.get(url.toString());
    await delay(1000);
    return [data.results, data.total_pages, data.total];
  } catch (error) {
    return [[], 0, 0];
  }
};
