import React, { useImperativeHandle, useRef, useState, useEffect, useCallback } from 'react'
import { TransitionGroup } from "react-transition-group"
import { makeStyles } from '@material-ui/styles'
import Ripple from './Ripple'

const useStyles = makeStyles({
	root: {
		overflow: 'hidden',
		pointerEvents: 'none',
		position: 'absolute',
		zIndex: 0,
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		borderRadius: 'inherit',
	},
})

export default React.forwardRef(function TouchRipple(props, ref) {

	const { center = false, timeout, color } = props

	const [ripples, setRipples] = useState([])
	const key = useRef(0)
	const container = useRef()
	const classes = useStyles()

	const addRipple = (rippleX, rippleY, rippleSize) => {

		setRipples(oldRipples => [
			...oldRipples,
			<Ripple
				key={key.current}
				rippleX={rippleX}
				rippleY={rippleY}
				rippleSize={rippleSize}
				timeout={timeout}
				color={color}
			/>
		])
		key.current++
	}

	const start = useCallback((e) => {
		const element = container.current

		const rect = element
			? element.getBoundingClientRect()
			: {
				width: 0,
				height: 0,
				left: 0,
				top: 0
			}

		let rippleX
		let rippleY
		let rippleSize

		if (center) {
			rippleX = Math.round(rect.width / 2)
			rippleY = Math.round(rect.height / 2)
			rippleSize = Math.round(Math.sqrt(4 * (rippleX ** 2 + rippleY ** 2)))

		} else {
			rippleX = Math.round(e.clientX - rect.left)
			rippleY = Math.round(e.clientY - rect.top)

			const sizeX = Math.max(Math.abs(rect.width - rippleX), rippleX) * 2
			const sizeY = Math.max(Math.abs(rect.height - rippleY), rippleY) * 2

			rippleSize = Math.round(Math.sqrt(sizeX ** 2 + sizeY ** 2))
		}

		addRipple(rippleX, rippleY, rippleSize)
	}, [addRipple])

	const stop = useCallback(() => {
		setRipples(oldRipples => {
			if (oldRipples.length > 0) {
				return oldRipples.slice(1)
			}
			return oldRipples
		})
	}, [])

	useImperativeHandle(ref, () => ({
		start,
		stop
	}), [start, stop])

	return (
		<span ref={container} className={classes.root}>
			<TransitionGroup >
				{ripples}
			</TransitionGroup>
		</span>
	)
})