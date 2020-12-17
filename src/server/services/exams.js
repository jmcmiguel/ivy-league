import axios from "axios";
import isAfter from "date-fns/isAfter";
import DateAdd from "date-fns/add";
import { parseISO } from "date-fns";

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

const getProfExams = async email => {
  const request = axios.get(`${baseURL}/api/exam`);
  const response = await request;
  return response.data.filter(exam => exam.prof === email);
};

const getUpcomingExams = async classcode => {
  const request = axios.get(`${baseURL}/api/exam`);
  const response = await request;
  return response.data.filter(
    exam =>
      exam.classCode === classcode &&
      isAfter(parseISO(exam.sched), DateAdd(new Date(), { seconds: 1 }))
  );
};

export default {
  create,
  getAll,
  getProfExams,
  getUpcomingExams,
};
