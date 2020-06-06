import React, { memo, useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'

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

function Form(props) {
	const { className, children, onSubmit, onChange } = props
	const classes = useStyles()
	const [values, setValues] = useState({})

	const handleChange = useCallback(
		e => {
			const { name, value } = e.target
			if (name) {
				setValues(prev => ({ ...prev, [name]: value }))
				onChange && onChange(e.target, values)
			}
		},
		[values]
	)

	const handleSubmit = useCallback(
		values => {
			onSubmit && onSubmit(values)
		},
		[onSubmit]
	)

	// 查找表单提交组件（如果是提交组件，传递onClick和values）
	const checkSubmitType = child => {
		if (child?.type?.name === 'FormItem' && child?.props?.submitType) {
			return { onClick: () => handleSubmit(values) }
		} else if (child.props.children) {
			const childsChildren = child.props.children
			// 考虑到child.props.children为多个的情况
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
						return React.cloneElement(child, submitEvent ? { ...submitEvent } : { values })
				  })
				: children}
		</form>
	)
}

export default memo(Form)
