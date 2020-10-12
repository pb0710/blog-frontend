import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '../style/index.module.scss'
import * as action from '../store/action'

export default function Modal() {
  const dispatch = useDispatch()
  const { content } = useSelector(state => state.modal)

  const handleClose = () => {
    if (false) {
      dispatch(action.updateModalVisible(false))
      dispatch(action.updateModalContent(null))
    }
  }

  return (
    <div className={style.modal_wrapper}>
      <div className={style.mask} onClick={handleClose}></div>
      {content}
    </div>
  )
}
