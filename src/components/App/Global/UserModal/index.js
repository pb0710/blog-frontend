import React, { useMemo } from 'react'
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

	const goToStep = useMemo(() => {
		switch (userStep) {
			case 'REGISTER':
				return <Register />
			case 'LOGIN':
				return <Login />
			case 'SSO':
				return <SSO />
			default:
				console.error('无效的Step：', userStep)
				break
		}
	}, [userStep])

	return <Mask className={classes.root}>{goToStep}</Mask>
}
