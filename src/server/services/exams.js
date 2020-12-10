import axios from "axios";

const baseURL = "";

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

const getProfExams = async email => {
  const request = axios.get(`${baseURL}/api/exam`);
  const response = await request;
  return response.data.filter(exam => exam.prof === email);
};

export default {
  create,
  getAll,
  getProfExams,
};
