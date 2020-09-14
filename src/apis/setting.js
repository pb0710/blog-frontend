import axios from 'axios'

/**
 * 获取用户配置
 * @param {string} userId 用户ID
 */
export const fetchOptions = userId =>
  axios({
    url: `setting/options`,
    params: { userId }
  })

/**
 * 更新用户配置
 * @param {object} opt
 * 	@param {string} userId 用户ID
 * 	@param {object} options 用户配置
 */
export const updateOptions = ({ userId, options = {} } = {}) =>
  axios({
    url: `setting/update_options`,
    method: 'POST',
    data: { userId, options }
  })
