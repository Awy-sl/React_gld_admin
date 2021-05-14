import React, { Component } from "react";

import { Modal, Form, Input, Button, message, Select } from "antd";

import { addUser, updateUser } from "../../config";

let isadd = true;

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  inline: { span: 16 },
};
const CustomizedForm = ({ onChange, fields }) => (
  <Form
    {...layout}
    name="roleForm"
    fields={fields}
    onFieldsChange={(_, allFields) => {
      onChange(allFields);
    }}
  >
    <Form.Item
      name="username"
      label="用户名称"
      rules={[
        {
          required: true,
          message: "用户名称不能为空",
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
      <Input placeholder="请输入用户名称" />
    </Form.Item>
    {!isadd ? (
      <Form.Item
        name="password"
        label="用户密码"
        rules={[
          {
            required: true,
            message: "用户密码不能为空",
          },
          {
            min: 4,
            message: "密码必须大于4位",
          },
          {
            max: 16,
            message: "密码长度不能超过16位",
          },
        ]}
      >
        <Input type="password" placeholder="请输入用户密码" />
      </Form.Item>
    ) : (
      <></>
    )}
    <Form.Item
      name="phone"
      label="手机号"
      rules={[
        {
          required: true,
          message: "手机号不能为空",
        },
        {
          len: 11,
          message: "请输入正确的电话号码",
        },
      ]}
    >
      <Input placeholder="请输入手机号" />
    </Form.Item>
    <Form.Item
      name="email"
      label="邮箱"
      rules={[
        {
          required: true,
          message: "邮箱不能为空",
        },
        { type: "email", message: "请输入正确的邮箱" },
      ]}
    >
      <Input type="email" placeholder="请输入邮箱" />
    </Form.Item>
  </Form>
);

export default class addAmendUser extends Component {
  state = {
    isModalVisible: false,
    fieles: [],
    errorInf: false,
    select: false,
    selectValue: "",
    user: {
      _id: "",
      role_id: "",
    },
  };

  isUpdate = () => {
    isadd = true;
  };
  showModal = (data, roles) => {
    this.setState({
      user: data,
    });
    if (roles) {
      // console.log("设置角色");
      this.setState({
        select: roles,
      });
    } else if (isadd) {
      // console.log("修改");
      this.setState({
        fieles: [
          {
            name: ["username"],
            value: data.username,
          },
          {
            name: ["phone"],
            value: data.phone,
          },
          {
            name: ["email"],
            value: data.email,
          },
        ],
      });
      this.setState({
        isModalVisible: true,
      });
    } else {
      this.setState({
        fieles: [
          {
            name: ["username"],
            value: "",
          },
          {
            name: ["password"],
            value: "",
          },
          {
            name: ["phone"],
            value: "",
          },
          {
            name: ["email"],
            value: "",
          },
        ],
      });
    }
    this.setState({
      isModalVisible: true,
    });
  };
  componentDidMount() {
    this.resetFrom();
  }
  resetFrom = () => {
    this.setState({
      fieles: [],
      select: false,
    });
  };

  touched = (file) => {
    let i = null;
    file.forEach((item) => {
      if (item.touched) {
        i++;
      }
    });
    if (i >= 2) {
      return this.setState({
        errorInf: true,
      });
    }
  };

  initForm = (form) => {
    if (isadd) {
      return {
        _id: this.state.user._id,
        username: form[0].value,
        phone: form[1].value,
        email: form[2].value,
        // role_id: this.state.role_id,
      };
    } else {
      return {
        username: form[0].value,
        password: form[1].value,
        phone: form[2].value,
        email: form[3].value,
        // role_id: this.state.role_id,
      };
    }
  };

  handleOk = async () => {
    const { getUserList } = this.props;
    const { fieles, errorInf, select, selectValue, user } = this.state;
    if (select) {
      const { data: result } = await updateUser({
        _id: user._id,
        role_id: selectValue,
      });
      if (!result.status === 2) return message.error("设置失败");
      message.success("设置成功");
      getUserList();
    } else if (isadd) {
      const { data: result } = await updateUser(this.initForm(fieles));
      if (!result.status === 2) return message.error("修改失败");
      message.success("修改成功");
      getUserList();
    } else {
      if (errorInf) {
        const { data: result } = await addUser(this.initForm(fieles));
        if (!result.status === 2) return message.error("创建失败");
        message.success("创建成功");
        getUserList();
      }
    }
    this.resetFrom();
    this.setState({
      isModalVisible: false,
    });
  };

  handleCancel = () => {
    this.resetFrom();
    this.setState({ isModalVisible: false });
  };

  handleChange = (value) => {
    this.setState({
      selectValue: value,
    });
  };

  render() {
    const { isModalVisible, fieles, select, user } = this.state;
    // let { roles } = this.props;
    return (
      <>
        <Button
          type="primary"
          onClick={() => {
            isadd = false;
            this.showModal();
          }}
        >
          创建用户
        </Button>
        <Modal
          title="添加用户"
          visible={isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {select ? (
            <Select
              defaultValue={user.role_id}
              style={{ width: "100%" }}
              onChange={this.handleChange}
            >
              {select.map((item) => {
                return (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          ) : (
            <CustomizedForm
              fields={fieles}
              onChange={(newFields) => {
                this.setState(
                  {
                    fieles: newFields,
                  },
                  () => {
                    this.touched(fieles);
                  }
                );
              }}
            />
          )}
        </Modal>
      </>
    );
  }
}
