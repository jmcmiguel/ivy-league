import axios from "axios";

const signup = async newUser => {
  const request = axios.post(`/api/signup`, newUser);
  const response = await request;
  return response.data;
};

const signin = async user => {
  const request = axios.post(`/api/signin`, user);
  const response = await request;
  return response.data;
};

export default { signup, signin };
