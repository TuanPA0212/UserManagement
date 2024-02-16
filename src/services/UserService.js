import axios from './axios';

const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};

const addNewUser = (name, job) => {
  return axios.post('/api/users', { name, job });
};

export { fetchAllUser, addNewUser };
