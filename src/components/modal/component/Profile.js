import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '../style/index.module.scss'
import { Button, Form, Input } from 'sylas-react-ui'
import { ArrowLeftOutlined, UserAddOutlined } from '@ant-design/icons'
import * as action from '../store/action'
import * as commonAction from '@/store/actions'
import Register from './Register'

export default function Profile(props) {
  const { account } = props

  const dispatch = useDispatch()
  const { online } = useSelector(state => state)

  const [show, setShow] = React.useState(false)

  const handleReturn = () => {
    dispatch(action.updateModalContent(<Register />))
  }

  const handleShowUpload = () => {
    setShow(true)
  }

  const handleHideUpload = () => {
    setShow(false)
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

  return (
    <div className={style.profile_wrapper}>
      <h1>完善个人信息</h1>
      <Button.Icon className={style.close} onClick={handleReturn}>
        <ArrowLeftOutlined />
      </Button.Icon>
      <div
        className={style.avatar_wrapper}
        onMouseEnter={handleShowUpload}
        onMouseLeave={handleHideUpload}
      >
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3zmPVUxq5RLPmklOaGEL6Txo6L6hw3guQeQ&usqp=CAU" />
        {show && (
          <div className={style.upload_mask}>
            <UserAddOutlined />
          </div>
        )}
      </div>
      <Form onFinished={handleRegister}>
        <Form.Item label="昵称" name="nickname">
          <Input placeholder="数字、字母或中文字符" />
        </Form.Item>
        <Button htmlType="submit" color="primary">
          去登陆
        </Button>
      </Form>
    </div>
  )
}
