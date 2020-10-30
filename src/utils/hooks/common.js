import { useState, useEffect, useCallback, useMemo, useRef } from 'react'

export function useBoolean(initial) {
	const [state, setState] = useState(initial)
	const setTrue = () => {
		setState(true)
	}
	const setFalse = () => {
		setState(false)
	}
	const setToggle = () => {
		setState(prev => !prev)
	}
	return [state, { setTrue, setFalse, setToggle }]
}

/**
 * 异步请求hooks
 * @param {Promise} promiseApi 异步请求函数
 * @param {Object} options
 *  @param {any} initData 默认值
 *  @param {Boolean} immutable 请求是否不可变
 *  @param {Array} defaultParams 默认请求参数
 */
export function useFetch(promiseApi, { initData, defaultParams = [], immutable }) {
	const [data, setData] = useState(initData)
	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)

	let initialize = useRef(initData).current
	let params = useRef(defaultParams).current

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

	useEffect(() => {
		if (!immutable) excute(...params)
	}, [excute, immutable, params])

	return { data, error, loading, excute }
}
