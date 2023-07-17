export default defineAppConfig({
  pages: ["pages/index/index", "pages/index/person/person"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#999999",
    selectedColor: "#9a9afa",
    backgroundColor: "#ffffff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./image/home.png",
        selectedIconPath: "./image/home-selected.png",
      },
      {
        pagePath: "pages/index/person/person",
        text: "个人中心",
        iconPath: "./image/person.png",
        selectedIconPath: "./image/person-selected.png",
      },
    ],
  },
});
