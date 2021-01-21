const url = "http://localhost:4000";

const get = (resource) => {
  const token = localStorage.getItem("token");

  return fetch(`${url}/${resource}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        return Promise.reject(data);
      }

      return data;
    });
};

const post = (resource, body) => {
  const token = localStorage.getItem("token");

  return fetch(`${url}/${resource}`, {
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        return Promise.reject(data);
      }

      return data;
    });
};

const put = (resource, body) => {
  const token = localStorage.getItem("token");

  return fetch(`${url}/${resource}`, {
    body: JSON.stringify(body),
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        return Promise.reject(data);
      }

      return data;
    });
};

const remove = (resource) => {
  const token = localStorage.getItem("token");

  return fetch(`${url}/${resource}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        return Promise.reject(data);
      }

      return data;
    });
};

export default {
  get,
  post,
  put,
  delete: remove,
};
