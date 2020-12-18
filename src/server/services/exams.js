import axios from "axios";
import isAfter from "date-fns/isAfter";
import DateAdd from "date-fns/add";
import { parseISO } from "date-fns";
import classServices from "./classes";

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

const getStudentExams = async () => {
  let studentClasses = [];
  let exams = [];
  // Get student classes
  await classServices
    .getStudentClass(localStorage.getItem("email"))
    .then(newStudentClasses => {
      studentClasses = newStudentClasses.map(classes => {
        return classes.classCode;
      });
      // Get student exams
      studentClasses.forEach(classes => {
        getUpcomingExams(classes).then(exam => {
          if (exam.length) exams.push(exam);
        });
      });
    })
    .catch(err => {
      console.log(err.message);
    });

  return exams;
};

export default {
  create,
  getAll,
  getProfExams,
  getUpcomingExams,
  getStudentExams,
};
