import axios from 'axios'
import { msg } from '@/components/base'

const instance = axios.create({
	// baseURL: 'http://192.168.0.100:10086',
	baseURL: 'http://localhost:10086',
	method: 'GET',
	headers: {
		'Content-Type': 'application/json;charset=UTF-8',
		'Access-Control-Allow-Origin': '*'
	},
	withCredentials: true
})

axios.interceptors.request.use(
	req => req,
	err => Promise.reject('Request rejected', err)
)
const netError = '网络连接失败'

instance.interceptors.response.use(
	res => {
		if (res.status !== 200) {
			msg.error(`${netError}:${res.status}`)
			return Promise.reject(res)
		}
		if (res.data.message !== 'ok') {
			return Promise.reject(res.data.message)
		}

		return Promise.resolve(res.data.payload)
	},
	err => {
		if (err.response.status === 401) {
			msg.info('尚未登录')
			return Promise.reject(err)
		}
		if (err.response.status === 500) {
			msg.error('服务器内部错误')
			return Promise.reject(err)
		}
		msg.error(netError)
		return Promise.reject(err)
	}
)

export default instance
