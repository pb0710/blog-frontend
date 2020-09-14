import axios from 'axios'

/**
 * 上传图片
 * @param {string} userId 用户ID
 * @param {object} formData 图像FormData
 */
export const uploadImage = formData =>
  axios({
    url: `file/upload_image`,
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
