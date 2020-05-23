export function delay(interval) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(`Resolved use ${interval}ms.`)
		}, interval)
	})
}

export function unstableDelay(interval) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (Math.random() - 0.5 > 0) resolve(`Resolved use ${interval}ms.`)
			else reject(`Rejected error use ${interval}ms`)
		}, interval)
	})
}

export function debounce(func, wait) {
	let timeout
	return e => {
		e.persist && e.persist()
		clearTimeout(timeout)
		timeout = setTimeout(function () {
			func(e)
		}, wait)
	}
}

export function throttle(func, interval = 0) {
	let lock = false
	let timer

	return args => {
		if (!lock) {
			lock = true
			func(args)
			clearTimeout(timer)
			timer = setTimeout(() => {
				lock = false
			}, interval)
		}
	}
}

export function throttle2(func, interval = 0) {
	let lastTime = 0

	return args => {
		const nowTime = new Date().getTime()
		if (nowTime - lastTime > interval) {
			func(args)
			lastTime = nowTime
		}
	}
}
