import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { throttle } from 'utils'

/**
 * promise批量转换resource
 * @param  {...promise} promises
 */
export function useSuspense(...promises) {
	const wrapPromise = React.useCallback(promise => {
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

	return React.useCallback(
		promises.map(promise => wrapPromise(promise)),
		[]
	)
}

/**
 * 维护一个Boolean
 */
export function useBoolean() {
	const [boolean, setBoolean] = React.useState(false)

	const setTrue = React.useCallback(() => setBoolean(true), [])
	const setFalse = React.useCallback(() => setBoolean(false), [])
	const toggleBoolean = React.useCallback(() => setBoolean(prev => !prev), [])

	return { boolean, setTrue, setFalse, toggleBoolean }
}

/**
 * 监听鼠标滚轮
 * @param {object} options
 */
export function useMouseWheel({ throttleInterval } = {}) {
	const [down, setDown] = React.useState(false)

	const handleMouseWheel = React.useCallback(
		throttle(e => setDown(e.wheelDelta < 0), throttleInterval),
		[throttleInterval]
	)

	React.useEffect(() => {
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
	const [pending, setPending] = React.useState(false)
	const [value, setValue] = React.useState(null)
	const [error, setError] = React.useState(null)

	const execute = React.useCallback(() => {
		setPending(true)
		setValue(null)
		setError(null)
		return promise()
			.then(response => setValue(response))
			.catch(error => setError(error))
			.finally(() => setPending(false))
	}, [promise])

	React.useEffect(() => {
		if (immediate) {
			execute()
		}
	}, [execute, immediate])

	return { execute, pending, value, error }
}
