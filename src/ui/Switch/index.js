import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { v4 as uuid } from 'uuid'
import themeColors from '../utils/themeColors'

const useStyles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		minWidth: 32,
		height: 22,
		marginLeft: 8,
		position: 'relative'
	},
	label: ({ disabled }) => ({
		opacity: disabled && 0.5,
		cursor: disabled ? 'not-allowed' : 'pointer'
	}),
	checkbox: {
		display: 'none'
	},
	switch: ({ checked, color, disabled }) => ({
		display: 'flex',
		alignItems: 'center',
		minWidth: 30,
		height: 20,
		background: checked ? color.main : '#fafafa',
		paddingLeft: 4,
		paddingRight: 4,
		marginLeft: 8,
		borderRadius: 11,
		border: checked ? 'rgba(0,0,0,0)' : '1px solid #e2e2e2',
		opacity: disabled && 0.5,
		cursor: disabled ? 'not-allowed' : 'pointer',
		transition: 'all .2s ease-out'
	}),
	button: ({ checked }) => ({
		width: 12,
		height: 12,
		borderRadius: '50%',
		background: checked ? '#fff' : '#303133',
		transition: 'all .2s',
		transform: checked && 'translateX(17px)'
	})
})

export default React.memo(function Switch(props) {
	const { defaultChecked = true, color = 'primary', disabled = false, label, onChange = () => {} } = props

	const id = `switch-${uuid()}-${label}`

	const [checked, setChecked] = React.useState(defaultChecked)

	const classes = useStyles({
		checked,
		disabled,
		color: themeColors[color]
	})

	const handleToggle = () => {
		if (disabled) return

		setChecked(prev => !prev)
		onChange(checked)
	}

	return (
		<div className={classes.root}>
			{label && (
				<label className={classes.label} htmlFor={id}>
					{label}
				</label>
			)}
			<div className={classes.switch} onClick={handleToggle}>
				<div className={classes.button}></div>
			</div>
			<input
				className={classes.checkbox}
				type="checkbox"
				checked={checked}
				onChange={handleToggle}
				id={id}
				value={checked}
			/>
		</div>
	)
})
