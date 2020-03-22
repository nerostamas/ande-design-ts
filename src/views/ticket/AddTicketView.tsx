import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { createTicket } from '../../services/ticket.service';

class AddTicketView extends React.Component {
  onFinish = values => {
    createTicket({ ...values }).then(() =>
      message.success('create ticket success !')
    );
  };
  render() {
    return (
      <div style={{ width: '100%', padding: 10 }}>
        <h1>Add Ticket</h1>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout='horizontal'
          style={{ maxWidth: 600 }}
          size='middle'
          onFinish={this.onFinish}
        >
          <Form.Item
            label='Title'
            name='title'
            rules={[{ required: true, message: 'Please input title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Content'
            name='content'
            rules={[{ required: true, message: 'Please input content!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AddTicketView;
