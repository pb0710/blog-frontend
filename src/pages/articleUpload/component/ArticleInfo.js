import React from 'react'
import { AddPhotoAlternateOutlined, CloseOutlined } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input, Select } from 'sylas-react-ui'
import style from '../style/index.module.scss'
import * as modalAction from '@/components/global/store/action'
import * as articleApi from '@/apis/article'
import * as fileApi from '@/apis/file'
import { useBoolean } from '@/utils/hooks'
import { Uploader } from '@/components/base'
import { message } from '@/components/global'
import defaultArticleBg from '@/assets/images/default_article_bg.jpg'

export default function ArticleInfo(props) {
	const { content } = props

	const dispatch = useDispatch()
	const { userId } = useSelector(state => state.userProfile)

	const [visible, { setTrue: handleShowCover, setFalse: handleHideCover }] = useBoolean(false)
	const [picSrc, setPicSrc] = React.useState(defaultArticleBg)

	const handleAddArticle = async values => {
		const { sort, title, introduce } = values
		const articleDetail = { content, sort, title, introduce, backgroundImage: picSrc }
		try {
			await articleApi.addArticle({ userId, articleDetail })
			handleClose()
			message.success('添加成功')
		} catch (err) {
			console.error('添加文章失败', err)
			message.error(err)
		}
	}

	const uploadImg = async formData => {
		try {
			const { message, payload: remotePicUrl } = await fileApi.uploadImage(formData)
			if (message === 'ok') {
				console.log('remotePicUrl', remotePicUrl)
				setPicSrc(remotePicUrl)
			}
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

	const handleClose = () => {
		dispatch(modalAction.updateModalVisible(false))
		dispatch(modalAction.updateModalContent(null))
	}

	const formItems = [
		{
			label: '题图',
			name: 'pic',
			component: (
				<Uploader format="formdata" onChange={handleAddPic}>
					<div className={style.pic_wrapper} onMouseEnter={handleShowCover} onMouseLeave={handleHideCover}>
						{visible && (
							<div className={style.pic_cover}>
								<AddPhotoAlternateOutlined />
							</div>
						)}
						<img className={style.title_pic} src={picSrc} alt="article_pic" />
					</div>
				</Uploader>
			)
		},
		{
			label: '标题',
			name: 'title',
			component: <Input placeholder="标题很重要" />
		},
		{
			label: '分类',
			name: 'sort',
			component: (
				<Select className={style.sort}>
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
			label: '简介',
			name: 'introduce',
			component: <Input.TextArea placeholder="一句话概括..." />
		}
	]

	return (
		<div className={style.article_info}>
			<h1>添加文章</h1>
			<Button.Icon className={style.close} onClick={handleClose}>
				<CloseOutlined />
			</Button.Icon>
			<Form onFinished={handleAddArticle}>
				{formItems.map(item => (
					<Form.Item key={item.name} {...item}>
						{item.component}
					</Form.Item>
				))}
				<Button className={style.add} htmlType="submit" color="primary">
					确认添加
				</Button>
			</Form>
		</div>
	)
}
