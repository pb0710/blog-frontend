import React from 'react'
import style from '../style/index.module.scss'
import { Form, Input, Button, Switch, Loading } from 'sylas-react-ui'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import * as userApi from '@/apis/user'
import * as commonAction from '@/store/actions'
import * as action from '../store/action'

export default function Login(props) {
  const dispatch = useDispatch()
  const form = Form.useForm()

  const handleClose = () => {
    dispatch(action.updateModalVisible(false))
  }

  const handleSubmit = values => {
    console.log('values: ', values)
    const { username, password } = values
    if (!username || !password) return
    dispatch(commonAction.userLogin({ username, password }))
  }

  return (
    <div className={style.login_wrapper}>
      <Button.Icon className={style.close} onClick={handleClose}>
        <ArrowLeftOutlined />
      </Button.Icon>
      <div className={style.avatar_wrapper}>
        <img />
        {/* <Loading.Bounce /> */}
      </div>
      <Form form={form} onFinished={handleSubmit}>
        <Form.Item label="用户名" name="username">
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input.Password placeholder="密码" />
        </Form.Item>
        <div className={style.footer}>
          <span className={style.register}>立即注册</span>
          <Button htmlType="submit" color="primary">
            确认登录
          </Button>
        </div>
      </Form>
    </div>
  )
}
