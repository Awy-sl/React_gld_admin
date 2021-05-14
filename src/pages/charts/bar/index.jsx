import React, { useState } from "react";
import { Card, Button } from "antd";

import ReactEcharts from "echarts-for-react";

export default function Bar() {
  // 销量数组
  const [sales, setSales] = useState([5, 20, 36, 10, 10, 20]);
  //   库存数组
  const [stores, setStores] = useState([6, 10, 25, 20, 15, 10]);

  //  配置柱状图对象
  const getOption = () => {
    return {
      title: {
        text: "Echarts 入门示例",
      },
      tooltip: {},
      legend: {
        data: ["销量", "库存"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: sales,
        },
        {
          name: "库存",
          type: "bar",
          data: stores,
        },
      ],
    };
  };

  return (
    <div>
      <Card>
        <Button
          type="primary"
          onClick={() => {
            setSales(sales.map((item) => item + 1));
            setStores(stores.map((item) => item - 1));
          }}
        >
          更新
        </Button>
      </Card>
      <Card title="柱状图一">
        <ReactEcharts option={getOption(sales, stores)} />
      </Card>
    </div>
  );
}
