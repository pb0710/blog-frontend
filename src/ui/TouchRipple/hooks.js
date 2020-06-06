import { useCallback, useRef } from 'react'

/**
 * 绑定水波纹特效
 * @param {boolean} muted 是否禁用
 */
export default function useRipple(muted) {
	const rippleRef = useRef()

	const handleStart = useCallback(e => (muted ? null : rippleRef.current.start(e)), [muted])

	const handleStop = useCallback(() => (muted ? null : rippleRef.current.stop()), [muted])

	return { rippleRef, handleStart, handleStop }
}
