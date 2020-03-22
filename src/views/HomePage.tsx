import React from 'react';
import { Row, Layout } from 'antd';
import MenuSider from './MenuSider';
import {
  Switch,
  Route,
  Redirect,
  RouteComponentProps,
  withRouter
} from 'react-router-dom';
import AddUserView from './user/AddUserView';
import UserListView from './user/UserListView';
import AddTicketView from './ticket/AddTicketView';
import TicketListView from './ticket/TicketListView';
import TicketDetailView from './ticket/TicketDetailView';

const { Header, Content, Footer, Sider } = Layout;

class HomePage extends React.Component<RouteComponentProps, {}> {
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Header style={{ backgroundColor: '#00695c' }}>
          <h1
            style={{
              color: '#ffffff',
              display: 'flex',
              justifyContent: 'space-around'
            }}
          >
            DEMO
          </h1>
        </Header>
        <Layout>
          <Sider width={256} style={{ backgroundColor: '#ffff' }}>
            <MenuSider />
          </Sider>
          <Content>
            <Row>
              <Switch>
                <Route path='/app/add-user'>
                  <AddUserView />
                </Route>
                <Route path='/app/user-list'>
                  <UserListView />
                </Route>
                <Route path='/app/add-ticket'>
                  <AddTicketView />
                </Route>
                <Route path='/app/ticket-list'>
                  <TicketListView />
                </Route>
                <Route path='/app/ticket/:id'>
                  <TicketDetailView />
                </Route>
                <Redirect to='/app/user-list' />
              </Switch>
            </Row>
          </Content>
        </Layout>
        <Footer style={{ backgroundColor: '#00695c', color: '#ffffff' }}>
          <h3 style={{ color: '#ffffff' }}>Demo - nguyenphuc9119@gmail.com</h3>
        </Footer>
      </Layout>
    );
  }
}

export default withRouter(HomePage);
