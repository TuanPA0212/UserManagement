import axios from './axios';

const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};

const addNewUser = (name, job) => {
  return axios.post('/api/users', { name, job });
};

const editUser = (name, job, id) => {
  return axios.put(`/api/users/${id}`, { name, job });
};

const deleteUser = (id) => {
  return axios.delete(`/api/users/${id}`);
};

const login = (email, password) => {
  return axios.post(`/api/login`, { email, password });
};

export { fetchAllUser, addNewUser, editUser, deleteUser, login };
