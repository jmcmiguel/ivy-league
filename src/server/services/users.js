import axios from "axios";

const baseURL = "http://localhost:8080";

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

const getUser = async email => {
  const request = axios.get(`${baseURL}/api/user`);
  const response = await request;
  const data = response.data.filter(user => user.email === email);
  return {
    firstName: data[0].firstName,
    middleName: data[0].middleName,
    lastName: data[0].lastName,
    idNumber: data[0].idNumber,
    contactNumber: data[0].contactNumber,
    email: data[0].email,
    isTeacher: data[0].isTeacher,
  };
};

const getAll = async () => {
  const request = axios.get(`${baseURL}/api/user`);
  const response = await request;
  return response.data;
};

export default { signup, signin, getUser, getAll };
