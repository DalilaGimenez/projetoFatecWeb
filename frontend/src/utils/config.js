export const api = "https://api.render.com/deploy/srv-cp2f8io21fec73cqbet0?key=eVHETFK_ARE/api";
export const uploads = "https://api.render.com/deploy/srv-cp2f8io21fec73cqbet0?key=eVHETFK_ARE/uploads";

export const requestConfig = (method, data, token = null, image = null) => {
  let config;

  if (image) {
    config = {
      method,
      body: data,
      headers: {},
    };
  } else if (method === "DELETE" || data === null) {
    config = {
      method,
      headers: {},
    };
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
