// 防抖
export function debounce(func, wait = 0) {
	let timeout
	return e => {
		// react的e是合成对象，先转化
		e.persist && e.persist()
		clearTimeout(timeout)
		timeout = setTimeout(function () {
			func(e)
		}, wait)
	}
}

// 节流（时间戳）
export function throttle(func, interval = 0) {
	let lastTime = 0

	return args => {
		const nowTime = new Date().getTime()
		if (nowTime - lastTime > interval) {
			func(args)
			lastTime = nowTime
		}
	}
}
