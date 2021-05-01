import React from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import "./category.css";

export default function Category() {
  return (
    <div className="category">
      <div className="category-top">
        <h1>一级分类列表</h1>
        <Button type="primary" icon={<DownloadOutlined />}>
          添加
        </Button>
      </div>
    </div>
  );
}
