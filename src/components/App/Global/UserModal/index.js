import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'
import Mask from 'components/Mask'
import Register from './Register'
import Login from './Login'
import SSO from './SSO'

const useStyles = makeStyles({
	root: {}
})

export default function UserModal(props) {
	const {} = props

	const classes = useStyles()
	const userStep = useSelector(state => state.user.step)

	const goToStep = step => {
		switch (step) {
			case 'register':
				return <Register />
			case 'login':
				return <Login />
			case 'sso':
				return <SSO />
			default:
				console.error('无效的：', step)
				break
		}
	}

	return <Mask className={classes.root}>{goToStep(userStep)}</Mask>
}
