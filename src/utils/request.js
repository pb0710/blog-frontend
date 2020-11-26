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
const explain = '网络连接失败'

instance.interceptors.response.use(
	res => {
		if (res.status !== 200) {
			msg.error(`${explain}:${res.status}`)
			return Promise.reject(res)
		}
		if (res.data.message !== 'ok') {
			msg.error(res.data.message ? `${explain}，${res.data.message}` : explain)
			return Promise.reject(res.data.message)
		}

		return Promise.resolve(res.data.payload)
	},
	err => {
		msg.error(explain)
		return Promise.reject(err)
	}
)

export default instance
