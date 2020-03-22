import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { createUser } from '../../services/user.services';

class AddUserView extends React.Component {
  onFinish = values => {
    return createUser({ ...values }).then(() =>
      message.success('Create user success')
    );
  };

  render() {
    return (
      <div style={{ padding: 10, width: '100%' }}>
        <h1>Add user</h1>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout='horizontal'
          style={{ maxWidth: 600 }}
          size='middle'
          onFinish={this.onFinish}
        >
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label='Role'
            name='role'
            rules={[{ required: true, message: 'Please choose a role!' }]}
          >
            <Select>
              <Select.Option value='ADMIN'>Admin</Select.Option>
              <Select.Option value='SUPPORTER'>Supporter</Select.Option>
              <Select.Option value='USER'>User</Select.Option>
            </Select>
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

export default AddUserView;
