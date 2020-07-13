import React from 'react'

/**
 * Boolean State
 * @param {boolean} defaultValue 默认值
 */
export function useBoolean(defaultValue) {
	const [boolean, setBoolean] = React.useState(defaultValue)

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
	const [x, setX] = React.useState()
	const [y, setY] = React.useState()

	React.useEffect(() => {
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
	const count = React.useRef(0)

	React.useEffect(() => {
		count.current++
	})
	return count.current
}
