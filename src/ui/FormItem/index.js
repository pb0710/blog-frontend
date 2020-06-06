import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'

const useStyles = makeStyles({
	root: {
		boxSizing: 'border-box',
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column',
		width: '100%',
		'&>label': {
			padding: 4,
			paddingBottom: 8,
			paddingTop: 24
		}
	}
})

function FormItem(props) {
	const { className, children, label, name, values, submitType = false, onClick = null } = props
	const classes = useStyles()
	const labelName = label ? `${label}：` : null

	// 传给表单控件的props
	const controlProps = useMemo(() => {
		return submitType
			? { onClick }
			: name
			? {
					name,
					values: values,
					value: values[name]
			  }
			: {}
	}, [submitType, onClick, name, values])

	return (
		<label className={clsx(classes.root, className)}>
			{labelName}
			{children && React.cloneElement(children, controlProps)}
		</label>
	)
}

export default FormItem
