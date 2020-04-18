import { useRef, useState, useContext, useEffect, useCallback, useMemo } from 'react'

/**
 * 绑定水波纹特效
 */
export function useRipple() {
	const ref = useRef()

	const handleStart = e => ref.current.start(e)

	const handleStop = () => ref.current.stop()

	return { ref, handleStart, handleStop }
}

/**
 * 获取点击的XY坐标
 * @param {boolean} visible 禁用状态
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