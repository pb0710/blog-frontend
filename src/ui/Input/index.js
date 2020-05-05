import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import themeColors from '../utils/themeColors'
import { hex2Rgba } from '../utils'
import { SearchIcon } from '../utils/icons'
import { flexCenter } from 'utils/styles'

const useStyles = makeStyles({
	root: {
		minWidth: 200,
		height: 28,
		position: 'relative',
	},
	input: ({ color, focus, disabled }) => ({
		boxSizing: 'border-box',
		width: '100%',
		height: '100%',
		background: '#fafafa',
		paddingLeft: 8,
		paddingRight: 32,
		borderRadius: 2,
		outline: 0,
		border: `1px solid ${focus ? color.main : '#d2d2d2'}`,
		boxShadow: `0 0 0 ${focus ? '2px' : '6px'} ${hex2Rgba(color.main, focus ? .7 : 0)}`,
		opacity: disabled && .5,
		cursor: disabled && 'not-allowed',
		transition: 'all .2s ease-out',
	}),
	searchIcon: ({ color, focus }) => ({
		...flexCenter,
		height: '100%',
		position: 'absolute',
		right: 8,
		top: 0,
		fontSize: 15,
		cursor: 'pointer',
		color: focus ? color.main : '#606266',
	})
})

export default React.memo(function Input(props) {

	const {
		className,
		placeholder,
		color = 'primary',
		disabled = false,
		onChange = null,
		showSearch = false
	} = props

	const [focus, setFocus] = useState(false)

	const classes = useStyles({ 
		color: themeColors[color], 
		disabled,
		focus, 
	})

	const beNull = value => disabled ? null : value

	const handleFocusInput = beNull(() => {
		setFocus(true)
	})

	const handleBlurInput = beNull(() => {
		setFocus(false)
	})

	return (
		<div className={classes.root}>
			<input
				type="text"
				disabled={disabled}
				className={clsx(classes.input, className)}
				placeholder={placeholder}
				onFocus={handleFocusInput}
				onBlur={handleBlurInput}
				onChange={beNull(onChange)}
			/>
			{showSearch && <div className={classes.searchIcon}><SearchIcon /></div>}
		</div>
	)
})