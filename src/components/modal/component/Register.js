import React from 'react'
import { useDispatch } from 'react-redux'
import style from '../style/index.module.scss'
import { Button, Form, Input } from 'sylas-react-ui'
import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons'
import * as action from '../store/action'
import * as commonAction from '@/store/actions'
import Login from './Login'
import Profile from './Profile'

export default function Register() {
  const dispatch = useDispatch()

  const handleReturn = () => {
    dispatch(action.updateModalContent(<Login />))
  }

  const handleClose = () => {
    dispatch(action.updateModalVisible(false))
    dispatch(action.updateModalContent(null))
  }

  const handleCreateAccount = values => {
    const { username, password } = values

    // if (!username || !password) return //TODO:

    const account = { username, password }
    dispatch(action.updateModalContent(<Profile account={account} />))
  }

  return (
    <div className={style.register_wrapper}>
      <h1>创建账号</h1>
      <Button.Icon className={style.return} onClick={handleReturn}>
        <ArrowLeftOutlined />
      </Button.Icon>
      <Button.Icon className={style.close} onClick={handleClose}>
        <CloseOutlined />
      </Button.Icon>
      <div className={style.header}></div>
      <Form onFinished={handleCreateAccount}>
        <Form.Item label="用户名" name="username">
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input placeholder="密码" />
        </Form.Item>
        <Form.Item label="确认密码" name="password_confirm">
          <Input placeholder="再输一次" />
        </Form.Item>
        <div className={style.footer_bar}>
          <Button color="default" htmlType="submit">
            下一步
          </Button>
        </div>
      </Form>
    </div>
  )
}
