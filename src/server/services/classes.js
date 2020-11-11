import axios from "axios";

const getAll = () => {
  const request = axios.get(`/api/class`);
  return request.then(response => response.data);
};

const getAllClass = () => {
  const request = axios.get(`/api/class`);
  return request.then(response =>
    response.data.map(section => {
      return {
        label: `[${section.courseCode}] ${section.courseDesc} (${section.section})`,
        value: section.classCode,
      };
    })
  );
};

const getClasses = () => {
  const request = axios.get(`/api/class`);
  return request.then(response =>
    response.data.map(section => {
      return {
        label: `${section.courseCode} (${section.section})`,
        value: section.classCode,
      };
    })
  );
};

const create = newSection => {
  const request = axios.post(`/api/class`, newSection);
  return request.then(response => response.data);
};

export default {
  create,
  getAll,
  getAllClass,
  getClasses,
};
