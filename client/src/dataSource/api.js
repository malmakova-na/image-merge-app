const BASE_URL = 'http://localhost:8080';

export const getPong = () => {
  fetch(`${BASE_URL}/ping`).then((response) => response.json())
};

