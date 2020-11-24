import React from 'react'
import style from '../style/index.module.scss'
import Options from './Options'
import { Input, Button, Select } from 'sylas-react-ui'
import defaultAvatar from '@/assets/images/default_avatar1.jpg'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { Uploader } from '@/components/base'
import FingerprintIcon from 'mdi-react/FingerprintIcon'
import PersonIcon from 'mdi-react/PersonIcon'
import FaceIcon from 'mdi-react/FaceIcon'
import WcIcon from 'mdi-react/WcIcon'
import ChatOutlineIcon from 'mdi-react/ChatOutlineIcon'
import * as fileApi from '@/apis/file'
import * as commonAction from '@/store/actions'
import { msg } from '@/components/base'

function Account() {
	const dispatch = useDispatch()
	const profile = useSelector(state => state.userProfile)
	const theme = useSelector(state => state.setting.theme)
	const { username, nickname, avatar, gender, selfIntroduction } = profile

	const handleChangeAvatar = React.useCallback(
		async formData => {
			formData.append('userId', profile.userId)
			try {
				const avatar = await fileApi.uploadImage(formData)
				dispatch(
					commonAction.updateUserProfile({
						...profile,
						avatar
					})
				)
			} catch (err) {
				msg.error('图片上传失败')
			}
		},
		[dispatch, profile]
	)

	const handleLogout = () => {
		dispatch(commonAction.userLogout())
	}

	const usernameOptCls = clsx(style.option, style.username_wrapper)
	const avatarOptCls = clsx(style.option, style.avatar_wrapper)
	const btnCls = style[`btn_${theme}`]

	const accountOpts = [
		{
			icon: <FingerprintIcon size={20} />,
			title: '用户名',
			component: (
				<div className={usernameOptCls}>
					<span>{username ?? '尚未登录...'}</span>
					<Button className={btnCls} light color={theme} onClick={handleLogout}>
						退出
					</Button>
				</div>
			)
		},
		{
			icon: <PersonIcon size={20} />,
			title: '昵称',
			name: 'nickname',
			initialValue: nickname,
			rules: [
				{
					async validator(value) {
						if (value.length < 4) {
							return Promise.reject('昵称长度不能少于 4 位！')
						}
					}
				}
			],
			component: <Input color={theme} placeholder="你的名字" />
		},
		{
			icon: <FaceIcon size={20} />,
			title: '头像',
			component: (
				<div className={avatarOptCls}>
					<img alt="" src={avatar ?? defaultAvatar} />
					<Uploader onChange={handleChangeAvatar}>
						<Button className={btnCls} light color={theme}>
							更换
						</Button>
					</Uploader>
				</div>
			)
		},
		{
			icon: <WcIcon size={20} />,
			title: '性别',
			name: 'gender',
			initialValue: gender,
			component: (
				<Select color={theme}>
					<Select.Option value="male">男</Select.Option>
					<Select.Option value="female">女</Select.Option>
				</Select>
			)
		},
		{
			icon: <ChatOutlineIcon size={20} />,
			title: '个人简介',
			name: 'selfIntroduction',
			initialValue: selfIntroduction,
			component: <Input.Textarea color={theme} placeholder="技能、兴趣爱好" style={{ resize: 'none' }} />
		}
	]
	return <Options className={style.account} heading="用户资料" opts={accountOpts} />
}

export default Account
