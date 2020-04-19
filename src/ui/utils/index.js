/**
 * 颜色格式转换-16进制Hex转Rgba
 * @param {string} hex 16进制色值
 * @param {number} opacity 透明度
 */
export function hex2Rgba(hex, opacity) {
	const convert = (a, b) => parseInt(`0x${hex.slice(a, b)}`)
	return `rgba(
		${convert(1, 3)},
		${convert(3, 5)},
		${convert(5, 7)},
		${opacity}
	)`
}