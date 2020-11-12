import axios from "axios";

const signup = async newUser => {
  const request = axios.post(`/api/signup`, newUser);
  const response = await request;
  return response.data;
};

export default { signup };
