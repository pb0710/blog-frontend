import React, { memo, useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import _useForm from './hooks'

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		height: 360,
		padding: 8
	}
})

function _Form(props) {
	const { className, children, onFinish, onFinishFailed, onChange, form = {} } = props
	const { values = {}, setFieldsValue, validateFields, trigger } = form
	const classes = useStyles()
	// 维护所有表单组件的校验提示
	const [errorTips, setErrorTips] = useState({})

	const handleChange = useCallback(
		e => {
			const { name, value } = e.target
			if (name) {
				setFieldsValue && setFieldsValue({ [name]: value })
				onChange && onChange(name, value, values)
			}
		},
		[values, setFieldsValue]
	)

	const handleSubmit = useCallback(() => {
		validateFields()
		const errors = []
		for (const [name, errorTip] of Object.entries(errorTips)) {
			if (errorTip) {
				errors.push({ name, errorTip })
			}
		}

		if (errors.length === 0) {
			onFinish && onFinish(values)
		} else {
			onFinishFailed && onFinishFailed(values, errors)
		}
	}, [onFinish, onFinishFailed, values, errorTips])

	// 查找表单提交组件（如果是提交组件，传递onClick和values）
	const checkSubmitType = child => {
		if (child?.type?.name === 'FormItem' && child?.props?.submitType) {
			return { onClick: handleSubmit }
		} else if (child.props.children) {
			const childsChildren = child.props.children
			// 考虑到不同层级的child.props.children为多个的情况
			if (childsChildren.length > 1) {
				for (const item of childsChildren) {
					// 只取FormItem下拥有submitType的作为提交组件
					if (item?.type?.name === 'FormItem') {
						return checkSubmitType(item)
					}
				}
			} else {
				return checkSubmitType(childsChildren)
			}
		} else {
			return null
		}
	}

	return (
		<form className={clsx(classes.root, className)} onChange={handleChange}>
			{children && typeof children === 'object'
				? React.Children.map(children, child => {
						const submitEvent = checkSubmitType(child)
						return React.cloneElement(
							child,
							submitEvent ? { ...submitEvent } : { setFieldsValue, values, errorTips, setErrorTips, trigger }
						)
				  })
				: children}
		</form>
	)
}

const Form = memo(_Form)
Form.useForm = _useForm

export default Form
