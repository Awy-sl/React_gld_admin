import React, { Component } from "react";

import "./login.css";
import log from "@/assets/image/logo.png";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { message } from "antd";

import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

import { resLogin } from "../../config/index.js";

export default class Login extends Component {
  // 密码自定义验证规则
  // validatePwd = (rule, val, callback) => {
  //   if (val.length > 4) return callback();
  //   callback("密码长度必须大于4位");
  // };

  // 验证通过事件
  onFinish = async (val) => {
    const result = await resLogin(val);

    if (result.status === 404) return message.error("404网络超时");

    if (result.data.status === 1) return message.error("密码错误请重新输入");
    const user = result.data.data;
    // 保存 user
    memoryUtils.user = user;
    // * 保存到 localStorage 中
    storageUtils.saveUser(user);

    message.success("登录成功");

    return this.props.history.replace("/home");
  };
  // 验证失败的回调
  // onFinishFailed = () => {
  //   console.log("校验失败");
  // };
  render() {
    return (
      <div className="login">
        <header className="login_header">
          <img src={log} alt="" />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login_content">
          <h1>用户登录</h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入用户名",
                },
                {
                  min: 4,
                  message: "用户名必须大于4位",
                },
                {
                  max: 10,
                  message: "用户名不能超过10位",
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: "用户名必须是英文，数字或下划线组成",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  min: 4,
                  message: "密码必须大于4位",
                },
                {
                  required: true,
                  message: "请输入密码",
                },
                {
                  max: 16,
                  message: "密码长度不能超过16位",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size="large"
                onClick={this.fromData}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
