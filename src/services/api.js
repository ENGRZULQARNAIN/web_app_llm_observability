const API_BASE_URL =
<<<<<<< HEAD
  'http://fypobservabillity-env.eba-una3djfn.us-east-1.elasticbeanstalk.com';

export const api = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/login/`, {
=======
 'http://obamai.us-east-1.elasticbeanstalk.com';
 
export const api = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/login/`, {
>>>>>>> origin/master
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
<<<<<<< HEAD
    const response = await fetch(`${API_BASE_URL}/register/`, {
=======
    const response = await fetch(`${API_BASE_URL}/api/v1/register`, {
>>>>>>> origin/master
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
