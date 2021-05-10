import React, { useCallback, useEffect, useState } from "react";
import { Card, Button, Table, message, Modal } from "antd";

import AddRole from "./AddRole";
import SetRoleJus from "./SetRoleJus";

import { reqRoleList } from "../../config/index";
import time from "../../utils/dateUtils";
import { addRole, setRolePermissions } from "../../config/index";

export default function Role() {
  const [isRole, setIsRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState({});
  const [form, setForm] = useState([]);
  const [isOk, setIsOk] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getRoleList = useCallback(async () => {
    const { data: result } = await reqRoleList();
    if (!result.status === 0) return message.error("获取失败");
    const { data } = result;
    data.map((item) => {
      item.create_time = time(item.create_time);
      item.auth_time = time(item.auth_time);
      return item;
    });
    setRoles(data);
  }, []);

  useEffect(() => {
    getRoleList();
  }, [getRoleList]);

  // * 表单提交事件

  // * 监听表格项事件
  const onRow = (e) => {
    return {
      onClick: (event) => {
        setRole(e);
      },
    };
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsOk(true);
    if (form.length > 0) {
      try {
        const { errors, value } = form[0];
        if (errors || !errors === []) {
          setIsOk(true);
          setIsModalVisible(false);
          const { data: result } = await addRole(value);
          console.log(result);
          if (!result.status === 0) return message.error("添加失败");
          message.success("添加成功");
          setForm([]);
          getRoleList();
        }
      } catch (err) {
        throw err;
      }
    } else {
      setIsModalVisible(false);
      const { data: result } = await setRolePermissions(role);
      if (!result.status === 0) return message.error("设置失败");
      message.success("设置角色权限成功");
      console.log(result);
    }
  };

  const columns = [
    {
      title: "角色名称",
      dataIndex: "name",
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
    },
    {
      title: "授权时间",
      dataIndex: "auth_time",
    },
    {
      title: "授权人",
      dataIndex: "auth_name",
    },
  ];
  const title = (
    <>
      <Button
        type="primary"
        onClick={() => {
          setIsRole("ADD_ROLE");
          showModal();
        }}
        style={{ marginRight: 15 }}
      >
        创建角色
      </Button>
      <Button
        type="primary"
        onClick={() => {
          setIsRole("SET_ROLE_JUS");
          showModal();
        }}
        disabled={!role._id}
      >
        设置角色权限
      </Button>
    </>
  );
  return (
    <Card title={title}>
      <Table
        border
        rowKey="_id"
        onRow={onRow}
        dataSource={roles}
        columns={columns}
        pagination={{
          defaultPageSize: 3,
          showQuickJumper: true,
        }}
        rowSelection={{
          type: "radio",
          selectedRowKeys: [role._id],
        }}
      />
      <Modal
        title={isRole === "ADD_ROLE" ? "创建角色" : "设置角色权限"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setIsOk(true);
          setIsModalVisible(false);
        }}
      >
        {isRole === "ADD_ROLE" ? (
          <AddRole
            setForm={(from) => setForm(from)}
            isOk={isOk}
            setIsOk={setIsOk}
          />
        ) : (
          <SetRoleJus role={role} setRole={setRole} />
        )}
      </Modal>
    </Card>
  );
}
