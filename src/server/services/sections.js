import axios from "axios";

const baseURL = process.env.REACT_APP_baseURL;

const getAll = () => {
  const request = axios.get(`${baseURL}/sections`);
  return request.then(response => response.data);
};

const getAllSection = () => {
  const request = axios.get(`${baseURL}/sections`);
  return request.then(response =>
    response.data.map(section => {
      return {
        label: `[${section.subject}] ${section.description} (${section.section})`,
        value: section.classCode,
      };
    })
  );
};

const getSections = () => {
  const request = axios.get(`${baseURL}/sections`);
  return request.then(response =>
    response.data.map(section => {
      return {
        label: `${section.subject} (${section.section})`,
        value: section.classCode,
      };
    })
  );
};

const create = newSection => {
  const request = axios.post(`${baseURL}/sections`, newSection);
  return request.then(response => response.data);
};

export default { create, getAll, getAllSection, getSections };
