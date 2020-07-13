import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useBoolean } from '../utils/hooks'
import { ArrowDownBoldIcon } from '../utils/icons'
import themeColors from '../utils/themeColors'
import Option from '../Option'
import GroundGlass from '../GroundGlass'

const useStyles = makeStyles({
	root: {
		minWidth: 104,
		minHeight: 32,
		position: 'relative',
		cursor: 'pointer',
		userSelect: 'none'
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
			color: '#303133'
		}
	},
	optionWrapper: ({ listVisible, timeout }) => ({
		width: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
		borderRadius: 2,
		boxShadow: '0 4px 24px rgba(26,26,26,.14)',
		overflow: 'hidden',
		zIndex: listVisible ? 999 : -1,
		opacity: listVisible ? 1 : 0,
		transition: `all ${timeout}ms ease-out`,
		transformOrigin: '50% 16px'
	}),
	firstOption: ({ color }) => ({
		color: color.main
	}),
	enter: {
		animation: '$enter ease-out',
		animationDuration: ({ timeout }) => timeout
	},
	'@keyframes enter': {
		'0%': {
			opacity: 0,
			transform: 'scale(.6)'
		},
		'100%': {
			opacity: 1,
			transform: 'scale(1)'
		}
	}
})

export default function Select(props) {
	const { className, children, color = 'primary', timeout = 200, onChange = null } = props

	const { boolean: listVisible, setTrue: handleShowList, setFalse: handleHideList } = useBoolean(false)
	const [values, setValues] = React.useState([])
	const [childrens, setChildrens] = React.useState([])
	const [selectedIndex, setSelectedIndex] = React.useState(0)

	const classes = useStyles({
		listVisible,
		timeout,
		color: themeColors[color]
	})

	const refs = React.useMemo(() => React.React.Children.map(children, () => React.createRef()), [children])

	const selected = React.useMemo(
		() => ({
			value: values[selectedIndex],
			children: childrens[selectedIndex]
		}),
		[values, childrens, selectedIndex]
	)

	React.useEffect(() => {
		const values = refs.map(ref => ref.current.value)
		const childrens = refs.map(ref => ref.current.children)
		setValues(values)
		setChildrens(childrens)
	}, [refs])

	React.useEffect(() => {
		listVisible && document.addEventListener('click', handleHideList)
		return () => {
			document.removeEventListener('click', handleHideList)
		}
	}, [listVisible, handleHideList])

	const handleChange = value => {
		setSelectedIndex(values.indexOf(value))
		onChange && onChange(value)
	}

	return (
		<div className={clsx(classes.root, className)}>
			<div className={classes.selected} onClick={handleShowList}>
				{listVisible ? null : (
					<>
						{selected.children}
						<i>
							<ArrowDownBoldIcon />
						</i>
					</>
				)}
			</div>
			{
				<GroundGlass className={clsx(classes.optionWrapper, listVisible && classes.enter)}>
					<Option className={classes.firstOption} value={selected.value}>
						{selected.children}
					</Option>
					{children &&
						React.React.Children.map(children, (child, index) =>
							React.React.cloneElement(child, {
								ref: refs[index],
								handleChange,
								isCurrent: index === selectedIndex,
								// color,
								timeout
							})
						)}
				</GroundGlass>
			}
		</div>
	)
}
