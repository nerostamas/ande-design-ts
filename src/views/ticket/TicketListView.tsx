import React from 'react';
import { Table } from 'antd';
import { getAllTicket } from '../../services/ticket.service';
import { getByIds } from '../../services/user.services';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content'
  },
  {
    title: 'Created by',
    dataIndex: 'createdBy',
    key: 'createdBy'
  },
  {
    title: 'Create time',
    dataIndex: 'createTime',
    key: 'createTime',
    render: item =>
      `${new Date(item).toLocaleDateString()} - ${new Date(
        item
      ).toLocaleTimeString()}`
  },
  {
    title: '',
    key: 'action',
    render: item => <Link to={`/app/ticket/${item._id['$oid']}`}>View</Link>
  }
];

interface IState {
  ticketList: {
    _id: Object;
    title: string;
    content: String;
    createdBy: string;
    createTime: number;
  }[];
  userList: {
    _id: Object;
    username: string;
  }[];
}

class TicketListView extends React.Component<{}, IState> {
  state = {
    ticketList: [],
    userList: []
  };
  async componentDidMount() {
    const ticketList = await getAllTicket().then(({ data }) => data);
    const userIds = ticketList.map(item => item.createdBy);
    const userList = await getByIds(userIds).then(({ data }) => data);
    const updateTicket = ticketList.map(item => ({
      ...item,
      createdBy: userList.find(user => user?._id['$oid'] === item.createdBy)
        ?.username
    }));
    this.setState({ ticketList: updateTicket, userList });
  }
  render() {
    const { ticketList } = this.state;
    return (
      <div style={{ width: '100%', padding: 10 }}>
        <Table dataSource={ticketList} columns={columns} />
      </div>
    );
  }
}

export default TicketListView;
