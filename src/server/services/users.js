import axios from "axios";

const baseURL = "localhost:8080";

const signup = async newUser => {
  const request = axios.post(`${baseURL}/api/signup`, newUser);
  const response = await request;
  return response.data;
};

const signin = async user => {
  const request = axios.post(`${baseURL}/api/signin`, user);
  const response = await request;
  return response.data;
};

export default { signup, signin };
