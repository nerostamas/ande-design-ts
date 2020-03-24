import axios from 'axios';

export type ROLE = 'ADMIN' | 'SUPPORTER' | 'USER';

const createUser = ({
  username,
  password,
  role
}: {
  username: string;
  password: string;
  role: ROLE;
}) => {
  return axios.post(`/api/users/create`, { username, password, role });
};

const getAllUser = () => {
  return axios.get(`/api/users/all`);
};

const getByIds = (ids: string[]) => {
  return axios.post(`/api/users/getByIds`, { ids });
};

const getMyInfo = () => {
  return axios.get(`/api/users/my`);
};

export { createUser, getAllUser, getByIds, getMyInfo };
