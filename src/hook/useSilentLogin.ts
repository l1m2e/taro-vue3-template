import { loginApi } from "@/api"
import Taro from '@tarojs/taro'

//静默登录 isIndex用于判断是否在首页 如果不在首页使用静默登录 无需跳转
const silentLogin = (isIndex: boolean) => {
  Taro.login({
    success: async function (e) {
      if (e.code) {
        const { data: res, statusCode } = await loginApi({ code: e.code })
        //用户没有绑定手机号
        if (statusCode === 401) {
          //跳转到绑定手机号页面
          Taro.navigateTo({
            url: '/pages/login/bindPhone/index'
          })
          return
        }
        // 用户首次打开应用 需要授权
        if (res.session_key) {
          Taro.setStorageSync('sessionKey', res.session_key)
          Taro.setStorageSync('openid', res.openid)
          if (isIndex) {
            Taro.navigateTo({
              url: '/pages/login/authorization/index'
            })
          }
        }
        //静默登录直接获取token
        Taro.setStorageSync('token', res.token)
      }
    }
  })
}

export default silentLogin
