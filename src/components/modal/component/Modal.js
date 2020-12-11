import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '../style/index.module.scss'
import { updateModal } from '../store/action'
import { Popup } from 'sylas-react-ui'
import { Mask } from '@/components/base'

export default function Modal(props) {
	const { allowClose } = props
	const dispatch = useDispatch()
	const { visible, content } = useSelector(state => state.modal)

	const handleClose = () => {
		if (allowClose) {
			dispatch(updateModal(false, null))
		}
	}

	return (
		visible && (
			<>
				<Mask onClick={handleClose} />
				<div className={style.modal_wrapper}>
					<Popup className={style.content} visible={visible}>
						{content}
					</Popup>
				</div>
			</>
		)
	)
}
