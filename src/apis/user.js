import request from '@/utils/request'

/**
 * 获取用户基本信息
 * @param {*} username 用户名
 */
export const fetchUserProfile = () => request.get(`user/sign_status`)

/**
 * 注册
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string} nickname 昵称
 */
export const register = (username, password, profile) =>
  request({
    url: `user/register`,
    method: 'POST',
    data: { username, password, profile }
  })

/**
 * 登陆
 * @param {string} username 用户名
 * @param {string} password 密码
 */
export const login = (username, password) =>
  request({
    url: `user/sign_in`,
    method: 'POST',
    data: { username, password }
  })

/**
 * 登出
 * @param {string} username 用户ID
 */
export const logout = () =>
  request({
    url: `user/sign_out`,
    method: 'POST'
  })
