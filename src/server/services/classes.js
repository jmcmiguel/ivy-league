import axios from "axios";

const baseURL = "";

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

export default {
  create,
  getAll,
  getAllClass,
  getClasses,
  getClass,
  getProfClass,
  getProfClasses,
  getAllProfClasses,
};
