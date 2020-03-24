import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { getTicketById } from '../../services/ticket.service';
import { Row, Col, Form, Button, Input, message, Pagination } from 'antd';
import {
  comment,
  getCommentByTicket,
  deleteMyComment
} from '../../services/comment.services';
import { getAllUser } from '../../services/user.services';

interface IComment {
  data: {
    _id: Object;
    userId: string;
    ticketId: string;
    content: string;
    createTime: number;
  }[];
  pages: number;
  page: number;
  total: number;
}
interface IState {
  ticket: {
    _id: Object;
    title: string;
    content: string;
    createdBy: string;
    createTime: number;
  };
  comments: IComment;
  userList: {
    _id: Object;
    username: string;
  }[];
}

class TicketDetailView extends React.Component<RouteComponentProps, {}> {
  state = {
    ticket: undefined,
    comments: {} as IComment,
    userList: []
  };

  async componentDidMount() {
    const id = this.getTicketId();
    if (id) {
      const ticket = await getTicketById(id).then(({ data }) => data);
      const comments = await getCommentByTicket(id).then(({ data }) => data);
      const userList = await getAllUser().then(({ data }) => data);
      const userListMap = [];
      userList.map(item => (userListMap[item._id['$oid']] = { ...item }));
      this.setState({
        ticket,
        comments,
        userList: userListMap
      });
    }
  }

  getTicketId = (): string => {
    const {
      match: { params }
    } = this.props;
    const { id } = params as { id: string };
    return id;
  };

  onFinish = values => {
    const id = this.getTicketId();
    comment(id, { ...values }).then(({ data }) => {
      message.success('Comment posted');
      // const { comments } = this.state;
      // const updated = [...comments, data];
      // this.setState({ comments: updated });
    });
  };

  onDelete = (commentId: string) => {
    deleteMyComment(commentId).then(() => message.success('delete success'));
  };

  onChangePage = (page, pageSize) => {
    const id = this.getTicketId();

    getCommentByTicket(id, page, pageSize).then(({ data }) =>
      this.setState({ comments: data })
    );
  };

  renderComment = () => {
    const { comments, userList } = this.state;
    console.log(userList);
    if (!comments || comments.data.length === 0) {
      return <span>No comments</span>;
    }
    return (
      <div>
        {comments.data.map(item => (
          <div key={item._id['$oid']}>
            <span style={{ marginRight: 10 }}>
              <b>{userList[item.userId]?.username}</b>({' '}
              <span>{new Date(item.createTime).toLocaleDateString()}</span>):
            </span>
            <span>{item.content}</span>
            <span
              style={{ marginLeft: 15, cursor: 'pointer' }}
              onClick={() => this.onDelete(item._id['$oid'])}
            >
              Delete
            </span>
          </div>
        ))}
        <Pagination
          defaultCurrent={1}
          total={comments.total}
          onChange={this.onChangePage}
        />
      </div>
    );
  };

  render() {
    const { ticket } = this.state;
    if (!ticket) {
      return null;
    }
    console.log(ticket);
    return (
      <div style={{ width: '100%', padding: 10 }}>
        <Row>
          <Col span={24}>
            <h1>Title: {ticket.title}</h1>
          </Col>
          <Col span={24}>
            <h1>
              Created By: {new Date(ticket.createTime).toLocaleDateString()} -
              {new Date(ticket.createTime).toLocaleTimeString()}
            </h1>
          </Col>
          <Col span={24}>
            <h1>Time: {ticket.createTime}</h1>
          </Col>
          <Col span={24}>
            <h1>Content: {ticket.content}</h1>
          </Col>
          <Col span={24}>{this.renderComment()}</Col>
          <Col span={24}>
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout='horizontal'
              style={{ maxWidth: 600 }}
              size='middle'
              onFinish={this.onFinish}
            >
              <Form.Item
                label='Comment'
                name='content'
                rules={[{ required: true, message: 'Please input comment!' }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 4 }}>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(TicketDetailView);
