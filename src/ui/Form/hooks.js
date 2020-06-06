import { useState, useCallback } from 'react'

export default function _useForm() {
	// 维护所有表单组件的值
	const [values, setValues] = useState({})
	const [trigger, setTrigger] = useState(false)

	const getFieldValue = name => values[name]
	const setFieldsValue = useCallback(newValues => {
		setValues(prev => ({ ...prev, ...newValues }))
	}, [])

	const validateFields = (...names) => {
		if (names.length === 0) {
			// 校验全部
			setTrigger(prev => !prev)
		} else {
		}
	}
	return { values, trigger, getFieldValue, setFieldsValue, validateFields }
}
