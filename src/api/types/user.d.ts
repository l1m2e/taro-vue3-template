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
	studentId: string
	type: string
}
