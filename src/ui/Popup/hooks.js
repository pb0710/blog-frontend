import React from 'react'
import { judgeElementContains } from '../utils'

/**
 * 弹出窗展示状态
 * @param {object} options
 * 	@param {boolean} blurHide 点击Popup外区域是否移出
 * 	@param {boolean} clickPopupHide 点击Popup内容是否移出
 * 	@param {boolean} clickTriggerHide 再次点击触发Popup的按钮，Popup是否移出
 */
export default function usePopupVisible({ clickPopupHide = false, blurHide = true } = {}) {
	const triggerRef = React.useRef()
	const popupRef = React.useRef()
	const [visible, setVisible] = React.useState(false)

	// 展示Popup
	const handleShowPopup = React.useCallback(() => {
		setVisible(true)
	}, [])

	// 移出Popup（事件对象 e 必传）
	const handleHidePopup = React.useCallback(e => {
		// 阻止冒泡，防止触发handlePopupBlur
		e?.nativeEvent && e.nativeEvent.stopImmediatePropagation()
		setVisible(false)
	}, [])

	// 点击document，对popup展示状态的处理
	const handlePopupBlur = React.useCallback(
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

	React.useEffect(() => {
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
