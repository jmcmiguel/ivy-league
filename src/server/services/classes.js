import axios from "axios";

const getAll = async () => {
  const request = axios.get(`/api/class`);
  const response = await request;
  return response.data;
};

const getAllClass = async () => {
  const request = axios.get(`/api/class`);
  const response = await request;
  return response.data.map(section => {
    return {
      label: `[${section.courseCode}] ${section.courseDesc} (${section.section})`,
      value: section.classCode,
    };
  });
};

const getClasses = async () => {
  const request = axios.get(`/api/class`);
  const response = await request;
  return response.data.map(section => {
    return {
      label: `${section.courseCode} (${section.section})`,
      value: section.classCode,
    };
  });
};

const create = async newSection => {
  const request = axios.post(`/api/class`, newSection);
  const response = await request;
  return response.data;
};

export default {
  create,
  getAll,
  getAllClass,
  getClasses,
};
