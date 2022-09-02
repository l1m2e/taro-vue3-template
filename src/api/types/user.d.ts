export interface ILogin {
  code: string
  encryptedData: string
  iv: string
}
export interface IBindPhone {
  code: string
  openCode: string
}
export interface IBindUserInfo {
  name: string
  cardId: string
  type: string
}
