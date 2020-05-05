import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Header from './Header'
import Sider from './Sider'

const useStyles = makeStyles({
	root: {
		position: 'fixed',
	},
})

export default function AppBar(props) {

	const {
		a
	} = props

	const [drawerOpened, setDrawerOpened] = useState(true)

	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Header drawerOpened={drawerOpened} setDrawerOpened={setDrawerOpened} />
			<Sider drawerOpened={drawerOpened} setDrawerOpened={setDrawerOpened} />
		</div>
	)
}