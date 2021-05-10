import React, { useState, useEffect, useCallback } from "react";
import { Tree, Form, Input } from "antd";

import { menuList } from "../../config/menuList";

export default function SetRoleJus(props) {
  const { role, setRole } = props;
  const [treeNode, setTreeNode] = useState();
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const getTreeNode = useCallback(() => {
    return menuList.reduce((pre, { title, key, children }) => {
      pre.push({ title, key, children });
      return pre;
    }, []);
  }, []);

  //   * 初始化树形控件
  const initTerr = useCallback(() => {
    const { menus } = role;
    const trees = getTreeNode();
    //  console.log(treeNode);
    setTreeNode([
      {
        title: "平台权限",
        key: "/admin",
        children: [...trees],
      },
    ]);
    setCheckedKeys(menus);
  }, [getTreeNode, role]);

  useEffect(() => {
    initTerr();
  }, [initTerr]);

  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
    role.menus = checkedKeysValue;
    setRole(role);
  };

  const onSelect = (selectedKeysValue, info) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <Form>
      <Form.Item label="角色名称">
        <Input value={role.name} disabled />
      </Form.Item>
      <Form.Item>
        <Tree
          checkable
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          treeData={treeNode}
        />
      </Form.Item>
    </Form>
  );
}
