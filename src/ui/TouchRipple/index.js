import React from 'react'
import { TransitionGroup } from 'react-transition-group'
import { makeStyles } from '@material-ui/styles'
import Ripple from './Ripple'
import _useRipple from './hooks'

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
		borderRadius: 'inherit'
	}
})

const TouchRipple = React.memo(
	React.forwardRef((props, ref) => {
		const { center = false, timeout, color } = props

		const [ripples, setRipples] = React.useState([])
		const key = React.useRef(0)
		const container = React.useRef()
		const classes = useStyles()

		const addRipple = React.useCallback(
			(rippleX, rippleY, rippleSize) => {
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
			},
			[color, timeout]
		)

		const start = React.useCallback(
			e => {
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
			},
			[addRipple, center]
		)

		const stop = React.useCallback(() => {
			setRipples(oldRipples => (oldRipples.length > 0 ? oldRipples.slice(1) : oldRipples))
		}, [])

		React.useImperativeHandle(ref, () => ({ start, stop }), [start, stop])

		return (
			<span ref={container} className={classes.root}>
				<TransitionGroup component={null}>{ripples}</TransitionGroup>
			</span>
		)
	})
)

TouchRipple.useRipple = _useRipple

export default TouchRipple
