import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { getTicketById } from '../../services/ticket.service';
import { Row, Col, Form, Button, Input, message } from 'antd';
import { comment, getCommentByTicket } from '../../services/comment.services';

interface IState {
  ticket: {
    _id: Object;
    title: string;
    content: string;
    createdBy: string;
    createTime: number;
  };
  comments: {
    _id: Object;
    userId: String;
    ticketId: String;
    content: String;
    createTime: String;
  }[];
}

class TicketDetailView extends React.Component<RouteComponentProps, {}> {
  state = {
    ticket: undefined,
    comments: []
  };

  async componentDidMount() {
    const id = this.getTicketId();
    if (id) {
      const ticket = await getTicketById(id).then(({ data }) => data);
      const comments = await getCommentByTicket(id).then(({ data }) => data);
      this.setState({
        ticket,
        comments
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
    comment(id, { ...values }).then(({ data }) =>
      message.success('Comment posted')
    );
  };

  renderComment = () => {
    const { comments } = this.state;
    if (!comments || comments.length === 0) {
      return <span>No comments</span>;
    }
    return (
      <div>
        {comments.map(item => (
          <div key={item._id['$oid']}>
            <span>{item.userId}</span>
            <span>{item.content}</span>
            <span>{new Date(item.createTime).toLocaleDateString()}</span>
          </div>
        ))}
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
