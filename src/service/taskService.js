import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/tasks";

export const getTasks = async () => axios.get(API_BASE_URL);
export const createTask = async (task) => axios.post(API_BASE_URL, task);
export const completeTask = (id) => axios.put(`${API_BASE_URL}/complete/${id}`);
export const updateTask = (id, task) =>
  axios.put(`${API_BASE_URL}/${id}`, task);
export const deleteTask = (id) => axios.delete(`${API_BASE_URL}/${id}`);
