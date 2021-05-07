import React, { useState, useEffect, useCallback, useRef } from "react";
import { Card, Select, Button, Table, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  getProductList,
  reqSearchProducts,
  updateStatus,
} from "../../config/index";
import { PAGE_SIZE } from "../../utils/constants";

const { Option } = Select;

export default function ProductHome(props) {
  // 表格每一项
  const [productData, setProductData] = useState([]);
  // 商品总条数
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("productName");
  const [pagNumber, setPagNumber] = useState(1);

  const searchRef = useRef("");
  // 处理返回数据
  const manageData = useCallback(async (res) => {
    const { total, list } = res;
    setProductData(list);
    setTotal(total);
    setLoading(false);
    return;
  }, []);
  // 获取指定页码列表和搜索商品数据显示
  const getProducsAndSearch = useCallback(
    async (pageNum, search) => {
      setLoading(true);
      // 搜索商品
      if (search) {
        const { data: result } = await reqSearchProducts({
          pageNum,
          pageSize: PAGE_SIZE,
          ...search,
        });
        if (!result.status === "0") return message.error("搜索失败");
        manageData(result.data);
        return;
      }
      const { data: result } = await getProductList(pageNum, PAGE_SIZE);
      if (!result.status === "0") return message.error("获取失败");
      manageData(result.data);
    },
    [manageData]
  );

  const alterStatus = async ({ _id, status }) => {
    if (status === 2) {
      status = 1;
    } else {
      status = 2;
    }
    const { data: result } = await updateStatus(_id, status);
    if (!result.status === 0) return message.error("更新失败");
    onSearch(pagNumber);
    return message.success("更新商品成功");
  };
  // 搜索按钮事件
  const onSearch = (pageNum = 1) => {
    const { value } = searchRef.current.state;
    if (value)
      return getProducsAndSearch(pageNum, { searchType, searchName: value });
    getProducsAndSearch(pageNum);
  };
  //
  useEffect(() => {
    getProducsAndSearch(1);
  }, [getProducsAndSearch]);
  // 路由跳转
  const routerSkip = (path, product) => {
    props.history.replace(path, product);
  };
  // 初始化table 列的数组
  const columns = [
    {
      title: "商品名称",
      width: "20%",
      dataIndex: "name",
    },
    {
      title: "商品描述",
      width: "30%",
      dataIndex: "desc",
    },
    {
      title: "价格",
      width: "14%",
      dataIndex: "price",
      render: (price) => "💴" + price,
    },
    {
      title: "状态",
      width: "12%",
      render: (data) => (
        <>
          <Button
            onClick={() => {
              alterStatus(data);
            }}
            style={{ marginRight: "10px" }}
            type="primary"
          >
            {data.status === 1 ? "下架" : "上架"}
          </Button>
          <span>{data.status === 1 ? "在售" : "已下架"}</span>
        </>
      ),
    },
    {
      title: "操作",
      width: "18%",
      render: (product) => (
        <>
          <Button
            onClick={() => {
              routerSkip("/product/detail", product);
            }}
            style={{ marginRight: "15px" }}
            type="primary"
          >
            详情
          </Button>
          <Button
            onClick={() => {
              routerSkip("/product/addupdate", product);
            }}
            type="primary"
          >
            修改
          </Button>
        </>
      ),
    },
  ];
  //header 左
  const title = (
    <span>
      <Select
        onChange={(value) => {
          setSearchType(value);
        }}
        defaultValue={searchType}
        style={{ width: 150, marginRight: 10 }}
      >
        <Option key="1" value="productName">
          按名称搜索
        </Option>
        <Option key="2" value="productDesc">
          按描述搜索
        </Option>
      </Select>
      <Input
        ref={searchRef}
        placeholder="关键字"
        style={{ width: 150, marginRight: 10 }}
      ></Input>
      <Button
        type="primary"
        onClick={() => {
          onSearch();
        }}
      >
        搜索
      </Button>
    </span>
  );
  // header 右
  const extra = (
    <Button
      onClick={() => {
        routerSkip("/product/addupdate");
      }}
      type="primary"
      icon={<PlusOutlined />}
    >
      添加商品
    </Button>
  );

  return (
    <Card title={title} extra={extra}>
      <Table
        loading={loading}
        rowKey="_id"
        dataSource={productData}
        columns={columns}
        bordered
        pagination={{
          showQuickJumper: true,
          defaultPageSize: PAGE_SIZE,
          total,
          onChange: (pageNum) => {
            setPagNumber(pageNum);
            const { value } = searchRef.current.state;
            if (value)
              return getProducsAndSearch(pageNum, {
                searchType,
                searchName: value,
              });
            getProducsAndSearch(pageNum);
          },
        }}
      />
    </Card>
  );
}
