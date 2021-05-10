import React, { useState, useEffect, useCallback } from "react";

import { Form, Input } from "antd";

const CustomizedForm = ({ onChange, fields }) => (
  <Form
    name="roleForm"
    fields={fields}
    onFieldsChange={(_, allFields) => {
      onChange(allFields);
    }}
  >
    <Form.Item
      name="roleName"
      label="角色名称"
      rules={[
        {
          required: true,
          message: "角色名称不能为空",
        },
      ]}
    >
      <Input placeholder="请输入角色名称" />
    </Form.Item>
  </Form>
);

function AddRole(props) {
  const { setForm, isOk, setIsOk } = props;
  const [fieles, setFields] = useState([
    {
      name: "roleName",
      value: "",
    },
  ]);

  const updateRole = useCallback(() => {
    if (isOk) {
      setFields([
        {
          name: "roleName",
          value: "",
        },
      ]);
    }
    return setIsOk(false);
  }, [isOk, setIsOk]);

  useEffect(() => {
    setForm(fieles);
  }, [fieles, setForm, isOk, updateRole]);

  useEffect(() => {
    updateRole();
  }, [updateRole]);

  return (
    <CustomizedForm
      fields={fieles}
      onChange={(newFields) => {
        setFields(newFields);
      }}
    />
  );
}

export default AddRole;
