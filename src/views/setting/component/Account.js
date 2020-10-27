import React from 'react'
import style from '../style/index.module.scss'
import Options from './Options'
import { Input, Button, Select } from 'sylas-react-ui'
import defaultAvatar from '@/assets/images/default_avatar1.jpg'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { Uploader } from '@/components/base'
import { Fingerprint, EmojiPeople, Face, Wc, DescriptionOutlined, SwapHoriz } from '@material-ui/icons'
import * as fileApi from '@/apis/file'
import { msg } from '@/components/base'
import * as commonAction from '@/store/actions'

function Account() {
	const dispatch = useDispatch()
	const profile = useSelector(state => state.userProfile)
	const { username, nickname, avatar } = profile

	const handleChangeAvatar = React.useCallback(
		async formData => {
			formData.append('userId', profile.userId)
			try {
				const { message, payload } = await fileApi.uploadImage(formData)
				if (message === 'ok') {
					return dispatch(
						commonAction.updateUserProfile({
							...profile,
							avatar: payload
						})
					)
				}
				throw message
			} catch (err) {
				msg.error('图片上传失败')
			}
		},
		[dispatch, profile]
	)

	const avatarOptCls = clsx(style.option, style.avatar_wrapper)
	const accountOpts = [
		{
			icon: <Fingerprint />,
			title: '用户名',
			component: <div className={style.option}>{username ?? '尚未登录...'}</div>
		},
		{
			itemCls: style.profile,
			icon: <Face />,
			title: '头像',
			component: (
				<div className={avatarOptCls}>
					<img alt="" src={avatar ?? defaultAvatar} />
					<Uploader onChange={handleChangeAvatar}>
						<Button color="primary">
							<SwapHoriz />
							更换
						</Button>
					</Uploader>
				</div>
			)
		},
		{
			icon: <EmojiPeople />,
			title: '昵称',
			name: 'nickname',
			initialValue: nickname,
			component: <Input placeholder="你的名字（必填）" />
		},
		{
			icon: <Wc />,
			title: '性别',
			name: 'gender',
			initialValue: 'male',
			component: (
				<Select>
					<Select.Option value="male">男</Select.Option>
					<Select.Option value="female">女</Select.Option>
				</Select>
			)
		},
		{
			icon: <DescriptionOutlined />,
			title: '个人简介',
			name: 'selfIntroduction',
			initialValue: '',
			component: <Input placeholder="技能、兴趣爱好（选填）" />
		}
	]
	return <Options className={style.account} heading="用户资料" opts={accountOpts} />
}

export default Account
