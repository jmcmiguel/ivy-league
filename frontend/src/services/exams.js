import axios from "axios";
import isAfter from "date-fns/isAfter";
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
      isAfter(parseISO(exam.deadline), new Date()) &&
      !exam.submittedExam.some(
        submission =>
          submission["submittedBy"] === localStorage.getItem("email")
      )
  );
};

const getAllClasses = async () => {
  const request = axios.get(`${baseURL}/api/class`);
  const response = await request;
  return response.data;
};

const getStudentClass = async email => {
  const classes = await getAllClasses();
  return classes.filter(clas => clas.studentEnrolled.includes(email));
};

const getStudentExams = async () => {
  const studentClasses = await getStudentClass(localStorage.getItem("email"));
  const classCodes = studentClasses.map(classes => classes.classCode);

  const allExams = await getAll();

  return allExams.filter(
    exam =>
      classCodes.includes(exam.classCode) &&
      isAfter(parseISO(exam.deadline), new Date())
  );
};

const addExamSubmission = async (examUUID, examSubmission) => {
  const request = axios.put(`${baseURL}/api/exam`, {
    uuid: examUUID,
    examSubmission: examSubmission,
  });

  const response = await request;

  return response.data;
};

const getNotSubmittedExams = async () => {
  const studentClasses = await getStudentClass(localStorage.getItem("email"));
  const classCodes = studentClasses.map(classes => classes.classCode);

  const allExams = await getAll();

  return allExams.filter(
    exam =>
      classCodes.includes(exam.classCode) &&
      isAfter(parseISO(exam.deadline), new Date()) &&
      !exam.submittedExam.some(
        submission =>
          submission["submittedBy"] === localStorage.getItem("email")
      )
  );
};

const getSubmittedExams = async () => {
  const studentClasses = await getStudentClass(localStorage.getItem("email"));
  const classCodes = studentClasses.map(classes => classes.classCode);

  const allExams = await getAll();

  return allExams.filter(
    exam =>
      classCodes.includes(exam.classCode) &&
      exam.submittedExam.some(
        submission =>
          submission["submittedBy"] === localStorage.getItem("email")
      )
  );
};

const deleteExam = async examUUID => {
  const request = axios.delete(`${baseURL}/api/examm`, {
    params: { uuid: examUUID },
  });
  const response = await request;

  return response.status;
};

export default {
  create,
  getAll,
  getProfExams,
  getUpcomingExams,
  getStudentExams,
  addExamSubmission,
  getNotSubmittedExams,
  getSubmittedExams,
  deleteExam,
};
