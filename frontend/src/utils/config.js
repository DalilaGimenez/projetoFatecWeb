export const api = "https://localhost:5000";
export const uploads = "https://localhost:5000/uploads";

export const requestConfig = (method, data = null, token = null, image = null) => {
  let config = {
    method,
    headers: {}
  };

  if (image) {
    config.body = data;
  } else if (method !== "DELETE" && data !== null && data !== undefined) {
    config.body = JSON.stringify(data);
    config.headers["Content-Type"] = "application/json";
  }
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
