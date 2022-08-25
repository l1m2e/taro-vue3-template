import { URL, GET, POST, DELETE } from './http'

const testGet = (data: string | object | undefined) => GET(URL('api/get'), data)
const testPost = (data: string | object | undefined) => POST(URL('api/post'), data)
const testDelete = (data: string | object | undefined) => DELETE(URL('api/delete'), data)

export {
  testGet,
  testPost,
  testDelete
}