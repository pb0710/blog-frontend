export function getlang(str) {
	if (typeof str != 'string') return str

	const array = str.split('-')
	return array[1]
}

export function insertTemp(str, index, target) {
	const start = str.substr(0, index)
	const end = str.substr(index, str.length)
	return start + target + end
}

/**
 * 换行符特殊处理，软换行转为硬换行
 * @param str
 */
export const parseMarkdown = str => str.replace(/\n+/g, ns => (ns.length === 1 ? '  ' + ns : ns))

/**
 * 获取滚动条长度
 * @param elem dom
 */
export const getScrollbarHeight = elem => elem.clientHeight ** 2 / elem.scrollHeight

/**
 * 滚动条联动
 * @param origin
 * @param target
 */
export function followScroll(origin, target) {
	if (!origin || !target) return

	const proportion = getScrollbarHeight(origin) / getScrollbarHeight(target)
	const originPercent = origin.scrollTop / origin.scrollHeight

	const left = 0
	const top = Math.round(target.scrollHeight * originPercent * proportion)

	target.scrollTo(left, top)
}

/**
 * 获取正在编辑的坐标
 * @param elem
 */
export function getPosition(elem) {
	return {
		start: elem?.selectionStart || 0,
		end: elem?.selectionEnd || 0
	}
}

/**
 * 设置正在编辑的坐标
 * @param elem
 * @param pos
 */
export function setPosition(elem, pos) {
	if (elem instanceof HTMLElement) {
		setTimeout(() => {
			elem.setSelectionRange(pos, pos)
			elem.focus()
		})
	}
}
