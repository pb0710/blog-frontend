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
 * @param {promise} promiseApi 异步请求函数
 * @param {object} options
 *  @param {unknown} initData 默认值
 *  @param {boolean} immutable 是否只请求一次
 */
export function useFetch(promiseApi, initData, immutable) {
	const [data, setData] = useState(initData)
	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)

	const excute = useCallback(() => {
		setLoading(true)
		promiseApi()
			.then(res => setData(res))
			.catch(err => setError(err))
			.finally(() => setLoading(false))
	}, [promiseApi])

	useEffect(() => {
		if (!immutable) excute()
	}, [excute, immutable])

	return { data, error, loading, excute }
}
