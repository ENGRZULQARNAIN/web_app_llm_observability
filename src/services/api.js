const API_BASE_URL =
 'http://obamai.us-east-1.elasticbeanstalk.com';
 
export const api = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/login/`, {
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
    const response = await fetch(`${API_BASE_URL}/api/v1/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  getDashboardData: async (projectId) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/get-dashboard-data/${projectId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });
    return response.json();
  },
};
