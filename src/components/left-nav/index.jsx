import React, { Component } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import "./left-nav.css";
import logo from "../../assets/image/logo.png";
import { Menu } from "antd";
import { menuList } from "../../config/menuList";

const { SubMenu } = Menu;

class LeftNav extends Component {
  state = {
    openKeys: [],
    rootSubmenuKeys: ["/commodty", "/charts"],
  };
  // 菜单栏点击事件
  onOpenChange = (keys) => {
    const latestOpenKey = keys.find(
      (key) => this.state.openKeys.indexOf(key) === -1
    );
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({
        openKeys: [],
      });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };
  UNSAFE_componentWillMount() {
    const { pathname } = this.props.location;
    if (
      pathname === "/category" ||
      pathname === "/product" ||
      pathname.indexOf("/commodty") === 0
    ) {
      this.setState({
        openKeys: ["/commodty"],
      });
    } else if (
      pathname === "/charts/pie" ||
      pathname === "/charts/line" ||
      pathname === "/charts/bar"
    ) {
      this.setState({
        openKeys: ["/charts"],
      });
    }
  }
  render() {
    console.log();
    return (
      <div className="left-nav">
        <NavLink className="nav-log" to="/home">
          <img src={logo} alt="logo" /> XX后台
        </NavLink>
        <div style={{ width: "100%" }}>
          <Menu
            theme="dark"
            mode="inline"
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
            defaultSelectedKeys={this.props.location.pathname}
          >
            {menuList.map((item) => {
              if (item.children) {
                return (
                  <SubMenu
                    key={item.key}
                    icon={<item.icon />}
                    title={item.title}
                  >
                    {item.children.map((item) => {
                      return (
                        <Menu.Item key={item.key} icon={<item.icon />}>
                          <Link to={item.path}>{item.title}</Link>
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                );
              } else {
                return (
                  <Menu.Item key={item.key} icon={<item.icon />}>
                    <Link to={item.path}>{item.title}</Link>
                  </Menu.Item>
                );
              }
            })}
          </Menu>
        </div>
      </div>
    );
  }
}

// * 包装 非路由组件 成为路由组件
export default withRouter(LeftNav);
