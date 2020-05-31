import React, { forwardRef, memo, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import themeColors from '../utils/themeColors'
import { hex2Rgba } from '../utils'
import { SearchIcon } from '../utils/icons'
import { flexCenter } from 'utils/styles'
import { useCallback } from 'react'

const useStyles = makeStyles({
	root: {
		width: 200,
		height: 30,
		minWidth: 200,
		minHeight: 28,
		position: 'relative'
	},
	input: ({ color, focus, disabled, search }) => ({
		boxSizing: 'border-box',
		width: '100%',
		height: '100%',
		background: '#fafafa',
		paddingLeft: 8,
		paddingRight: search ? 32 : 8,
		borderRadius: 2,
		outline: 0,
		border: `1px solid ${focus ? color.main : '#e5e5e5'}`,
		boxShadow: `0 0 0 ${focus ? '2px' : '6px'} ${hex2Rgba(color.main, focus ? 0.7 : 0)}`,
		opacity: disabled && 0.5,
		cursor: disabled && 'not-allowed',
		transition: 'all 250ms ease-out'
	}),
	searchIcon: {
		...flexCenter,
		height: '100%',
		position: 'absolute',
		right: 8,
		top: 0,
		fontSize: 15,
		cursor: 'pointer',
		color: '#606266'
	}
})

const Input = forwardRef((props, ref) => {
	const {
		className,
		inputClassName,
		placeholder,
		color = 'primary',
		disabled = false,
		search = false,
		onSearch = null,
		onChange = null,
		onFocus = null,
		onBlur = null,
		onClick = null
	} = props

	const [value, setValue] = useState('')
	const [focus, setFocus] = useState(false)

	const classes = useStyles({
		color: themeColors[color],
		disabled,
		focus,
		search
	})

	const beNull = value => (disabled ? null : value)

	const handleFocusInput = useCallback(
		beNull(() => {
			onFocus && onFocus()
			setFocus(true)
		}),
		[]
	)

	const handleBlurInput = useCallback(
		beNull(() => {
			onBlur && onBlur()
			setFocus(false)
		}),
		[]
	)

	const handleChangeInput = useCallback(
		e => {
			const keywords = e.target.value
			setValue(keywords)
			onChange && onChange(e)
		},
		[onChange]
	)

	const handleSearch = useCallback(() => {
		onSearch && onSearch(value)
	}, [value])

	return (
		<div ref={ref} className={clsx(classes.root, className)}>
			<input
				type="text"
				disabled={disabled}
				className={clsx(classes.input, inputClassName)}
				placeholder={placeholder}
				onFocus={handleFocusInput}
				onBlur={handleBlurInput}
				onChange={handleChangeInput}
				onClick={beNull(onClick)}
			/>
			{search && (
				<div className={classes.searchIcon} onClick={handleSearch}>
					<SearchIcon />
				</div>
			)}
		</div>
	)
})

export default memo(Input)
