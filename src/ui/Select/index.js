import React, { useState, useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useBoolean } from '../utils/hooks'
import { ArrowDownIcon } from '../utils/icons'
import Option from '../Option'
import Glass from '../Glass'

const useStyles = makeStyles({
	root: {
		minWidth: 80,
		minHeight: 32,
		position: 'relative',
		cursor: 'pointer',
		userSelect: 'none',
	},
	selected: {
		boxSizing: 'border-box',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		height: 32,
		background: '#fafafa',
		paddingLeft: 8,
		paddingRight: 8,
		borderRadius: 2,
		border: '1px solid #e2e2e2',
		'&>i': {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			fontSize: 12,
			color: '#606266',
		}
	},
	optionWrapper: ({ visible, timeout }) => ({
		width: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
		borderRadius: 2,
		boxShadow: '0 4px 24px rgba(26,26,26,.14)',
		overflow: 'hidden',
		zIndex: visible ? 1 : -1,
		opacity: visible ? 1 : 0,
		transition: `all ${timeout}ms ease-out`,
		transformOrigin: '50% 16px',
	}),
	enter: {
		animation: '$enter .3s'
	},
	'@keyframes enter': {
		'0%': {
			opacity: 0,
			transform: 'scale(.6)',
		},
		'60%': {
			transform: 'scale(1.03)',
		},
		'100%': {
			opacity: 1,
			transform: 'scale(1)',
		}
	}
})

export default function Select(props) {

	const {
		className,
		children,
		color = 'primary',
		timeout = 250,
		onChange = () => { }
	} = props

	const {
		boolean: visible,
		setTrue: handleShowList,
		setFalse: handleHideList
	} = useBoolean(false)

	const [values, setValues] = useState([])
	const [childrens, setChildrens] = useState([])
	const [selectedIndex, setSelectedIndex] = useState(0)

	const classes = useStyles({
		visible,
		timeout,
	})

	const refs = useMemo(
		() => React.Children.map(children, () => React.createRef()),
		[children]
	)

	const selected = useMemo(
		() => ({
			value: values[selectedIndex],
			children: childrens[selectedIndex]
		}),
		[values, childrens, selectedIndex]
	)

	useEffect(
		() => {
			const values = refs.map(ref => ref.current.value)
			const childrens = refs.map(ref => ref.current.children)
			setValues(values)
			setChildrens(childrens)
		},
		[refs]
	)

	useEffect(
		() => {
			visible && document.addEventListener('click', handleHideList)
			return () => {
				document.removeEventListener('click', handleHideList)
			}
		},
		[visible, handleHideList]
	)

	const handleChange = value => {
		setSelectedIndex(values.indexOf(value))
		onChange(value)
	}

	return (
		<div className={clsx(classes.root, className)}>
			<div className={classes.selected} onClick={handleShowList}>
				{selected.children}
				<i>
					<ArrowDownIcon />
				</i>
			</div>
			{
				<Glass className={clsx(classes.optionWrapper, visible && classes.enter)}>
					<Option value={selected.value} color={color}>{selected.children}</Option>
					{
						React.Children.map(
							children,
							(child, index) => React.cloneElement(child, {
								ref: refs[index],
								handleChange,
								isCurrent: index === selectedIndex,
								color,
								timeout
							})
						)
					}
				</Glass>
			}
		</div>
	)
}