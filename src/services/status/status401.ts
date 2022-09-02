import Taro from '@tarojs/taro'

export default function (res: any) {
  if (res.message) {
    switch (res.message) {
      case 'token过期':
        Taro.removeStorageSync('token')
        break;
    }
  }
}