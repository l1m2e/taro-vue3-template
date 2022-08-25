import config from '../../config'

const baseUrl = config.baseUrl

const URL = (url: string, params?: { [key: string]: any }) => {
  let urlStr = `${baseUrl}/${url}`
  if (!urlStr.includes('?')) urlStr += '?'
  if (params) {
    Object.keys(params).forEach((key) => {
      urlStr += `&${key}=${params[key]}`
    })
  }
  urlStr += `&_=${new Date().valueOf()}`
  return urlStr
}

export { URL }