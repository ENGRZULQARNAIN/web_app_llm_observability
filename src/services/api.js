const API_BASE_URL =
  'http://fypobservabillity-env.eba-una3djfn.us-east-1.elasticbeanstalk.com';

export const api = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },
};
