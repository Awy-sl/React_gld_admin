import React, { useState, useEffect, useRef } from "react";
import { Button, Table, Modal, Select, message, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./category.css";
import {
  getCategoryList,
  addCategory,
  changeCategory,
} from "../../config/index";

const { Option } = Select;

export default function Category() {
  const [oneData, setOneData] = useState([]);
  const [data, setData] = useState([]);
  const [parentId, setParentId] = useState("0");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  const inputRef = useRef();

  const columns = [
    {
      title: "分类名称",
      dataIndex: "name",
      key: "name",
      width: "70%",
    },
    {
      title: "操作",
      dataIndex: "operate",
      width: "30%",
      key: "operate",
      render: (operate, data) => (
        <>
          <Button
            onClick={() => {
              updateCategory(data);
            }}
            style={{
              backgroundColor: "#4FD987",
              borderColor: "#4FD987",
            }}
          >
            {operate[0]}
          </Button>
          {operate[1] ? (
            <Button
              onClick={() => {
                showSubCategory(data);
              }}
              type="primary"
              style={{ marginLeft: "15px" }}
            >
              {operate[1]}
            </Button>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];
  // ! 踩坑如果需要修改数据最好在 useEffect 回调中进行修改
  useEffect(() => {
    // 获取
    categoryList(parentId);
    if (update) {
      inputRef.current.state.value = updateData.name;
    }
  }, [parentId, update, updateData]);

  // 获取 一级 商品分类
  async function categoryList(id) {
    setLoading(true);
    let arr = [];
    const { data } = await getCategoryList(id);
    if (data.status !== 0) return message.error("获取失败");
    data.data.forEach(({ _id, name, parentId }) => {
      arr.unshift({
        operate: parentId === "0" ? ["修改分类", "查看子分类"] : ["修改分类"],
        name,
        key: _id,
        parentId,
      });
    });
    if (id === "0") {
      setOneData(arr);
    }
    setLoading(false);
    setData(arr);
  }
  // 获取 二级 商品分类
  const showSubCategory = (data) => {
    setParentId((id) => {
      let newId = id;
      newId = data.key;
      return newId;
    });
    console.log(parentId);
  };
  // 修改商品分类
  const updateCategory = (data) => {
    setUpdate((v) => {
      let newV = v;
      newV = true;
      setUpdateData(data);
      showModal();
      return newV;
    });
  };
  //
  function handleChange(value) {
    setParentId(value);
    console.log(value);
  }
  // 打开添加分类提示框事件
  const showModal = () => {
    if (update) {
      setIsModalVisible(true);
    } else {
      setIsModalVisible(true);
      try {
        inputRef.current.state.value = "";
      } catch (error) {}
    }
  };
  // 提交添加分类事件
  const handleOk = async () => {
    const { value } = inputRef.current.state;
    if (update) {
      const { data } = await changeCategory({
        categoryId: updateData.key,
        categoryName: value,
      });
      if (!data.status === "0") return message.error("修改失败");
      message.success("修改成功");
      categoryList(parentId);
    } else {
      if (value === "") return message.error("分类名称不能为空！");
      const { data } = await addCategory({ parentId, categoryName: value });
      console.log(data);
      if (!data.status === "") return message.error("添加失败!");
      message.success("添加成功");
      categoryList(parentId);
    }
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="category">
      <div className="category-top">
        <div style={{ display: "flex" }}>
          <p
            style={{
              color: parentId === "0" ? "#001529" : "#1890FF",
              cursor: "pointer",
            }}
            onClick={() => {
              setParentId("0");
            }}
          >
            一级分类列表
          </p>
          <i
            style={{
              marginLeft: "5px",
              lineHeight: "50px",
            }}
          >
            {parentId === "0" ? "" : "/ 二级分类"}
          </i>
        </div>
        <Button
          type="primary"
          size="middle"
          icon={<PlusOutlined />}
          onClick={showModal}
        >
          添加
        </Button>
      </div>
      <div className="caegory-cont">
        {/* 添加商品对话框 */}
        <Modal
          title={update ? "修改分类名称" : "添加分类"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form>
            <Form.Item>
              {update ? (
                <></>
              ) : (
                <Select
                  defaultValue={parentId}
                  style={{ width: "100%" }}
                  onChange={handleChange}
                >
                  <Option key="0" value="0">
                    一级分类
                  </Option>
                  {oneData.map(({ key, name }) => {
                    return (
                      <Option key={key} value={key}>
                        {name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              <Input id="input" ref={inputRef} placeholder="请输入分类名称" />
            </Form.Item>
          </Form>
        </Modal>
        <Table
          loading={loading}
          columns={columns}
          pagination={{
            defaultPageSize: 5,
            showQuickJumper: true,
          }}
          dataSource={data}
          bordered={true}
        ></Table>
      </div>
    </div>
  );
}
