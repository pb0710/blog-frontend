import React, { useState } from 'react'
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
		margin: 8,
		position: 'relative',
	},
	label: ({ disabled }) => ({
		opacity: disabled && .5,
		cursor: disabled ? 'not-allowed' : 'pointer',
	}),
	checkbox: {
		display: 'none',
	},
	switch: ({ checked, color, disabled }) => ({
		display: 'flex',
		alignItems: 'center',
		minWidth: 30,
		height: 20,
		background: checked ? color.main : '#fff',
		paddingLeft: 4,
		paddingRight: 4,
		margin: 8,
		borderRadius: 11,
		border: `1px solid ${checked ? color.main : '#aaa'}`,
		opacity: disabled && .5,
		cursor: disabled ? 'not-allowed' : 'pointer',
		transition: 'all .2s ease-in-out',
	}),
	button: ({ checked }) => ({
		width: 12,
		height: 12,
		borderRadius: '50%',
		background: checked ? '#fff' : '#303133',
		transition: 'all .2s',
		transform: checked && 'translateX(17px)',
	}),
	mask: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		background: 'rgba(255,255,255,.5)',
		cursor: 'not-allowed',
	}
})

export default React.memo(function Switch(props) {
	const {
		defaultChecked = true,
		color = 'primary',
		disabled = false,
		label,
		onChange = () => { }
	} = props

	const id = `switch-${uuid()}-${label}`

	const [checked, setChecked] = useState(defaultChecked)

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