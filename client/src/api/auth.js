import axios from 'axios';

const BASE = 'auth';

export async function authenticate(data) {
  try {
    const res = await axios.post(BASE, data);
    return res.data;
  } catch (err) {
    if (err.response.data) {
      return { message: err.response.data.message };
    }

    return { message: 'The server has encountered an error.' };
  }
}

export async function signup(data) {
  const url = `${BASE}/register`;

  try {
    const res = await axios.post(url, data);
    return res.response.data;
  } catch (err) {
    if (err.response.data) {
      return { errors: err.response.data.errors };
    }

    return { message: 'The server has encountered an error.' };
  }
}
