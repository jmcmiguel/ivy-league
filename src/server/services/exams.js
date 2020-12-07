import axios from "axios";

const baseURL = "http://localhost:8080";

const create = async newExam => {
  const request = axios.post(`${baseURL}/api/exam`, newExam);
  const response = await request;
  return response.data;
};

const getAll = async () => {
  const request = axios.get(`${baseURL}/api/exam`);
  const response = await request;
  return response.data;
};

export default {
  create,
  getAll,
};
