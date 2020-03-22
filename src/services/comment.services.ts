import Axios from 'axios';

const comment = (ticketId: string, { content }: { content: string }) => {
  return Axios.post(`/api/comment/${ticketId}`, { content });
};

const getCommentByTicket = (ticketId: string) => {
  return Axios.get(`/api/comment/${ticketId}`);
};

export { comment, getCommentByTicket };
