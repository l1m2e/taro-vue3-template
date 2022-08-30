export interface ILogin {
  code: string
}
export interface IGetPhone {
  code: string
  openid: string
}
export interface IGetUserInfo {
  sessionKey: string
  encryptedData: string
  iv: string
  openid: string
}
