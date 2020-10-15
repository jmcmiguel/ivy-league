import axios from "axios";

const baseURL = process.env.REACT_APP_baseURL;

const create = newSection => {
  const request = axios.post(`${baseURL}/sections`, newSection);
  return request.then(response => response.data);
};

export default { create };
