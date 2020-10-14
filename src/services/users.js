import axios from "axios";

const baseURL = process.env.baseURL;

const signup = newRecord => {
  const request = axios.post(`${baseURL}/signup`, newRecord);
  return request.then(response => response.data);
};

export default { signup };
