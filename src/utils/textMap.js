export const mapToBoolean = key => {
	const values = {
		trues: ['true', 'OK', 'Y', 'y', '1', 1],
		falses: ['false', 'FAIL', 'N', 'n', '0', 0]
	}
	const belongToTrue = values.trues.some(item => key === item)
	const belongToFalse = values.falses.some(item => item === key)
	if (belongToTrue) {
		return true
	} else if (belongToFalse) {
		return false
	} else {
		return key
	}
}
