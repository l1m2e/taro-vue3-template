export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/user/index',
    'pages/login/authorization/index',
    'pages/login/bindPhone/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#ccc",
    selectedColor: "#4988fd",
    backgroundColor: "#fafafa",
    borderStyle: 'white',
    list: [{
      pagePath: "pages/home/index",
      iconPath: "./assets/tab-bar/home.png",
      selectedIconPath: "./assets/tab-bar/home-active.png",
      text: ""
    },
    {
      pagePath: "pages/user/index",
      iconPath: "./assets/tab-bar/user.png",
      selectedIconPath: "./assets/tab-bar/user-active.png",
      text: ""
    }]
  }
})
