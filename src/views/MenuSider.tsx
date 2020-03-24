import React from 'react';
import { Menu } from 'antd';
import {
  UsergroupAddOutlined,
  CreditCardOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { logout } from '../services/auth.service';

const { SubMenu } = Menu;

class MenuSider extends React.Component<RouteComponentProps, {}> {
  requestLogout = () => {
    const { history } = this.props;
    logout().then(() => history.push('/login'));
  };

  render() {
    return (
      <Menu
        // onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode='inline'
      >
        <Menu.Item onClick={this.requestLogout}>
          <span>
            <LogoutOutlined />
            <span>Logout, </span>
          </span>
        </Menu.Item>
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
