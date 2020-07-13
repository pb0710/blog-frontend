import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'

const useStyles = makeStyles({
	root: {
		boxSizing: 'border-box',
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column',
		width: '100%',
		'&>span': {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			width: '100%',
			height: 32,
			overflow: 'hidden'
		}
	},
	tip: {
		color: '#ff4d4f',
		opacity: 0,
		transform: 'translateX(120px)',
		animation: '$enter 250ms forwards'
	},
	'@keyframes enter': {
		from: {
			opacity: 0,
			transform: 'translateX(120px)'
		},
		to: {
			opacity: 1,
			transform: 'translateX(0)'
		}
	}
})

function FormItem(props, ref) {
	const {
		className,
		children,
		setFieldsValue,
		label,
		name,
		initValue,
		values = {},
		submitType = false,
		onClick = null,
		errorTips = {},
		setErrorTips = null,
		validator = null,
		trigger = false // 只是用来触发校验，值不影响结果
	} = props

	const classes = useStyles()
	const value = values[name] ?? ''
	const errorTip = errorTips[name] ?? ''

	// 传给表单控件的props
	const controlProps = React.useMemo(() => {
		return submitType ? { onClick } : name ? { name, values, value } : {}
	}, [submitType, onClick, name, values])

	const callback = React.useCallback(
		desc => {
			if (setErrorTips) {
				const newTip = { [name]: desc || null }
				setErrorTips(prev => ({ ...prev, ...newTip }))
			}
		},
		[setErrorTips, name]
	)

	/**
	 * 执行自定义校验
	 * 触发时机为：首次渲染、当前表单项数据改变、手动触发
	 */
	React.useEffect(() => {
		validator && validator(value, callback, values)
	}, [value, trigger])

	// 设置初始值
	React.useEffect(() => {
		if (setFieldsValue) {
			setFieldsValue({
				[name]: initValue
			})
		}
	}, [setFieldsValue])

	return (
		<label className={clsx(classes.root, className)}>
			{label && (
				<span>
					{label}：{errorTip && <span className={classes.tip}>{errorTip}</span>}
				</span>
			)}
			{children && React.React.cloneElement(children, controlProps)}
		</label>
	)
}

export default FormItem
