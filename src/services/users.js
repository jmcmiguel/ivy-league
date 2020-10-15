import axios from "axios";

const baseURL = process.env.REACT_APP_baseURL;

const signup = newUser => {
  const request = axios.post(`${baseURL}`, newUser);
  return request.then(response => response.data);
};

export default { signup };
