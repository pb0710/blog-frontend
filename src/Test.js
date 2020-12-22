import React, { useCallback, useEffect, useRef, useState } from 'react'

function fetchProfilefakeApi(duration = 0) {
	return new Promise(resovle => {
		setTimeout(() => {
			resovle('接口返回的用户信息')
		}, duration)
	})
}

function fetchProfileUnstablefakeApi(userId) {
	return new Promise((resovle, reject) => {
		setTimeout(() => {
			console.log('userId', userId)
			Math.random() < 0.7 ? resovle([`接口返回的${userId}的用户信息`]) : reject('获取用户信息请求失败')
		}, 2000)
	})
}

export default function Profile() {
	const [userId, setUserId] = useState(false)

	const { data, loading, run } = useRequest(async () => fetchProfileUnstablefakeApi(userId), {
		initialData: ['暂无数据', '!!!!!'],
		loadingDelay: 500,
		refreshDeps: [userId],
		manual: false,
		defaultParams: [true],
		onSuccess(data) {
			console.log('data: ', data)
		},
		onError(err) {
			console.error(err)
		},
		formatResult(data) {
			return data.map(item => `_${item}_`)
		}
	})

	return (
		<div>
			<button
				onClick={() => {
					setUserId(prev => !prev)
				}}
			>
				toggle {userId}
			</button>
			<button onClick={run}>手动请求</button>
			<p>{loading ? <span>加载中...</span> : <h3>profile: {data}</h3>}</p>
		</div>
	)
}

export function useRequest(promisedFn, options) {
	const { manual = false, ready = true, loadingDelay = 0, refreshDeps = [] } = options
	const internalRefreshDeps = manual ? [] : refreshDeps // 在 manual = true 时，该参数失效

	const [data, setData] = useState()
	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)
	const requestCount = useRef(0)

	const promisedFnRef = useRef(promisedFn)
	useEffect(() => {
		promisedFnRef.current = promisedFn
	}, [promisedFn])
	const optionsRef = useRef(options)
	useEffect(() => {
		optionsRef.current = options
	}, [options])

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
