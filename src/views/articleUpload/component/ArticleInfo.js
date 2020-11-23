import React from 'react'
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

	const handleAddArticle = async values => {
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
	}

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

	const handleClose = () => {
		dispatch(modalAction.updateModal(false, null))
	}

	const formItems = [
		{
			label: '题图',
			name: 'pic',
			component: (
				<Uploader onChange={handleAddPic}>
					<div className={style.pic_wrapper} onMouseEnter={handleShowCover} onMouseLeave={handleHideCover}>
						{visible && (
							<div className={style.pic_cover}>
								<AddToPhotosIcon size={20} />
							</div>
						)}
						<img className={style.title_pic} src={picSrc} alt="" />
					</div>
				</Uploader>
			)
		},
		{
			label: '标题',
			name: 'title',
			component: <Input color={theme} placeholder="标题很重要" />
		},
		{
			label: '分类',
			name: 'sort',
			component: (
				<Select className={style.sort}>
					<Select.Option color={theme} value="frontend">
						前端
					</Select.Option>
					<Select.Option color={theme} value="backend">
						后端
					</Select.Option>
					<Select.Option color={theme} value="mobile">
						移动端
					</Select.Option>
					<Select.Option color={theme} value="computer_science">
						计算机通用
					</Select.Option>
					<Select.Option color={theme} value="engineering">
						工程化
					</Select.Option>
				</Select>
			),
			initialValue: 'frontend'
		},
		{
			label: '简介',
			name: 'introduce',
			component: <Input.TextArea color={theme} placeholder="一句话概括..." />
		}
	]

	return (
		<div className={style.article_info}>
			<h1>添加文章</h1>
			<Button.Icon className={style.close} onClick={handleClose}>
				<CloseIcon size={20} />
			</Button.Icon>
			<Form onFinished={handleAddArticle}>
				{formItems.map(item => (
					<Form.Item key={item.name} {...item}>
						{item.component}
					</Form.Item>
				))}
				<Button className={style.add} htmlType="submit" color={theme} prefixes={<CheckCircleIcon size={20} />}>
					发布文章
				</Button>
			</Form>
		</div>
	)
}
