export interface ILogin {
  code: string
  encryptedData: string
  iv: string
}
export interface IBindPhone {
  code: string
  openCode: string
}
export interface IGetUserInfo {
  sessionKey: string
  encryptedData: string
  iv: string
  openid: string
}
