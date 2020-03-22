import Axios from 'axios';

const createTicket = ({
  title,
  content
}: {
  title: string;
  content: string;
}) => {
  return Axios.post(`/api/ticket/create`, { title, content });
};

const getAllTicket = () => {
  return Axios.get(`/api/ticket/all`);
};

const getTicketById = (id: string) => {
  return Axios.get(`/api/ticket/byId/${id}`);
};

export { createTicket, getAllTicket, getTicketById };
