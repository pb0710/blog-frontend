// 防抖
export function debounce(fn, wait = 0) {
	let timeout
	return e => {
		// react的event是合成对象，先转化
		e.persist && e.persist()
		clearTimeout(timeout)
		timeout = setTimeout(function () {
			fn(e)
		}, wait)
	}
}

// 节流
export function throttle(fn, interval = 0) {
	let lastTime = 0
	return args => {
		const nowTime = new Date().getTime()
		if (nowTime - lastTime > interval) {
			fn(args)
			lastTime = nowTime
		}
	}
}

/**
 * 函数compose
 * @param  {...Function} fns 函数列表
 */
export const compose = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)))

/**
 * 比较两者是否值相等
 * @param {*} a
 * @param {*} b
 */
export function equal(a, b) {
	if (typeof a !== typeof b) return false
	if (typeof a === 'function') return a.toString() === b.toString()
	if (typeof a === 'object') {
		if (a === null) return a === b
		if (Array.isArray(a)) return a.length !== b.length ? false : !a.some((item, i) => !equal(item, b[i]))

		function contain(origin, target) {
			for (const key in origin) {
				if (origin.hasOwnProperty(key) && !equal(origin[key], target[key])) {
					return false
				}
			}
			return true
		}
		return contain(a, b) && contain(b, a)
	} else {
		return a === b
	}
}

/**
 * 用JSON比较两者是否值相等
 * @param {*} a
 * @param {*} b
 */
export const toJSONEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b)

/**
 * 对象不为空（属性值为 undefined 也算作空）
 * @param {Object} obj
 */
export const notEmpty = obj => Boolean(Object.values(obj).filter(item => item !== undefined).length)
