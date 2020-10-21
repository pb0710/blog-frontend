import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '../style/index.module.scss'
import * as action from '../store/action'

export default function Modal(props) {
	const { allowClose } = props
	const dispatch = useDispatch()
	const { modalVisible, modalContent } = useSelector(state => state.global)

	const handleClose = () => {
		if (allowClose) {
			dispatch(action.updateModalVisible(false))
			dispatch(action.updateModalContent(null))
		}
	}

	return (
		modalVisible && (
			<div className={style.modal_wrapper}>
				<div className={style.mask} onClick={handleClose}></div>
				{modalContent}
			</div>
		)
	)
}
