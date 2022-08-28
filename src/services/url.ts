import config from '../config'

const baseUrl = config.baseUrl

const URL = (url: string, params?: { [key: string]: any }) => {
  let urlStr = `${baseUrl}/${url}`
  if (params) {
    Object.keys(params).forEach((key) => {
      urlStr += `&${key}=${params[key]}`
    })
  }
  return urlStr
}

export { URL }