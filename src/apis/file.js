import request from '@/utils/request'

/**
 * 上传图片
 * @param {String} userId 用户ID
 * @param {Object} formData 图像FormData
 */
export const uploadImage = formData =>
	request({
		url: `file/upload_image`,
		method: 'POST',
		data: formData,
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
