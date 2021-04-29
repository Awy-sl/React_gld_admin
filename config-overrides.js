const { override, addWebpackAlias, fixBabelImports } = require("customize-cra");
const { resolve } = require("path");

module.exports = override(
  /* 实现 antd 按需导入 */
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css",
  }),
  /* 
  ! 修改主题颜色  （有坑） 
  addLessLoader({
     javascriptEnabled: true,
     modifyVars: { "@primary-color": "#1DA57A" },
   }),
   */
  /* 修改 react 路径别名为 "@" */
  addWebpackAlias({
    ["@"]: resolve(__dirname, "src"),
  })
);
