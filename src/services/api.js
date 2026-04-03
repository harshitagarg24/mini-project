import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000"
});

// Get user by ID (0, 1, 2)
export const getUser = (id) => API.get(`/user/${id}`);

// Edit user (only allowed for same user)
export const editUser = (id) => API.get(`/user/${id}/edit`);

// Delete user (only admin allowed)
export const deleteUser = (id) => API.delete(`/user/${id}`);