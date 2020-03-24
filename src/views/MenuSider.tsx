import React from 'react';
import { Menu } from 'antd';
import {
  UsergroupAddOutlined,
  CreditCardOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { getMyInfo } from '../services/user.services';

const { SubMenu } = Menu;

interface IState {
  username: string;
  role: string;
}
class MenuSider extends React.Component<{} & RouteComponentProps, {}> {
  state = {
    username: '',
    role: ''
  };
  requestLogout = () => {
    const { history } = this.props;
    logout().then(() => history.push('/login'));
  };

  componentDidMount() {
    getMyInfo().then(({ data }) => {
      this.setState({
        username: data.username,
        role: data.role
      });
    });
  }

  render() {
    const { username, role } = this.state;
    return (
      <Menu
        // onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['3']}
        defaultOpenKeys={['sub2']}
        mode='inline'
      >
        <Menu.Item onClick={this.requestLogout}>
          <span>
            <LogoutOutlined />
            <span>Logout, {username}</span>
          </span>
        </Menu.Item>
        {['ADMIN', 'SUPPORTER'].includes(role) && (
          <SubMenu
            key='sub1'
            title={
              <span>
                <UsergroupAddOutlined />
                <span>Users</span>
              </span>
            }
          >
            <Menu.Item key='1'>
              <Link to='/app/user-list'>List all</Link>
            </Menu.Item>
            <Menu.Item key='2'>
              <Link to='/app/add-user'>Add</Link>
            </Menu.Item>
          </SubMenu>
        )}

        <SubMenu
          key='sub2'
          title={
            <span>
              <CreditCardOutlined />
              <span>Tickets</span>
            </span>
          }
        >
          <Menu.Item key='3'>
            <Link to='/app/ticket-list'>Ticket List</Link>
          </Menu.Item>
          <Menu.Item key='4'>
            <Link to='/app/add-ticket'>Add Ticket</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default withRouter(MenuSider);
