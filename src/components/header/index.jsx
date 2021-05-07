import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { Redirect } from "react-router-dom";
import storageUtils from "../../utils/storageUtils";
import { getWeather } from "../../config/index";
import "./header.css";
import getDate from "../../utils/dateUtils";

export default function Header(props) {
  // 定义 setae 属性
  const [counst, setCounst] = useState(true);
  const [navname, setNavname] = useState("首页");
  const [weather, setWeather] = useState({});
  const [date, setDate] = useState(getDate(Date.now()));

  // 组件渲染前生命周期
  useEffect(() => {
    const name = navto(props);
    setNavname(name);
    setInterval(() => {
      let date = getDate(Date.now());
      setDate(date);
    }, 1000);
    getData();
  }, [props]);

  // 获取天气
  async function getData() {
    const result = await getWeather();
    const { now } = result;
    try {
      if (now["text"]) {
        setWeather(now);
      }
    } catch (error) {
      message.error("获取天气失败" + result.code);
      return setWeather({
        text: result.code,
        temp: 37,
      });
    }
  }

  // 实现动态面包屑导航
  function navto({ path }) {
    switch (path) {
      case "/home":
        return "首页";
      case "/category":
        return "品类管理";
      case "/product":
        return "商品管理";
      case "/user":
        return "用户管理";
      case "/role":
        return "角色管理";
      case "/charts/bar":
        return "柱状图";
      case "/charts/line":
        return "折线图";
      case "/charts/pie":
        return "饼图";
      default:
        return "首页";
    }
  }

  // 删除用户退出登录
  const deleteUse = () => {
    storageUtils.deleteUser();
    setCounst(!counst);
  };

  if (!counst) return <Redirect to="/login" />;

  return (
    <main id="header">
      <div className="header-top" style={{ textAlign: "right" }}>
        <div className="top-cont">
          <span
            style={{
              color: "#242424",
              marginRight: "15px",
              fontWeight: "500",
              fontSize: "18px",
            }}
          >
            {props.name}
          </span>
          <Button type="dashed" size="small" onClick={deleteUse}>
            退出
          </Button>
        </div>
      </div>
      <div className="header-boot">
        <span>
          <i className="sj"></i>
          {navname}
        </span>
        <div className="weather">
          <p>{date}</p>
          <i>🌤</i>
          <p>
            {weather.text} / {weather.temp}C°
          </p>
        </div>
      </div>
    </main>
  );
}
