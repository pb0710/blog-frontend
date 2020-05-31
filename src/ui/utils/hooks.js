import { useRef, useState, useContext, useEffect, useCallback, useMemo } from 'react'
import { judgeElementContains } from '../utils'

/**
 * 绑定水波纹特效
 * @param {boolean} muted 是否禁用
 */
export function useRipple(muted) {
	const rippleRef = useRef()

	const handleStart = useCallback(e => (muted ? null : rippleRef.current.start(e)), [muted])

	const handleStop = useCallback(() => (muted ? null : rippleRef.current.stop()), [muted])

	return { rippleRef, handleStart, handleStop }
}

/**
 * Boolean State
 * @param {boolean} defaultValue 默认值
 */
export function useBoolean(defaultValue) {
	const [boolean, setBoolean] = useState(defaultValue)

	const setTrue = () => {
		setBoolean(true)
	}
	const setFalse = () => {
		setBoolean(false)
	}
	const toggleBoolean = () => {
		setBoolean(prev => !prev)
	}

	return { boolean, setTrue, setFalse, toggleBoolean }
}

/**
 * 获取点击的XY坐标
 * @param {boolean} muted 禁用状态
 */
export function useCoordinate(muted) {
	const [x, setX] = useState()
	const [y, setY] = useState()

	useEffect(() => {
		const getPageXY = e => {
			setX(e.clientX)
			setY(e.clientY)
		}

		muted ? document.removeEventListener('click', getPageXY) : document.addEventListener('click', getPageXY)

		return () => {
			document.removeEventListener('click', getPageXY)
		}
	}, [muted])

	return { x, y }
}

// 获取组件渲染次数
export function useRenderCount() {
	const count = useRef(0)

	useEffect(() => {
		count.current++
	})
	return count.current
}

/**
 * 弹出窗展示状态
 * @param {object} options
 * 	@param {boolean} blurHide 点击Popup外区域是否移出
 * 	@param {boolean} clickPopupHide 点击Popup内容是否移出
 * 	@param {boolean} clickTriggerHide 再次点击触发Popup的按钮，Popup是否移出
 */
export function usePopupVisible({ clickPopupHide = false, blurHide = true } = {}) {
	const triggerRef = useRef()
	const popupRef = useRef()
	const [visible, setVisible] = useState(false)

	// 展示Popup
	const handleShowPopup = useCallback(() => {
		setVisible(true)
	}, [])

	// 移出Popup（事件对象 e 必传）
	const handleHidePopup = useCallback(e => {
		// 阻止冒泡，防止触发handlePopupBlur
		e?.nativeEvent && e.nativeEvent.stopImmediatePropagation()
		setVisible(false)
	}, [])

	// 点击document，对popup展示状态的处理
	const handlePopupBlur = useCallback(
		e => {
			const targetElement = e.target
			let nextVisible = true

			if (clickPopupHide) {
				nextVisible = false
			} else if (popupRef.current) {
				// 点击Popup及其子元素 不移出
				const popupElement = popupRef.current
				nextVisible = judgeElementContains(popupElement, targetElement)
			}
			// 点击触发Popup的元素及其子元素 不移出
			if (triggerRef.current) {
				const triggerElement = triggerRef.current
				if (judgeElementContains(triggerElement, targetElement)) {
					nextVisible = true
				}
			}
			setVisible(nextVisible)
		},
		[clickPopupHide]
	)

	useEffect(() => {
		if (blurHide) {
			// 全局绑定Popup 失焦事件
			visible && document.addEventListener('click', handlePopupBlur)
			return () => {
				document.removeEventListener('click', handlePopupBlur)
			}
		}
	}, [visible, blurHide, handlePopupBlur])

	return { triggerRef, popupRef, visible, handleShowPopup, handleHidePopup }
}
