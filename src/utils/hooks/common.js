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
 *  @param {any} initialData 默认值
 *  @param {Boolean} immutable 请求是否不可变
 *  @param {Array} params 默认请求参数
 *  @param {Array} refreshDeps 重新请求依赖项
 */
export function useFetch(promiseApi, { initialData, params = [], immutable = false, refreshDeps = [] }) {
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
			if (!immutable) {
				excute(...paramsRef.current)
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[excute, immutable, ...refreshDeps]
	)

	return { data, error, loading, excute }
}
