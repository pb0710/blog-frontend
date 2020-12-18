import { useState, useEffect, useCallback, useMemo, useRef } from 'react'

/**
 * @param {Boolean} initial 默认值
 */
export function useBoolean(initial) {
	const [state, setState] = useState(initial)
	const setTrue = useCallback(() => {
		setState(true)
	}, [])
	const setFalse = useCallback(() => {
		setState(false)
	}, [])
	const toggle = useCallback(() => {
		setState(prev => !prev)
	}, [])
	return [state, { setTrue, setFalse, toggle }]
}

/**
 * 获取最新引用
 * @param {*} state
 */
export function useLatestStateRef(state) {
	const stateRef = useRef(state)
	useEffect(() => {
		stateRef.current = state
	}, [state])
	return stateRef
}

/**
 * 异步请求hook
 * @param {Function} promisedFn 异步请求函数
 * @param {Object} options
 *  @param {*} initialData 默认值
 *  @param {Boolean} ready 是否自动请求
 *  @param {Boolean} manual 是否只允许手动请求 manual = true 后，refreshDeps 将无效，只允许 run()
 *  @param {Array} refreshDeps 自动请求依赖项
 *  @param {Function} onSuccess 请求成功回调
 *  @param {Function} onError 请求失败回调
 */
export function useFetch(
	promisedFn,
	{ initialData, ready = true, manual = false, refreshDeps = [], onSuccess, onError }
) {
	const [data, setData] = useState(initialData)
	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)

	const initialize = useRef(initialData).current // 初始数据不可变

	const latestFnRef = useLatestStateRef(promisedFn)
	const onSuccessRef = useLatestStateRef(onSuccess)
	const onErrorRef = useLatestStateRef(onError)
	const internalRefreshDeps = manual ? [] : refreshDeps

	const mutate = useCallback(setData, [setData])

	const run = useCallback(
		(...args) => {
			if (typeof latestFnRef.current !== 'function') return

			setLoading(true)
			setData(initialize)
			setError()
			latestFnRef
				.current(...args)
				.then(res => {
					onSuccessRef.current?.(res)
					setData(res)
				})
				.catch(err => {
					onErrorRef.current?.(err)
					setError(err)
				})
				.finally(() => setLoading(false))
		},
		[initialize, latestFnRef, onErrorRef, onSuccessRef]
	)

	useEffect(
		() => {
			if (!manual && ready) {
				run()
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[run, ready, ...internalRefreshDeps]
	)

	return { data, error, loading, run, mutate }
}

/**
 * 媒体查询
 * @param {String} query 查询语句
 * @param {Function} whenTrue 符合回调
 * @param {Function} whenFalse 不符合回调
 */
export function useMediaQuery(query, whenTrue = true, whenFalse = false) {
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

/**
 * 滚动到顶部
 * @param {Boolean} manual 是否手动触发
 */
export function useScrollToTop(manual) {
	const run = useCallback(() => {
		document.body.scrollIntoView({ behavior: 'smooth' })
	}, [])

	useEffect(() => {
		if (!manual) {
			run()
		}
	}, [manual, run])

	return { run }
}
