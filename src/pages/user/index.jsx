import React, { useState, useEffect, useCallback, useRef } from "react";
import { Card, Button, Table, message } from "antd";
import AddAmendUser from "./addAmendUser";
import { reqUserList, deleteUser } from "../../config/index";
import date from "../../utils/dateUtils";

export default function User() {
  const [userList, setUserList] = useState([
    {
      create_time: 1620819696716,
      email: "12@qq.com",
      name: "root",
      password: "63a9f0ea7bb98050796b649e85481845",
      phone: "10000000000",
      username: "root",
      __v: 0,
      _id: "609bbef041985a246c7ec11a",
    },
  ]);
  const [roles, setRoles] = useState([]);

  const updateUserRef = useRef();

  const getUserList = useCallback(async () => {
    const { data: result } = await reqUserList();
    if (!result.status === 0) return message.error("获取失败");
    const { users, roles } = result.data;
    // console.log(result.data);
    setRoles(roles);

    let newUser = users.map((user) => {
      let name = roles.filter((item) => user.role_id === item._id);
      if (name.length > 0) {
        user.name = name[0].name;
      }
      return user;
    });

    setUserList(newUser);
  }, []);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  const columns = [
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "电话",
      dataIndex: "phone",
    },
    {
      title: "注册时间",
      render: (data) => {
        return date(data.create_time);
      },
    },
    {
      title: "所属角色",
      dataIndex: "name",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                const { showModal, isUpdate } = updateUserRef.current;
                isUpdate();
                showModal(data);
              }}
            >
              修改
            </Button>
            <Button
              type="primary"
              style={{ margin: "0px 15px" }}
              onClick={() => {
                const { showModal } = updateUserRef.current;
                showModal(data, roles);
              }}
            >
              设置角色
            </Button>
            <Button
              type="primary"
              onClick={async () => {
                const { data: result } = await deleteUser(data._id);
                if (!result.status === 0) return message.error("删除失败");
                message.success("删除成功");
                getUserList();
              }}
            >
              删除
            </Button>
          </>
        );
      },
    },
  ];
  const title = (
    <AddAmendUser ref={updateUserRef} getUserList={getUserList} roles={roles} />
  );
  return (
    <Card title={title}>
      <Table
        rowKey="_id"
        dataSource={userList}
        columns={columns}
        pagination={{
          defaultPageSize: 4,
          showQuickJumper: true,
        }}
        border
      />
    </Card>
  );
}
