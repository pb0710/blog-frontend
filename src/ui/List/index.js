import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'

const useStyles = makeStyles({
	root: {
		boxSizing: 'border-box',
		position: 'relative',
		minWidth: 200,
		minHeight: 80,
		margin: 0,
		padding: 0,
		background: '#fff',
		border: ({ bordered }) => bordered ? '1px solid #e2e2e2' : 0,
		borderRadius: 2,
		overflow: 'hidden',
	},
})

function List({ children, className, bordered = true }) {

	const classes = useStyles({ bordered })

	return (
		<ul className={clsx(classes.root, className)}>
			{children}
		</ul>
	)
}

export default React.memo(List)