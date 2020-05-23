import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { IconButton, Button } from 'ui'
import { NotifyIcon } from 'ui/utils/icons'
import Popup from 'components/Popup'
import { usePopupVisible } from 'utils/hooks'

const useStyles = makeStyles({
	root: {}
})

export default function NotifyPopup(props) {
	const {} = props

	const { ref: popupRef, visible, handleBindPopup } = usePopupVisible()
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<IconButton focus={visible} onClick={handleBindPopup}>
				<NotifyIcon />
			</IconButton>
			<Popup ref={popupRef} visible={visible} onClick={handleBindPopup}>
				notify
				<Button>说的方法第三方</Button>
			</Popup>
		</div>
	)
}
