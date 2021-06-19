import axios from 'axios';
import config from '../../config/default.json';

// USERS API BASE URL
const usersApiBaseURL = config.USERS_API_BASE_PATH;

export const getUsers = () => {
  return axios.get(`${usersApiBaseURL}`);
};

export const addUser = (body) => {
  return axios.post(`${usersApiBaseURL}`, body);
};
