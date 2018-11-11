const key = '_token';

export function saveToken(token) {
  const json = JSON.stringify({ token });
  return localStorage.setItem(key, json);
}

export function getToken() {
  const json = localStorage.getItem(key);

  if (json) {
    return JSON.parse(json);
  }
  return null;
}

export function removeToken() {
  return localStorage.removeItem(key);
}

export function isAuthenticated() {
  return getToken() !== null;
}
