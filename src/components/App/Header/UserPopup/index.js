import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { IconButton } from 'ui'
import { UserIcon } from 'ui/utils/icons'
import Popup from 'components/Popup'
import { usePopupVisible } from 'utils/hooks'

const useStyles = makeStyles({
	root: {}
})

export default function UserPopup(props) {
	const {} = props

	const { visible, handleTogglePopup } = usePopupVisible()
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<IconButton focus={visible} onClick={handleTogglePopup}>
				<UserIcon />
			</IconButton>
			<Popup visible={visible}>user</Popup>
		</div>
	)
}
