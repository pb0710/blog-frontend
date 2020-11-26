import React, { useCallback } from 'react'
import AddToPhotosIcon from 'mdi-react/AddToPhotosIcon'
import CheckCircleIcon from 'mdi-react/CheckCircleIcon'
import CloseIcon from 'mdi-react/CloseIcon'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input, Select } from 'sylas-react-ui'
import style from '../style/index.module.scss'
import * as modalAction from '@/components/modal/store/action'
import * as articleApi from '@/apis/article'
import * as fileApi from '@/apis/file'
import { useBoolean } from '@/utils/hooks'
import { Uploader } from '@/components/base'
import { msg } from '@/components/base'
import defaultArticleBg from '@/assets/images/default_article_bg.jpg'

export default function ArticleInfo(props) {
	const { content } = props

	const dispatch = useDispatch()
	const { userId } = useSelector(state => state.userProfile)
	const theme = useSelector(state => state.setting.theme)

	const [visible, { setTrue: handleShowCover, setFalse: handleHideCover }] = useBoolean(false)
	const [picSrc, setPicSrc] = React.useState(defaultArticleBg)

	const uploadImg = async formData => {
		try {
			const remotePicUrl = await fileApi.uploadImage(formData)
			console.log('remotePicUrl', remotePicUrl)
			setPicSrc(remotePicUrl)
		} catch (err) {
			console.error(`图片上传失败——${err}`)
		}
	}

	const handleAddPic = async formData => {
		console.log('formData: ', formData)
		if (!formData) return
		formData.append('userId', userId)
		uploadImg(formData)
	}

	const handleClose = useCallback(() => {
		dispatch(modalAction.updateModal(false, null))
	}, [dispatch])

	const handleAddArticle = useCallback(
		async values => {
			const { sort, title, introduce } = values
			const articleDetail = { content, sort, title, introduce, backgroundImage: picSrc }
			try {
				await articleApi.addArticle({ userId, articleDetail })
				handleClose()
				msg.success('添加成功')
			} catch (err) {
				console.error('添加文章失败', err)
				msg.error(err)
			}
		},
		[content, handleClose, picSrc, userId]
	)

	const formItems = [
		{
			name: 'pic',
			component: (
				<div className={style.center_box}>
					<Uploader onChange={handleAddPic}>
						<div className={style.pic_wrapper} onMouseEnter={handleShowCover} onMouseLeave={handleHideCover}>
							<div className={style.pic_cover}>
								<AddToPhotosIcon size={30} color={visible ? '#fff' : 'transparent'} />
							</div>
							<img className={style.title_pic} src={picSrc} alt="" />
						</div>
					</Uploader>
				</div>
			)
		},
		{
			name: 'title',
			rules: [
				{
					async validator(value) {
						if (value.length < 6 || value.length > 36) {
							return Promise.reject('标题长度限制为 6～36 位！')
						}
					}
				}
			],
			component: <Input color={theme} placeholder="标题" />
		},
		{
			name: 'sort',
			component: (
				<Select color={theme} description="文章类别">
					<Select.Option value="frontend">前端</Select.Option>
					<Select.Option value="backend">后端</Select.Option>
					<Select.Option value="mobile">移动端</Select.Option>
					<Select.Option value="computer_science">计算机通用</Select.Option>
					<Select.Option value="engineering">工程化</Select.Option>
				</Select>
			),
			initialValue: 'frontend'
		},
		{
			name: 'introduce',
			rules: [
				{
					async validator(value) {
						if (value.length > 150) {
							return Promise.reject('文章简介长度不能超过 150 位！')
						}
					}
				}
			],
			component: <Input.Textarea color={theme} placeholder="简介" />
		}
	]

	return (
		<div className={style.article_info}>
			<h1>添加文章</h1>
			<Button.Icon className={style.close} onClick={handleClose}>
				<CloseIcon size={20} />
			</Button.Icon>
			<Form onFinsh={handleAddArticle}>
				{formItems.map(item => (
					<Form.Item key={item.name} {...item}>
						{item.component}
					</Form.Item>
				))}
				<div className={style.center_box}>
					<Button type="submit" color={theme} prefixes={<CheckCircleIcon size={20} />}>
						发布文章
					</Button>
				</div>
			</Form>
		</div>
	)
}
