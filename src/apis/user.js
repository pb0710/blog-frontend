import request from 'utils/request'
import { Method } from 'common/constants'

/**
 * 获取用户基本信息
 * @param {*} userId 用户ID
 */
export const fetchBaseInfo = userId =>
	request({
		url: `user/base_info`,
		params: { userId }
	})

/**
 * 注册
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string} nickname 昵称
 */
export const register = (username, password, nickname) =>
	request({
		url: `user/register`,
		method: Method.POST,
		data: { username, password, nickname }
	})

/**
 * 登陆
 * @param {string} username 用户名
 * @param {string} password 密码
 */
export const login = (username, password) =>
	request({
		url: `user/login`,
		method: Method.POST,
		data: { username, password }
	})

/**
 * 登出
 * @param {string} userId 用户ID
 */
export const logout = userId =>
	request({
		url: `user/logout`,
		method: Method.POST,
		data: { userId }
	})
