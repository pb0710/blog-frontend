import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '../style/index.module.scss'
import { Button, Form, Input } from 'sylas-react-ui'
import { CloseOutlined, ArrowLeftOutlined, UserAddOutlined } from '@ant-design/icons'
import * as action from '../store/action'
import * as commonAction from '@/store/actions'
import * as fileApi from '@/apis/file'
import Register from './Register'
import { useBoolean } from '@/utils/hooks'
import { Uploader } from '@/components/base'

export default function Profile(props) {
	const { account } = props

	const dispatch = useDispatch()
	const { online } = useSelector(state => state)
	const [avatarSrc, setAvatarSrc] = React.useState(
		'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3zmPVUxq5RLPmklOaGEL6Txo6L6hw3guQeQ&usqp=CAU'
	)
	const { state: visible, setTrue: handleShowUpload, setFalse: handleHideUpload } = useBoolean(false)

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
		}
	}

	return (
		<div className={style.profile_wrapper}>
			<h1>完善个人信息</h1>
			<Button.Icon className={style.return} onClick={handleReturn}>
				<ArrowLeftOutlined />
			</Button.Icon>
			<Button.Icon className={style.close} onClick={handleClose}>
				<CloseOutlined />
			</Button.Icon>
			<Uploader format="formdata" onChange={handleAddAvatar}>
				<div className={style.avatar_wrapper} onMouseEnter={handleShowUpload} onMouseLeave={handleHideUpload}>
					<img alt="avatar" src={avatarSrc} />
					{visible && (
						<div className={style.upload_cover}>
							<UserAddOutlined />
						</div>
					)}
				</div>
			</Uploader>
			<Form onFinished={handleRegister}>
				<Form.Item label="昵称" name="nickname">
					<Input placeholder="数字、字母或中文字符" />
				</Form.Item>
				<Button htmlType="submit" color="primary">
					去登录
				</Button>
			</Form>
		</div>
	)
}
