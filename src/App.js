import './App.css';
import 'antd/dist/antd.css';
import BaseRouter from './routes';
import { getUserInfoFromToken } from './util/ApiCalls.js';
import Navbar from './components/Navbar';

import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Layout, Menu, notification } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends Component {

  state = {
    collapsed: false,
    isAuthenticated: false,
    user: null
  };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.loadUser();
    };
  }

  loadUser = () => {
    var promise = getUserInfoFromToken();
    promise
      .then(response => {
        this.setState({
          user: response.data,
          isAuthenticated: true
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({
      user: null,
      isAuthenticated: false
    });
    notification.success({
      description: 'Successfully logged out.'
    });
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <div>
        <Router>
          <Layout style={{ height: '100vw' }}>
            <Header className="header">
              <div className="logo" />
              <Navbar isAuthenticated={this.state.isAuthenticated} handleLogout={this.handleLogout} />
            </Header>
            <Layout>
              <Sider width={200} className="site-layout-background">
                <Menu
                  theme="dark" 
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
                >
                  <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                    <Menu.Item key="1">option1</Menu.Item>
                    <Menu.Item key="2">option2</Menu.Item>
                    <Menu.Item key="3">option3</Menu.Item>
                    <Menu.Item key="4">option4</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                    <Menu.Item key="5">option5</Menu.Item>
                    <Menu.Item key="6">option6</Menu.Item>
                    <Menu.Item key="7">option7</Menu.Item>
                    <Menu.Item key="8">option8</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                    <Menu.Item key="9">option9</Menu.Item>
                    <Menu.Item key="10">option10</Menu.Item>
                    <Menu.Item key="11">option11</Menu.Item>
                    <Menu.Item key="12">option12</Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout style={{ padding: '24px 24px 24px' }}>
                <Content
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  <BaseRouter loadUser={this.loadUser} isAuthenticated={this.state.isAuthenticated} user={this.state.user} />
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </Router>
      </div>
    );
  }
}

export default App;
