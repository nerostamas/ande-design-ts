import Axios from 'axios';

const comment = (ticketId: string, { content }: { content: string }) => {
  return Axios.post(`/api/comment/${ticketId}`, { content });
};

const getCommentByTicket = (ticketId: string, page = 1, pageSize = 10) => {
  return Axios.post(`/api/comment/view/${ticketId}`, { page, pageSize });
};

const deleteMyComment = (commentId: string) => {
  return Axios.delete(`/api/comment/${commentId}`);
};

export { comment, getCommentByTicket, deleteMyComment };
