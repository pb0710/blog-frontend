import React from 'react'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import style from '../style/index.module.scss'
import * as action from '../store/action'

export default function Prompt() {
	const dispatch = useDispatch()
	const { promptVisible, promptContent } = useSelector(state => state.global)
	const timer = React.useRef(null)

	const handleHide = () => {
		dispatch(action.updatePromptVisible(false))
	}

	React.useEffect(() => {
		if (promptVisible) {
			timer.current = setTimeout(() => {
				dispatch(action.updatePromptVisible(false))
			}, 3000)
		}
		return () => {
			clearTimeout(timer.current)
		}
	}, [dispatch, promptVisible])

	const promptWrapperCls = clsx(style.prompt_wrapper, promptVisible && style.slide_in)

	return (
		<div className={promptWrapperCls} onClick={handleHide}>
			{promptContent}
		</div>
	)
}
