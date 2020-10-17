import React from 'react'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input, Select } from 'sylas-react-ui'
import style from '../style/index.module.scss'
import * as modalAction from '@/components/modal/store/action'
import * as articleApi from '@/apis/article'
import * as fileApi from '@/apis/file'
import { useBoolean } from '@/utils/hooks'
import { Uploader } from '@/components/base'

export default function ArticleInfo(props) {
	const { content } = props

	const dispatch = useDispatch()
	const { userId } = useSelector(state => state.userProfile)

	const { state: visible, setTrue: handleShowCover, setFalse: handleHideCover } = useBoolean(false)
	const [picSrc, setPicSrc] = React.useState(
		'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3zmPVUxq5RLPmklOaGEL6Txo6L6hw3guQeQ&usqp=CAU'
	)

	const handleAddArticle = async values => {
		const { sort, title, introduce } = values
		const articleDetail = { content, sort, title, introduce, backgroundImage: picSrc }
		try {
			await articleApi.addArticle({ userId, articleDetail })
			handleClose()
		} catch (err) {
			console.error('添加文章失败', err)
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

	return (
		<div className={style.article_info}>
			<h1>添加文章</h1>
			<Button.Icon className={style.close} onClick={handleClose}>
				<CloseOutlined />
			</Button.Icon>
			<Form onFinished={handleAddArticle}>
				<Form.Item label="题图">
					<Uploader format="formdata" onChange={handleAddPic}>
						<div className={style.pic_wrapper} onMouseEnter={handleShowCover} onMouseLeave={handleHideCover}>
							{visible && (
								<div className={style.pic_cover}>
									<PlusOutlined />
								</div>
							)}
							<img className={style.title_pic} src={picSrc} alt="article_pic" />
						</div>
					</Uploader>
				</Form.Item>
				<Form.Item label="标题" name="title">
					<Input placeholder="标题很重要" />
				</Form.Item>
				<Form.Item label="类别" name="sort" initialValue="frontend">
					<Select>
						<Select.Option value="frontend">前端</Select.Option>
						<Select.Option value="backend">后端</Select.Option>
						<Select.Option value="mobile">移动端</Select.Option>
						<Select.Option value="computer_science">计算机通用</Select.Option>
						<Select.Option value="engineering">工程化</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item label="简介" name="introduce">
					<Input.TextArea placeholder="一句话概括..." />
				</Form.Item>
				<Button className={style.add} htmlType="submit" color="primary">
					确认添加
				</Button>
			</Form>
		</div>
	)
}
