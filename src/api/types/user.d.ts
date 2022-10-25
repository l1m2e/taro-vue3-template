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

export interface ISchoolList {
	School_Provinces: string
	School_City: string
	School_County: string
	Verify: string
	OnLineStatus: string
	School_IP: string
	firstIndex: number
	lastIndex: number
}
