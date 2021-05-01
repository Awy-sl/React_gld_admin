import React, { lazy, Component } from "react";
import { Redirect } from "react-router-dom";
import { Layout } from "antd";
import "./home.css";

import { configPath } from "../../routes/configPath";
import RouterViews from "../../routes/routerViews";
import storageUtils from "../../utils/storageUtils";

const { Header, Footer, Sider, Content } = Layout;
const LeftNav = lazy(() => import("../../components/left-nav"));
const Heade = lazy(() => import("../../components/header"));

export default class Index extends Component {
  render() {
    const user = storageUtils.getUser();
    if (!user._id) return <Redirect to="/login" />;
    return (
      <Layout className="home">
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header style={{ height: "84px", backgroundColor: "white" }}>
            <Heade
              path={this.props.location.pathname}
              name={user.username || ""}
            ></Heade>
          </Header>
          <Content style={{ margin: "20px", backgroundColor: "white" }}>
            <RouterViews routes={configPath} />
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}
