import axios from 'axios';

const BASE = 'api/v1/shops';

export async function getAll() {
  try {
    const res = await axios.get(BASE);
    return res.data;
  } catch (err) {
    if (err.response.data) {
      return { message: err.response.data.message };
    }

    return { message: 'The server has encountered an error.' };
  }
}

export async function getFavorites() {
  try {
    const res = await axios.get(`${BASE}/favorites`);
    return res.data;
  } catch (err) {
    if (err.response.data) {
      return { message: err.response.data.message };
    }

    return { message: 'The server has encountered an error.' };
  }
}

export async function likeDislike(shopId, likeStatus) {
  const data = {
    shopId,
    likeStatus,
  };

  try {
    const res = await axios.post(`${BASE}/like_dislike`, data);
    return res.data;
  } catch (err) {
    if (err.response.data) {
      return { message: err.response.data.message };
    }

    return { message: 'The server has encountered an error.' };
  }
}

export async function removeFavorite(shopId) {
  const data = {
    shopId,
  };

  try {
    const res = await axios.post(`${BASE}/remove_favorite`, data);
    return res.data;
  } catch (err) {
    if (err.response.data) {
      return { message: err.response.data.message };
    }

    return { message: 'The server has encountered an error.' };
  }
}

