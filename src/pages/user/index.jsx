import React, { useState, useEffect, useCallback, useRef } from "react";
import { Card, Button, Table, message } from "antd";
import AddUser from "./addUser";
import { reqUserList } from "../../config/index";
import date from "../../utils/dateUtils";

export default function User() {
  const [userList, setUserList] = useState([]);

  const updateUserRef = useRef();

  const getUserList = useCallback(async () => {
    const { data: result } = await reqUserList();
    if (!result.status === 0) return message.error("获取失败");
    const { users, roles } = result.data;
    try {
      const newUsers = users.map((user, i) => {
        user.name = roles[i].name;
        return user;
      });
      setUserList(newUsers);
    } catch (error) {}
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
      render: () => {
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                const { showModal } = updateUserRef.current;
                showModal();
              }}
              style={{ marginRight: "15px" }}
            >
              修改
            </Button>
            <Button type="primary">删除</Button>
          </>
        );
      },
    },
  ];
  const title = <AddUser ref={updateUserRef} />;
  return (
    <Card title={title}>
      <Table rowKey="_id" dataSource={userList} columns={columns} border />
    </Card>
  );
}
