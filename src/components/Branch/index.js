import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'sylas-react-ui'
import { flexCenter } from 'utils/styles'

const useStyles = makeStyles({
	root: {
		...flexCenter,
		fontSize: 24,
		fontWeight: 600,
		paddingLeft: 24,
		paddingRight: 16,
		color: '#409eff',
		userSelect: 'none'
	}
})

export default function Branch(props) {
	const { mainRoute = '/' } = props

	const classes = useStyles()

	return (
		<Link className={classes.root} to={mainRoute}>
			Blog
		</Link>
	)
}
