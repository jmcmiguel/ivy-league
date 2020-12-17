import axios from "axios";

const baseURL = "http://localhost:8080";

const getAll = async () => {
  const request = axios.get(`${baseURL}/api/class`);
  const response = await request;
  return response.data;
};

const getAllClass = async () => {
  const request = axios.get(`${baseURL}/api/class`);
  const response = await request;
  return response.data.map(section => {
    return {
      label: `[${section.courseCode}] ${section.courseDesc} (${section.section})`,
      value: section.classCode,
    };
  });
};

const getClasses = async () => {
  const request = axios.get(`${baseURL}/api/class`);
  const response = await request;
  return response.data.map(section => {
    return {
      label: `${section.courseCode} (${section.section})`,
      value: section.classCode,
    };
  });
};

const getClass = async courseCode => {
  const request = axios.get(`${baseURL}/api/class`);
  const response = await request;
  for (const section of response.data) {
    if (section.classCode === courseCode) return section;
  }
};

const create = async newSection => {
  const request = axios.post(`${baseURL}/api/class`, newSection);
  const response = await request;
  return response.data;
};

const getProfClass = async email => {
  const request = axios.get(`${baseURL}/api/class`);
  const response = await request;
  return response.data.filter(section => section.prof === email);
};

const getProfClasses = async email => {
  const request = axios.get(`${baseURL}/api/class`);
  const response = await request;
  const sections = response.data.filter(section => section.prof === email);
  return sections.map(section => {
    return {
      label: `${section.courseCode} (${section.section})`,
      value: section.classCode,
    };
  });
};

const getAllProfClasses = async email => {
  const request = axios.get(`${baseURL}/api/class`);
  const response = await request;
  const sections = response.data.filter(section => section.prof === email);
  return sections.map(section => {
    return {
      label: `[${section.courseCode}] ${section.courseDesc} (${section.section})`,
      value: section.classCode,
    };
  });
};

const deleteClass = async classCode => {
  const request = axios.delete(`${baseURL}/api/class`, {
    params: { classCode: classCode },
  });
  const response = await request;
  return response.status;
};

const addStudent = async (classCode, email) => {
  const request = axios.put(`${baseURL}/api/class`, {
    classCode: classCode,
    email: email,
  });

  const response = await request;

  return response.data;
};

const getStudents = async classCode => {
  const classes = await getClass(classCode);
  return classes.studentEnrolled;
};

const getStudentClass = async email => {
  const classes = await getAll();

  return classes.filter(clas => clas.studentEnrolled.includes(email));
};

export default {
  create,
  getAll,
  getAllClass,
  getClasses,
  getClass,
  getProfClass,
  getProfClasses,
  getAllProfClasses,
  deleteClass,
  addStudent,
  getStudents,
  getStudentClass,
};
