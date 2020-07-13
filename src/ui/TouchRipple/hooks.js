import React from 'react'

/**
 * 绑定水波纹特效
 * @param {boolean} muted 是否禁用
 */
export default function useRipple(muted) {
	const rippleRef = React.useRef()

	const handleStart = React.useCallback(e => (muted ? null : rippleRef.current.start(e)), [muted])

	const handleStop = React.useCallback(() => (muted ? null : rippleRef.current.stop()), [muted])

	return { rippleRef, handleStart, handleStop }
}
