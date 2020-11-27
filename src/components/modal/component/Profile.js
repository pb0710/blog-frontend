import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '../style/index.module.scss'
import { Button, Form, Input, Select, Uploader } from 'sylas-react-ui'
import CloseIcon from 'mdi-react/CloseIcon'
import ArrowBackIcon from 'mdi-react/ArrowBackIcon'
import UserIcon from 'mdi-react/UserIcon'
import CheckCircleIcon from 'mdi-react/CheckCircleIcon'
import * as action from '../store/action'
import * as commonAction from '@/store/actions'
import * as fileApi from '@/apis/file'
import Register from './Register'
import { useBoolean } from '@/utils/hooks'
import defaultAvatar from '@/assets/images/default_avatar1.jpg'
import { msg } from '@/components/base'
import { useTranslation } from 'react-i18next'

export default function Profile(props) {
	const { account } = props

	const { t } = useTranslation()
	const dispatch = useDispatch()
	const online = useSelector(state => state.online)
	const theme = useSelector(state => state.setting.theme)
	const [avatarSrc, setAvatarSrc] = React.useState(defaultAvatar)
	const [visible, { setTrue: handleShowUpload, setFalse: handleHideUpload }] = useBoolean(false)

	const handleReturn = () => {
		dispatch(action.updateModal(true, <Register />))
	}

	const handleClose = useCallback(() => {
		dispatch(action.updateModal(false, null))
	}, [dispatch])

	const handleRegister = useCallback(
		values => {
			if (!values || !account) return

			const userInfo = {
				username: account.username,
				password: account.password,
				profile: {
					avatar: avatarSrc,
					nickname: values.nickname,
					gender: values.gender,
					selfIntroduction: values.selfIntroduction
				}
			}
			dispatch(commonAction.userRegister(userInfo))
			if (online) {
				handleClose()
			}
		},
		[account, avatarSrc, dispatch, handleClose, online]
	)

	const handleAddAvatar = async formData => {
		try {
			const remotePicUrl = await fileApi.uploadImage(formData)
			setAvatarSrc(remotePicUrl)
		} catch (err) {
			console.error(`${t('error.upload')} ${err}`)
			msg.error(`${t('error.upload')} ${err}`)
		}
	}

	return (
		<div className={style.profile_wrapper}>
			<h1>{t('modal.profile.heading')}</h1>
			<Button.Icon className={style.return} onClick={handleReturn}>
				<ArrowBackIcon size={20} />
			</Button.Icon>
			<Button.Icon className={style.close} onClick={handleClose}>
				<CloseIcon size={20} />
			</Button.Icon>
			<Form onFinsh={handleRegister}>
				<Form.Item className={style.avatar_wrapper} name="avatar" initialValue={avatarSrc}>
					<Uploader action={handleAddAvatar}>
						<div className={style.avatar}>
							<img src={avatarSrc} alt="" />
							<div className={style.upload_cover} onMouseEnter={handleShowUpload} onMouseLeave={handleHideUpload}>
								<UserIcon size={30} color={visible ? '#fff' : 'transparent'} />
							</div>
						</div>
					</Uploader>
				</Form.Item>
				<Form.Item
					name="nickname"
					initialValue=""
					rules={[
						{
							async validator(value) {
								if (value.length < 4) {
									return Promise.reject(t('modal.profile.rule.nickname_length_limit'))
								}
							}
						}
					]}
				>
					<Input color={theme} placeholder={t('modal.profile.nickname')} />
				</Form.Item>
				<Form.Item name="gender" initialValue="male">
					<Select color={theme} description={t('modal.profile.gender')}>
						<Select.Option value="male">{t('modal.profile.male')}</Select.Option>
						<Select.Option value="female">{t('modal.profile.female')}</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item name="selfIntroduction" initialValue="">
					<Input.Textarea color={theme} placeholder={t('modal.profile.self_introduction')} />
				</Form.Item>
				<div className={style.footer_bar}>
					<Button className={style.complete} type="submit" color={theme} suffixes={<CheckCircleIcon size={20} />}>
						{t('modal.profile.complete')}
					</Button>
				</div>
			</Form>
		</div>
	)
}
