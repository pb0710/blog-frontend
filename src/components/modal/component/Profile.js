import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '../style/index.module.scss'
import { Button, Form, Input, Select } from 'sylas-react-ui'
import CloseIcon from 'mdi-react/CloseIcon'
import ArrowBackIcon from 'mdi-react/ArrowBackIcon'
import UserIcon from 'mdi-react/UserIcon'
import CheckCircleIcon from 'mdi-react/CheckCircleIcon'
import * as action from '../store/action'
import * as commonAction from '@/store/actions'
import * as fileApi from '@/apis/file'
import Register from './Register'
import { useBoolean } from '@/utils/hooks'
import { Uploader } from '@/components/base'
import defaultAvatar from '@/assets/images/default_avatar1.jpg'
import { msg } from '@/components/base'

export default function Profile(props) {
	const { account } = props

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
			console.error(`图片上传失败——${err}`)
			msg.error(err)
		}
	}

	return (
		<div className={style.profile_wrapper}>
			<h1>完善个人资料</h1>
			<Button.Icon className={style.return} onClick={handleReturn}>
				<ArrowBackIcon size={20} />
			</Button.Icon>
			<Button.Icon className={style.close} onClick={handleClose}>
				<CloseIcon size={20} />
			</Button.Icon>
			<Uploader onChange={handleAddAvatar}>
				<div className={style.avatar_wrapper}>
					<img alt="" src={avatarSrc} />
					<div className={style.upload_cover} onMouseEnter={handleShowUpload} onMouseLeave={handleHideUpload}>
						<UserIcon size={30} color={visible ? '#fff' : 'transparent'} />
					</div>
				</div>
			</Uploader>
			<Form onFinsh={handleRegister}>
				<Form.Item
					name="nickname"
					rules={[
						{
							async validator(value) {
								if (value.length < 4) {
									return Promise.reject('昵称长度不能少于 4 位！')
								}
							}
						}
					]}
				>
					<Input color={theme} placeholder="昵称" initialValue="" />
				</Form.Item>
				<Form.Item name="gender" initialValue="male">
					<Select color={theme}>
						<Select.Option value="male">男</Select.Option>
						<Select.Option value="female">女</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item name="selfIntroduction" initialValue="">
					<Input.Textarea color={theme} placeholder="个人简介" />
				</Form.Item>
				<div className={style.footer_bar}>
					<Button className={style.complete} type="submit" color={theme} suffixes={<CheckCircleIcon size={20} />}>
						完成
					</Button>
				</div>
			</Form>
		</div>
	)
}
