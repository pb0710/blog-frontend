import { useRef, useState, useContext, useEffect, useCallback, useMemo } from 'react'

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

		muted
			? document.removeEventListener('click', getPageXY)
			: document.addEventListener('click', getPageXY)

		return () => {
			document.removeEventListener('click', getPageXY)
		}
	}, [muted])

	return { x, y }
}

// 获取该组件渲染次数
export function useRenderCount() {
	const count = useRef(0)

	useEffect(() => {
		count.current++
	})
	return count.current
}
