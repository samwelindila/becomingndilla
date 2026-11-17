// Keeps the admin login token in the browser and builds the auth header.
const KEY = "ndilla_admin_token";

export const getToken = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

export const setToken = (token) => {
  try {
    localStorage.setItem(KEY, token);
  } catch {
    /* storage unavailable */
  }
};

export const clearToken = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable */
  }
};

// Pass as the last argument of api.post / api.put / api.delete / api.get
export const authConfig = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});