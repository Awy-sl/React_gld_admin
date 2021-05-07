import React, { useState, useEffect, useCallback } from "react";
import { Card, Button, List, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./index.css";
import { BASE_IMG_URL } from "../../utils/constants";
import { reqCategoryName } from "../../config/index";
const { Item } = List;

export default function ProductDetail(props) {
  const [classifyNmae, setClassifyNmae] = useState("获取失败");

  const {
    name,
    desc,
    price,
    pCategoryId,
    categoryId,
    imgs,
    detail,
  } = props.location.state;

  const getCategoryName = useCallback(async () => {
    try {
      if (pCategoryId === "0") {
        //一级分类下的商品
        const { data: result } = await reqCategoryName(categoryId);
        setClassifyNmae(result.data.name);
      } else {
        const res = await Promise.all([
          reqCategoryName(pCategoryId),
          reqCategoryName(categoryId),
        ]);
        const { data: result } = res[0];
        const { data: resultSon } = res[1];
        setClassifyNmae(result.data.name + " --> " + resultSon.data.name);
      }
    } catch (error) {
      message.error("获取商品分类名称失败！");
    }
  }, [pCategoryId, categoryId]);
  useEffect(() => {
    getCategoryName();
  }, [getCategoryName]);

  const title = (
    <>
      <Button
        style={{ marginRight: "15px" }}
        onClick={() => {
          props.history.replace("/product");
        }}
        icon={<ArrowLeftOutlined />}
      ></Button>
      <span>商品详情</span>
    </>
  );
  return (
    <Card title={title}>
      <List>
        <Item>
          <span className="left">商品名称:</span>
          <span>{name}</span>
        </Item>
        <Item>
          <span className="left">商品描述:</span>
          <span>{desc}</span>
        </Item>
        <Item>
          <span className="left">商品价格:</span>
          <span>{price}</span>
        </Item>
        <Item>
          <span className="left">商品分类:</span>
          <span>{classifyNmae}</span>
        </Item>
        <Item>
          <span className="left">商品图片:</span>
          <span>
            {imgs.map((path, i) => {
              return (
                <img
                  style={{
                    width: "90px",
                    height: "90px",
                  }}
                  key={i}
                  src={`${BASE_IMG_URL}${path}`}
                  alt={path}
                />
              );
            })}
          </span>
        </Item>
        <Item>
          <span className="left">商品详情:</span>
          <span dangerouslySetInnerHTML={{ __html: detail }}></span>
        </Item>
      </List>
    </Card>
  );
}
