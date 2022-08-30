import Taro from '@tarojs/taro'
export function isStatusCode(code: number) {
  switch (code) {
    case 400:
      Taro.showToast({
        title: `服务器不理解客户端的请求，未做任何处理`,
        icon: 'error',
        duration: 2000
      })
      break;
    case 401:
      Taro.showToast({
        title: `身份信息有误`,
        icon: 'error',
        duration: 2000
      })
      break;
    case 403:
      Taro.showToast({
        title: `您无权访问`,
        icon: 'error',
        duration: 2000
      })
      break;
    case 404:
      Taro.showToast({
        title: `所请求的资源不存在，或不可用`,
        icon: 'error',
        duration: 2000
      })
      break;
    case 405:
      Taro.showToast({
        title: `您无权访问`,
        icon: 'error',
        duration: 2000
      })
      break;
    case 410:
      Taro.showToast({
        title: `所请求的资源已从这个地址转移，不再可用`,
        icon: 'error',
        duration: 2000
      })
      break;
    case 415:
      Taro.showToast({
        title: `客户端要求返回的格式不受支持`,
        icon: 'error',
        duration: 2000
      })
      break;
    case 422:
      Taro.showToast({
        title: `上传的附件无法处理 请检查格式`,
        icon: 'error',
        duration: 2000
      })
      break;
    case 429:
      Taro.showToast({
        title: `客户端的请求次数超过限额`,
        icon: 'error',
        duration: 2000
      })
      break;
    case 500:
      Taro.showToast({
        title: `服务器错误`,
        icon: 'error',
        duration: 2000
      })
      break;
    case 503:
      Taro.showToast({
        title: `服务器维护中`,
        icon: 'error',
        duration: 2000
      })
      break;
  }
}
