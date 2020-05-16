import React, { useState, useEffect, useMemo, useRef } from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'

const useStyles = makeStyles({
	root: ({ height }) => ({
		height,
		overflow: 'hidden',
		transition: 'height 250ms ease-out'
	})
})

export default function Collapse(props) {
	const { visible = false, children, className } = props

	const containerRef = useRef()

	const [initialHeight, setinitialHeight] = useState()

	const height = useMemo(() => (visible ? initialHeight : initialHeight ? 0 : 'auto'), [
		visible,
		initialHeight
	])

	useEffect(() => {
		const element = containerRef.current
		const elementHeight = element?.offsetHeight
		setinitialHeight(elementHeight)
	}, [])

	const classes = useStyles({ height })

	return (
		<div ref={containerRef} className={clsx(classes.root, className)}>
			{children}
		</div>
	)
}
