import axios from 'axios'

/**
 * 获取用户基本信息
 * @param {*} username 用户名
 */
export const fetchBaseInfo = username =>
  axios({
    url: `user/base_info`,
    params: { username }
  })

/**
 * 注册
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string} nickname 昵称
 */
export const register = (username, password, nickname) =>
  axios({
    url: `user/register`,
    method: 'POST',
    data: { username, password, nickname }
  })

/**
 * 登陆
 * @param {string} username 用户名
 * @param {string} password 密码
 */
export const login = (username, password) =>
  axios({
    url: `user/login`,
    method: 'POST',
    data: { username, password }
  })

/**
 * 登出
 * @param {string} username 用户ID
 */
export const logout = username =>
  axios({
    url: `user/logout`,
    method: 'POST',
    data: { username }
  })
