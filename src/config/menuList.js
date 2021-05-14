/* 
  * 封装菜单栏
   {
    key: "", key值
    path: "", 跳转路径
    icon: "",  图标
    children: [],  子菜单
  },
*/
import {
  HomeFilled,
  AppstoreFilled,
  ToolOutlined,
  UnorderedListOutlined,
  SafetyOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartFilled,
  ContainerOutlined,
} from "@ant-design/icons";

export const menuList = [
  {
    title: "首页",
    key: "/home",
    path: "/home",
    icon: HomeFilled,
    isPublic: true,
  },
  {
    title: "商品",
    key: "/commodty",
    path: "",
    icon: AppstoreFilled,
    children: [
      {
        title: "品类管理",
        key: "/category",
        path: "/category",
        icon: ToolOutlined,
      },
      {
        title: "商品管理",
        key: "/product",
        path: "/product",
        icon: UnorderedListOutlined,
      },
    ],
  },
  {
    title: "用户管理",
    key: "/user",
    path: "/user",
    icon: SafetyOutlined,
  },
  {
    title: "角色管理",
    key: "/role",
    path: "/role",
    icon: ContainerOutlined,
  },
  {
    title: "图形图表",
    key: "/charts",
    path: "",
    icon: AreaChartOutlined,
    children: [
      {
        title: "柱形图",
        key: "/charts/bar",
        path: "/charts/bar",
        icon: BarChartOutlined,
      },
      {
        title: "折线图",
        key: "/charts/line",
        path: "/charts/line",
        icon: LineChartOutlined,
      },
      {
        title: "饼图",
        key: "/charts/pie",
        path: "/charts/pie",
        icon: PieChartFilled,
      },
    ],
  },
];
