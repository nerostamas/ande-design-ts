import React from 'react';
import { Form, Input, Button, Checkbox, Layout, message } from 'antd';
import { LockTwoTone } from '@ant-design/icons';
import { login } from '../services/auth.service';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const { Content, Header } = Layout;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

interface IProps {}

interface IState {}

class LoginView extends React.Component<IProps & RouteComponentProps, IState> {
  onFinish = (values: any) => {
    const { username, password } = values;
    return login(username, password).then(() => {
      message.success('Login success');
      const { history } = this.props;
      history.push('/app');
    });
    // .catch(err => console.log('login', err));
  };

  onFinishFailed = (errorInfo: any) => {
    message.error('Invalid username or password');
  };

  render() {
    return (
      <Layout
        style={{
          width: '100',
          height: '100%'
        }}
      >
        <Header>
          <h1
            style={{
              color: '#ffffff',
              display: 'flex',
              justifyContent: 'space-around'
            }}
          >
            Login to system
          </h1>
        </Header>
        <Content
          style={{
            width: '45%',
            minWidth: 350,
            position: 'absolute',
            top: '20%',
            left: '20%'
          }}
        >
          <LockTwoTone style={{ fontSize: 50, margin: '20px 60%' }} />
          <Form
            {...layout}
            name='basic'
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label='Username'
              name='username'
              rules={[
                { required: true, message: 'Please input your username!' }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[
                { required: true, message: 'Please input your password!' }
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    );
  }
}

export default withRouter(LoginView);
