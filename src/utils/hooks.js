import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { debounce, getTargetElement, throttle } from './index'

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
 * 强制渲染组件
 */
export function useUpdate() {
	const [, setState] = useState(0)
	const update = useCallback(() => setState(prev => prev + 1), [])
	return update
}

/**
 * 异步请求hook
 * @param {Function} promisedFn 异步请求函数
 * @param {Object} options
 *  @param {*} initialData data 默认值
 *  @param {Boolean} defaultParams 如果 manual=false ，自动执行 run 的时候，默认带上的参数
 *  @param {Boolean} ready 只有当 ready 为 true 时，才会发起请求
 *  @param {Boolean} manual 默认 false。 即在初始化时自动执行 service。如果设置为 true，则需要手动调用 run 触发执行。
 *  @param {Array} refreshDeps 在 manual = false 时，refreshDeps 变化，会触发 service 重新执行
 *  @param {Number} loadingDelay 显示 loading 的延迟时间，避免闪烁
 *  @param {Function} onSuccess service resolve 时触发，参数为 data 和如果有 formatResult ，则 data 为格式化后数据。
 *  @param {Function} onError service 报错时触发，参数为 error。
 *  @param {Function} formatResult 格式化请求结果
 */
export function useFetch(promisedFn, options) {
	const { manual = false, ready = true, loadingDelay = 0, refreshDeps = [] } = options
	const promisedFnRef = useRef(promisedFn)
	useEffect(() => {
		promisedFnRef.current = promisedFn
	}, [promisedFn])

	const optionsRef = useRef(options)
	useEffect(() => {
		optionsRef.current = options
	}, [options])
	const internalRefreshDeps = manual ? [] : refreshDeps // 在 manual = true 时，该参数失效

	const [data, setData] = useState(optionsRef.current.initialData)
	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)
	const requestCount = useRef(0)

	const mutate = useCallback(setData, [setData])

	const run = useCallback(
		(...args) => {
			if (!ready) {
				return
			}
			const currentRequestCount = requestCount.current
			const { initialData, onSuccess, onError, formatResult = x => x } = optionsRef.current
			setData(formatResult(initialData))
			setError()
			const loadingTimer = setTimeout(() => {
				setLoading(true)
			}, loadingDelay)

			promisedFnRef
				.current(...args)
				.then(res => {
					if (requestCount.current !== currentRequestCount) return

					const formated = formatResult(res)
					onSuccess?.(formated)
					setData(formated)
				})
				.catch(err => {
					if (requestCount.current !== currentRequestCount) return

					onError?.(err)
					setError(err)
				})
				.finally(() => {
					clearTimeout(loadingTimer)
					if (requestCount.current !== currentRequestCount) return

					setLoading(false)
				})
		},
		[loadingDelay, ready]
	)

	useEffect(
		() => {
			if (!manual) {
				// 如果 manual=false ，自动执行 run 的时候，默认带上的参数
				const { defaultParams = [] } = optionsRef.current
				run(...defaultParams)
			}
			return () => {
				requestCount.current += 1
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[manual, run, ...internalRefreshDeps]
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

/**
 * 监听滚动
 * @param {HTMLElement}} target 目标元素
 */
export function useScroll(target, { throttleDuration = 0, debounceDuration = 0 } = {}) {
	const [position, setPosition] = useState({
		left: NaN,
		top: NaN
	})

	const updatePosition = useCallback(currentTarget => {
		let newPosition
		if (currentTarget === document) {
			if (!document.scrollingElement) return
			newPosition = {
				left: document.scrollingElement.scrollLeft,
				top: document.scrollingElement.scrollTop
			}
		} else {
			newPosition = {
				left: currentTarget.scrollLeft,
				top: currentTarget.scrollTop
			}
		}
		setPosition(newPosition)
	}, [])

	useEffect(() => {
		const el = getTargetElement(target, document)
		if (!el) return
		updatePosition(el)

		const listener = debounce(
			throttle(event => {
				if (!event.target) return
				updatePosition(event.target)
			}, throttleDuration),
			debounceDuration
		)

		el.addEventListener('scroll', listener)
		return () => {
			el.removeEventListener('scroll', listener)
		}
	}, [target, debounceDuration, throttleDuration, updatePosition])

	return position
}
