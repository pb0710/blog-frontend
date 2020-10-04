import React from 'react'
import style from '../style/index.module.scss'
import Login from './Login'

export default function Modal(props) {
  const { children } = props
  return (
    <div className={style.modal_wrapper}>
      <Login />
    </div>
  )
}
