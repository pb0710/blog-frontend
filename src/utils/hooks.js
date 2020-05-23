import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { throttle } from 'utils'

/**
 * promise批量转换resource
 * @param  {...promise} promises
 */
export function useSuspense(...promises) {
	const wrapPromise = useCallback(promise => {
		let status = 'pending'
		let result
		let suspenser = promise.then(
			value => {
				status = 'resolved'
				result = value
			},
			error => {
				status = 'rejected'
				result = error
			}
		)

		return {
			read() {
				if (status === 'pending') {
					throw suspenser
				} else if (status === 'rejected') {
					throw result
				} else if (status === 'resolved') {
					return result
				}
			}
		}
	}, [])

	return useCallback(
		promises.map(promise => wrapPromise(promise)),
		[]
	)
}

/**
 * 维护一个Boolean
 */
export function useBoolean() {
	const [boolean, setBoolean] = useState(false)

	const setTrue = useCallback(() => setBoolean(true), [])
	const setFalse = useCallback(() => setBoolean(false), [])
	const toggleBoolean = useCallback(() => setBoolean(prev => !prev), [])

	return { boolean, setTrue, setFalse, toggleBoolean }
}

/**
 * 监听鼠标滚轮
 * @param {object} options
 */
export function useMouseWheel({ throttleInterval } = {}) {
	const [down, setDown] = useState(false)

	const handleMouseWheel = useCallback(
		throttle(e => setDown(e.wheelDelta < 0), throttleInterval),
		[throttleInterval]
	)

	useEffect(() => {
		document.addEventListener('mousewheel', handleMouseWheel)
		return () => {
			document.removeEventListener('mousewheel', handleMouseWheel)
		}
	}, [])

	return { down, up: !down }
}

/**
 * 请求接口（维护pending）
 * @param {promise} promise api promise
 * @param {boolean} immediate 是否立即执行
 */
export function useAsync(promise, immediate = true) {
	const [pending, setPending] = useState(false)
	const [value, setValue] = useState(null)
	const [error, setError] = useState(null)

	const execute = useCallback(() => {
		setPending(true)
		setValue(null)
		setError(null)
		return promise()
			.then(response => setValue(response))
			.catch(error => setError(error))
			.finally(() => setPending(false))
	}, [promise])

	useEffect(() => {
		if (immediate) {
			execute()
		}
	}, [execute, immediate])

	return { execute, pending, value, error }
}

/**
 * 弹出窗展示状态
 */
export function usePopupVisible() {
	const ref = useRef()
	const [visible, setVisible] = useState(false)

	const handleHidePopup = useCallback(() => {
		setVisible(false)
	}, [])

	const handleShowPopup = useCallback(() => {
		setVisible(true)
	}, [])

	const handleBindPopup = useCallback(e => {
		setVisible(true)
		if (ref.current) {
			const targetElement = e.target
			const element = ref.current
			if (!(targetElement === element || element.contains(targetElement))) {
				setVisible(false)
			}
		}
	}, [])

	useEffect(() => {
		visible
			? document.addEventListener('click', handleBindPopup)
			: document.removeEventListener('click', handleBindPopup)
		return () => {
			document.removeEventListener('click', handleBindPopup)
		}
	}, [visible])

	return { ref, visible, handleBindPopup, handleShowPopup, handleHidePopup }
}
