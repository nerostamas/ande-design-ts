import React from 'react';
import { ROLE, getAllUser } from '../../services/user.services';
import { Table } from 'antd';

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role'
  }
];

interface IState {
  userList: { username: string; role: ROLE }[];
}

class UserListView extends React.Component<{}, IState> {
  state = {
    userList: []
  };
  componentDidMount() {
    getAllUser().then(({ data }) => this.setState({ userList: data }));
  }
  render() {
    const { userList } = this.state;
    return (
      <div style={{ width: '100%', padding: 10 }}>
        <Table dataSource={userList} columns={columns} />
      </div>
    );
  }
}

export default UserListView;
