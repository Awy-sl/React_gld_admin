import React, { useState, useEffect, useCallback, useRef } from "react";
import { Card, Button, Form, Input, Cascader, message } from "antd";
import PicturesWall from "./PicturesWall";
import RichTexEditor from "./RichTexEditor";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getCategoryList, addProduct, updateProduct } from "../../config/index";

export default function ProductAddUpdate(props) {
  let product = props.location.state;
  const isUpdate = !!product;
  product = product || {};
  const categoryIds = [];
  const { categoryId, pCategoryId, imgs, _id, detail } = product;

  const [images, setImages] = useState([]);
  const [options, setOptions] = useState([]);

  const editorRef = useRef();

  const initCategory = async (data, isLeaf = false) => {
    return data.map((item) => ({
      value: item._id,
      label: item.name,
      isLeaf,
    }));
  };

  const updateImages = useCallback((imgs) => {
    console.log(imgs);
    return setImages(imgs.map((item) => item.name));
  }, []);

  const getCategoryName = useCallback(
    async (parentId) => {
      const { data: result } = await getCategoryList(parentId);
      if (!result.status === "0") return message.error("获取失败");
      if (parentId === "0") {
        const options = await initCategory(result.data);
        if (isUpdate && pCategoryId !== "0") {
          const { data: result } = await getCategoryList(pCategoryId, true);
          const subCategorys = await initCategory(result.data);

          // 找到当前商品对应的一级options对象
          const targetOption = options.find(
            (options) => options.value === pCategoryId
          );
          // 关联对应的上一级 options 上
          targetOption.children = subCategorys;
        }
        setOptions(options);
      } else {
        return await initCategory(result.data, true);
      }
    },
    [setOptions, isUpdate, pCategoryId]
  );
  console.log(product);
  useEffect(() => {
    getCategoryName("0");
    // setIsUpdate(!!props.location.state);
  }, [getCategoryName]);

  // 添加更新商品
  const addUpdateProduct = async (products) => {
    if (isUpdate) {
      const { data: result } = await updateProduct(products);
      if (!result.status === 0) return message.error("更新失败");
      message.success("添加成功");
      console.log(result);
    } else {
      const { data: result } = await addProduct(products);
      if (!result.status === 0) return message.error("更新失败");
      message.success("添加成功");
      console.log(result);
    }
  };

  function onChange(value) {
    console.log(value);
  }
  //
  const onFinish = (values) => {
    const { getEditorValue } = editorRef.current;
    values.imgs = images;
    values.detail = getEditorValue();
    values.pCategoryId = values.categoryId[0];
    values.categoryId = values.categoryId[1];
    if (isUpdate) values._id = _id;
    addUpdateProduct(values);
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[0];

    targetOption.loading = true;

    const childrenOptions = await getCategoryName(targetOption.value);
    // load options lazily
    targetOption.loading = false;

    targetOption.children = childrenOptions;

    if (!targetOption.children.length > 0) {
      targetOption.isLeaf = true;

      delete targetOption.children;
    }
    setOptions([...options]);
  };

  const title = (
    <>
      <Button
        style={{ marginRight: "15px" }}
        onClick={() => {
          props.history.replace("/product");
        }}
        icon={<ArrowLeftOutlined />}
      ></Button>
      <span>{isUpdate ? "修改商品" : "添加商品"}</span>
    </>
  );
  const itemStyle = { width: "600px" };

  // 为修改商品
  if (isUpdate) {
    // 商品是一个一级分类的商品
    if (categoryId === "0") {
      categoryIds.push(categoryId);
    } else {
      categoryIds.push(pCategoryId);
      categoryIds.push(categoryId);
    }
  }

  return (
    <Card title={title}>
      <Form
        labelAlign
        layout="horizontal"
        initialValues={{
          name: product.name,
          desc: product.desc,
          price: product.price,
          categoryId: categoryIds,
          imgs,
        }}
        name="product"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          style={itemStyle}
          label="商品名称"
          name="name"
          rules={[{ required: true, message: "必须输入商品名称" }]}
        >
          <Input placeholder="请输入商品名称" />
        </Form.Item>
        <Form.Item
          style={itemStyle}
          name="desc"
          label="商品描述"
          rules={[{ required: true, message: "必须输入商品描述" }]}
        >
          <Input.TextArea
            placeholder="请输入商品描述"
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
        <Form.Item
          style={itemStyle}
          label="商品价格"
          name="price"
          rules={[{ required: true, message: "必须商品价格 价格不能为0" }]}
        >
          <Input type="number" placeholder="请输入商品价格" addonAfter="元" />
        </Form.Item>
        <Form.Item
          style={itemStyle}
          label="商品分类"
          name="categoryId"
          rules={[{ required: true, message: "必须指定商品分类" }]}
        >
          <Cascader
            options={options}
            onChange={onChange}
            loadData={loadData}
            placeholder="请指定商品分类"
          />
        </Form.Item>
        <Form.Item style={itemStyle} label="商品图片" name="imgs">
          <PicturesWall
            updateImages={updateImages}
            imgs={imgs}
            isUpdate={isUpdate}
          />
        </Form.Item>
        <Form.Item style={{ width: "80%" }} label="商品详情" name="detail">
          <RichTexEditor ref={editorRef} detail={detail} isUpdate={isUpdate} />
        </Form.Item>
        <Form.Item style={{ paddingLeft: "6%" }}>
          <Button
            onClick={() => {
              console.log(images);
            }}
            type="primary"
            htmlType="submit"
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
