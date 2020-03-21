import axios from 'axios';

const login = (username: string, password: string) => {
  return axios
    .post(`/api/auth/login`, {
      username,
      password
    })
    .then(data => console.log(data));
};

export { login };
