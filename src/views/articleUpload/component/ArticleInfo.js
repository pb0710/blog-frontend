import React, { useCallback } from 'react'
import AddToPhotosIcon from 'mdi-react/AddToPhotosIcon'
import CheckCircleIcon from 'mdi-react/CheckCircleIcon'
import CloseIcon from 'mdi-react/CloseIcon'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input, Select, Uploader } from 'sylas-react-ui'
import style from '../style/index.module.scss'
import * as modalAction from '@/components/modal/store/action'
import * as articleApi from '@/apis/article'
import * as fileApi from '@/apis/file'
import { useBoolean } from '@/utils/hooks'
import { msg } from '@/components/base'
import defaultArticleBg from '@/assets/images/default_article_bg.png'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

export default function ArticleInfo(props) {
	const { content } = props

	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { userId } = useSelector(state => state.userProfile)
	const theme = useSelector(state => state.setting.theme)

	const [visible, { setTrue: handleShowCover, setFalse: handleHideCover }] = useBoolean(false)
	const [picSrc, setPicSrc] = React.useState(defaultArticleBg)

	const handleAddPic = useCallback(
		async formData => {
			if (!formData) return
			formData.append('userId', userId)
			try {
				const remotePicUrl = await fileApi.uploadImage(formData)
				setPicSrc(remotePicUrl)
				return remotePicUrl
			} catch (err) {
				console.error(`图片上传失败 ${err}`)
				msg.error(t('error.upload'))
			}
		},
		[t, userId]
	)

	const handleClose = useCallback(() => {
		dispatch(modalAction.updateModal(false, null))
	}, [dispatch])

	const handleAddArticle = useCallback(
		async values => {
			const { pic, sort, title, introduce } = values
			const articleDetail = {
				content,
				sort,
				title,
				introduce,
				backgroundImage: pic,
				creationTime: dayjs().valueOf()
			}
			try {
				await articleApi.addArticle(userId, articleDetail)
				handleClose()
				msg.success(t('success.add'))
			} catch (err) {
				console.error('添加文章失败', err)
				msg.error(t('error.add'))
			}
		},
		[content, handleClose, t, userId]
	)

	const formItems = [
		{
			name: 'pic',
			initialValue: picSrc,
			component: (
				<Uploader className={style.center_box} action={handleAddPic}>
					<div className={style.pic_wrapper} onMouseEnter={handleShowCover} onMouseLeave={handleHideCover}>
						<div className={style.pic_cover}>
							<AddToPhotosIcon size={30} color={visible ? '#fff' : 'transparent'} />
						</div>
						<img className={style.title_pic} src={picSrc} alt="" />
					</div>
				</Uploader>
			)
		},
		{
			name: 'title',
			initialValue: '',
			rules: [
				{
					async validator(value) {
						if (value.length < 6 || value.length > 36) {
							return Promise.reject(t('article_publish.rule.title_length_limit'))
						}
					}
				}
			],
			component: <Input color={theme} placeholder={t('article_publish.title')} />
		},
		{
			name: 'sort',
			initialValue: 'frontend',
			component: (
				<Select color={theme} description={t('article_publish.sort')}>
					<Select.Option value="frontend">{t('sort.frontend')}</Select.Option>
					<Select.Option value="backend">{t('sort.backend')}</Select.Option>
					<Select.Option value="mobile">{t('sort.mobile')}</Select.Option>
					<Select.Option value="computer_science">{t('sort.computer_science')}</Select.Option>
					<Select.Option value="engineering">{t('sort.engineering')}</Select.Option>
				</Select>
			)
		},
		{
			name: 'introduce',
			initialValue: '',
			rules: [
				{
					async validator(value) {
						if (value.length > 150) {
							return Promise.reject(t('article_publish.rule.introduce_length_limit'))
						}
					}
				}
			],
			component: <Input.Textarea color={theme} placeholder={t('article_publish.introduce')} />
		}
	]

	return (
		<div className={style.article_info}>
			<h1>{t('article_publish.add_article')}</h1>
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
						{t('article_publish.publish')}
					</Button>
				</div>
			</Form>
		</div>
	)
}
