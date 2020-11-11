import axios from "axios";

const signup = newUser => {
  const request = axios.post(`/api/signup`, newUser);
  return request.then(response => response.data);
};

export default { signup };
