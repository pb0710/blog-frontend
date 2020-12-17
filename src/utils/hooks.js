import { useState, useEffect, useCallback, useMemo, useRef } from 'react'

/**
 * boolean hook
 * @param {Boolean} initial 默认值
 */
export function useBoolean(initial) {
	const [state, setState] = useState(initial)
	const setTrue = () => {
		setState(true)
	}
	const setFalse = () => {
		setState(false)
	}
	const toggle = () => {
		setState(prev => !prev)
	}
	return [state, { setTrue, setFalse, toggle }]
}

/**
 * 异步请求hook
 * @param {Promise} promiseApi 异步请求函数
 * @param {Object} options
 *  @param {*} initialData 默认值
 *  @param {Boolean} ready 是否可以请求
 *  @param {Array} params 默认请求参数
 *  @param {Array} refreshDeps 重新请求依赖项
 */
export function useFetch(promiseApi, { initialData, params = [], ready = true, refreshDeps = [] }) {
	const [data, setData] = useState(initialData)
	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)

	const initialize = useRef(initialData).current // 初始数据不可变
	let paramsRef = useRef(params)
	useEffect(() => {
		paramsRef.current = params
	}, [params])

	const excute = useCallback(
		(...args) => {
			setLoading(true)
			setData(initialize)
			setError()
			promiseApi(...args)
				.then(res => setData(res))
				.catch(err => setError(err))
				.finally(() => setLoading(false))
		},
		[initialize, promiseApi]
	)

	useEffect(
		() => {
			if (ready) {
				excute(...paramsRef.current)
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[excute, ready, ...refreshDeps]
	)

	return { data, error, loading, excute }
}

export const useMediaQuery = (query, whenTrue = true, whenFalse = false) => {
	if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') return whenFalse

	const mediaQuery = window.matchMedia(query)
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [match, setMatch] = useState(!!mediaQuery.matches)

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		const handler = () => setMatch(!!mediaQuery.matches)
		mediaQuery.addListener(handler)
		return () => mediaQuery.removeListener(handler)
	}, [mediaQuery])

	return match ? whenTrue : whenFalse
}
