import axios from 'axios'
import * as config from 'common/config'

// 自定义拦截器
const instance = axios.create({
	baseURL: config.domain,
	method: 'GET',
	headers: {
		'Content-Type': 'application/json;charset=UTF-8',
		'Access-Control-Allow-Origin': '*'
	}
})

axios.interceptors.request.use(
	req => req,
	err => Promise.reject('request被拦截', err)
)

instance.interceptors.response.use(
	res => {
		const { status, data } = res

		if (status === 200) {
			const { status, payload } = data

			if (status === 'OK') {
				return Promise.resolve(payload)
			} else {
				return Promise.reject(payload)
			}
		} else {
			console.error(`响应状态：${status}`)
		}
	},
	err => {
		const { status, data } = err.response
		return Promise.reject(`接口被拦截，响应状态：${status}，错误信息：${data.message}`)
	}
)

export default instance
