import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { IconButton } from 'ui'
import { NotifyIcon } from 'ui/utils/icons'
import Popup from 'components/Popup'
import { usePopupVisible } from 'utils/hooks'

const useStyles = makeStyles({
	root: {}
})

export default function NotifyPopup(props) {
	const {} = props

	const { visible, handleTogglePopup } = usePopupVisible()
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<IconButton focus={visible} onClick={handleTogglePopup}>
				<NotifyIcon />
			</IconButton>
			<Popup visible={visible} onClick={handleTogglePopup}>
				notify
			</Popup>
		</div>
	)
}
