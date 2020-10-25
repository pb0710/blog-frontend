import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '../style/index.module.scss'
import { Button, Form, Input, Select } from 'sylas-react-ui'
import { PersonAddOutlined, ArrowBackOutlined, CloseOutlined } from '@material-ui/icons'
import * as action from '../store/action'
import * as commonAction from '@/store/actions'
import * as fileApi from '@/apis/file'
import Register from './Register'
import { useBoolean } from '@/utils/hooks'
import { Uploader } from '@/components/base'
import defaultAvatar from '@/assets/images/default_avatar1.jpg'
import { message } from '@/components/global'

export default function Profile(props) {
	const { account } = props

	const dispatch = useDispatch()
	const { online } = useSelector(state => state)
	const [avatarSrc, setAvatarSrc] = React.useState(defaultAvatar)
	const [visible, { setTrue: handleShowUpload, setFalse: handleHideUpload }] = useBoolean(false)

	const handleReturn = () => {
		dispatch(action.updateModalContent(<Register />))
	}

	const handleClose = () => {
		dispatch(action.updateModalVisible(false))
		dispatch(action.updateModalContent(null))
	}

	const handleRegister = values => {
		if (!values.nickname || !account) {
			return
		}
		const userInfo = {
			username: account.username,
			password: account.password,
			profile: {
				nickname: values.nickname
			}
		}
		dispatch(commonAction.userRegister(userInfo))
		if (online) {
			dispatch(action.updateModalVisible(false))
			dispatch(action.updateModalContent(null))
		}
	}

	const handleAddAvatar = async formData => {
		try {
			const { message, payload: remotePicUrl } = await fileApi.uploadImage(formData)
			if (message === 'ok') {
				setAvatarSrc(remotePicUrl)
			}
		} catch (err) {
			console.error(`图片上传失败——${err}`)
			message.error(err)
		}
	}

	return (
		<div className={style.profile_wrapper}>
			<h1>完善个人信息</h1>
			<Button.Icon className={style.return} onClick={handleReturn}>
				<ArrowBackOutlined />
			</Button.Icon>
			<Button.Icon className={style.close} onClick={handleClose}>
				<CloseOutlined />
			</Button.Icon>
			<Uploader onChange={handleAddAvatar}>
				<div className={style.avatar_wrapper} onMouseEnter={handleShowUpload} onMouseLeave={handleHideUpload}>
					<img alt="" src={avatarSrc} />
					{visible && (
						<div className={style.upload_cover}>
							<PersonAddOutlined />
						</div>
					)}
				</div>
			</Uploader>
			<Form onFinished={handleRegister}>
				<Form.Item label="名称" name="nickname">
					<Input placeholder="你的名字（必填）" />
				</Form.Item>
				<Form.Item label="性别" name="gender" initialValue="male">
					<Select>
						<Select.Option value="male">男</Select.Option>
						<Select.Option value="female">女</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item label="个人简介" name="selfIntroduction">
					<Input placeholder="技能、兴趣爱好（选填）" />
				</Form.Item>
				<Button htmlType="submit" color="primary">
					去登录
				</Button>
			</Form>
		</div>
	)
}
