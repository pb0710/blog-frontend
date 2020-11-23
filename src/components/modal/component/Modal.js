import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '../style/index.module.scss'
import * as action from '../store/action'
import { Popup } from 'sylas-react-ui'

export default function Modal(props) {
	const { allowClose } = props
	const dispatch = useDispatch()
	const { visible, content } = useSelector(state => state.modal)

	const handleClose = () => {
		if (allowClose) {
			dispatch(action.updateModal(false, null))
		}
	}

	return (
		visible && (
			<div className={style.modal_wrapper}>
				<div className={style.mask} onClick={handleClose}></div>
				<Popup className={style.content} visible={visible}>
					{content}
				</Popup>
			</div>
		)
	)
}
