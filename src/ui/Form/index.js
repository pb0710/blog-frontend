import React from 'react'
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
		minHeight: 120,
		padding: 8
	}
})

function _Form(props) {
	const { className, children, onFinish, onFinishFailed, onChange, form = {} } = props
	const { values = {}, setFieldsValue, validateFields, trigger } = form
	const classes = useStyles()
	// 维护所有表单组件的校验提示
	const [errorTips, setErrorTips] = React.useState({})

	const handleChange = React.useCallback(
		e => {
			const { name, value } = e.target
			if (name) {
				setFieldsValue && setFieldsValue({ [name]: value })
				onChange && onChange(name, value, values)
			}
		},
		[values, setFieldsValue]
	)

	const handleSubmit = React.useCallback(() => {
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
	const getSubmitElement = child => {
		if (child?.type?.name === 'FormItem' && child?.props?.submitType) {
			return React.cloneElement(child, { onClick: handleSubmit })
		} else if (child.props.children) {
			const childsChildren = child.props.children
			// 考虑到不同层级的child.props.children为多个的情况
			if (childsChildren.length > 1) {
				const newChildren = React.Children.map(childsChildren, item => {
					// 只取FormItem下拥有submitType的作为提交组件
					if (item?.type?.name === 'FormItem') {
						return getSubmitElement(item)
					} else {
						return item
					}
				})
				return React.cloneElement(child, { children: newChildren })
			} else {
				return getSubmitElement(childsChildren)
			}
		}
	}

	return (
		<form className={clsx(classes.root, className)} onChange={handleChange}>
			{children && typeof children === 'object'
				? React.Children.map(children, child => {
						const submitElement = getSubmitElement(child)
						return submitElement
							? submitElement
							: child?.type?.name === 'FormItem'
							? React.cloneElement(child, { setFieldsValue, values, errorTips, setErrorTips, trigger })
							: child
				  })
				: children}
		</form>
	)
}

const Form = React.memo(_Form)
Form.useForm = _useForm

export default Form
