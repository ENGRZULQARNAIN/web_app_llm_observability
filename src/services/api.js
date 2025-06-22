const API_BASE_URL =
 'http://obamai.us-east-1.elasticbeanstalk.com';
const QA_API_BASE_URL = 'http://127.0.0.1:8000';
 
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

  getTestSamples: async (projectId, page = 1, pageSize = 5) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/qa_data/${projectId}?page=${page}&page_size=${pageSize}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });
    return response.json();
  },
};
