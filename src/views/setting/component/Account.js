import React from 'react'
import style from '../style/index.module.scss'
import Options from './Options'
import { Input, Button, Select } from 'sylas-react-ui'
import defaultAvatar from '@/assets/images/default_avatar1.jpg'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { Uploader } from '@/components/base'
import { Fingerprint, EmojiPeople, Face, Wc, DescriptionOutlined, ExitToApp } from '@material-ui/icons'
import * as fileApi from '@/apis/file'
import * as commonAction from '@/store/actions'
import { msg } from '@/components/base'

function Account() {
	const dispatch = useDispatch()
	const online = useSelector(state => state.online)
	const profile = useSelector(state => state.userProfile)
	const theme = useSelector(state => state.setting.theme)
	const { username, nickname, avatar } = profile

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

	const usernameOptCls = clsx(style.option, style[`username_wrapper_${theme}`])
	const avatarOptCls = clsx(style.option, style.avatar_wrapper)

	const accountOpts = [
		{
			icon: <Fingerprint />,
			title: '用户名',
			component: (
				<div className={usernameOptCls}>
					<span>{username ?? '尚未登录...'}</span>
					<Button onClick={handleLogout}>退出</Button>
				</div>
			)
		},
		{
			icon: <EmojiPeople />,
			title: '昵称',
			name: 'nickname',
			initialValue: nickname,
			component: <Input color={theme} placeholder="你的名字（必填）" />
		},
		{
			itemCls: style.profile,
			icon: <Face />,
			title: '头像',
			component: (
				<div className={avatarOptCls}>
					<img alt="" src={avatar ?? defaultAvatar} />
					<Uploader onChange={handleChangeAvatar}>
						<Button color={theme}>更换</Button>
					</Uploader>
				</div>
			)
		},
		{
			icon: <Wc />,
			title: '性别',
			name: 'gender',
			initialValue: 'male',
			component: (
				<Select>
					<Select.Option color={theme} value="male">
						男
					</Select.Option>
					<Select.Option color={theme} value="female">
						女
					</Select.Option>
				</Select>
			)
		},
		{
			icon: <DescriptionOutlined />,
			title: '个人简介',
			name: 'selfIntroduction',
			initialValue: '',
			component: <Input color={theme} placeholder="技能、兴趣爱好（选填）" />
		}
	]
	return online && <Options className={style.account} heading="用户资料" opts={accountOpts} />
}

export default Account
