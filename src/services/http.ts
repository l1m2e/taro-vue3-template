import Taro from '@tarojs/taro'
import { useToken, useLogout, useIsGoToUserPage } from '@/composables'
import { baseUrl } from '@/config/baseUrl'

interface Response {
	data?: any
	statusCode: number
	errMsg: string
}
export interface HttpResponse extends Response {
	data?: object | string
}

export interface DownloadResponse extends Response {
	tempFilePath?: string
}

export interface UploadResponse extends Response {
	data?: object | string
}

const Request = (method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'HEAD' | 'OPTIONS' | 'TRACE', url: string, data?: string | object): Promise<Response> => {
	return new Promise((resolve, reject) => {
		Taro.request({
			method,
			url: `${baseUrl.value}${url}`,
			data,
			header: { 'Content-Type': 'application/json;charset=UTF-8', token: useToken.value, Accept: 'application/json' },
			dataType: 'json',
			success: (res: Taro.request.SuccessCallbackResult) => {
				if (res.statusCode === 401) {
					Taro.showToast({ title: '登录失效', icon: 'none' })
					useLogout()
					useIsGoToUserPage()
				}
				resolve(res)
			},
			fail: (err: TaroGeneral.CallbackResult) => {
				const resp: HttpResponse = { statusCode: -1, errMsg: err.errMsg }
				reject(resp)
			}
		})
	})
}

const GET = (url: string, data?: string | object) => Request('GET', url, data)
const POST = (url: string, data?: string | object) => Request('POST', url, data)
const PUT = (url: string, data?: string | object) => Request('PUT', url, data)
const DELETE = (url: string, data?: string | object) => Request('DELETE', url, data)

// const DownloadFile = (url: string, header?: {}): Promise<DownloadResponse> => {
// 	return new Promise((resolve, reject) => {
// 		Taro.downloadFile({
// 			url,
// 			header,
// 			success: (res: Taro.downloadFile.FileSuccessCallbackResult) => {
// 				resolve({
// 					code: res.statusCode,
// 					tempFilePath: res.tempFilePath
// 				})
// 			},
// 			fail: (err: TaroGeneral.CallbackResult) => {
// 				const resp: DownloadResponse = { code: -1, msg: err.errMsg }
// 				reject(resp)
// 			}
// 		})
// 	})
// }

// const UploadFile = (url: string, filePath: string, name: string, header?: { 'content-type': 'multipart/form-data' }, formData?: Object): Promise<UploadResponse> => {
// 	return new Promise((resolve, reject) => {
// 		Taro.uploadFile({
// 			url,
// 			filePath,
// 			name,
// 			header,
// 			formData,
// 			success: (res: Taro.uploadFile.SuccessCallbackResult) => {
// 				resolve({ code: res.statusCode, data: res.data })
// 			},
// 			fail: (err: TaroGeneral.CallbackResult) => {
// 				const resp: UploadResponse = { code: -1, msg: err.errMsg }
// 				reject(resp)
// 			}
// 		})
// 	})
// }

export { Request, GET, POST, PUT, DELETE } //DownloadFile, UploadFile }
