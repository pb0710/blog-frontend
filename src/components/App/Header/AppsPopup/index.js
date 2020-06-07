import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { IconButton, Popup } from 'ui'
import { ApplicationIcon } from 'ui/utils/icons'

const useStyles = makeStyles({
	root: {},
	notifyPopop: {
		right: 72
	}
})

export default function AppsPopup(props) {
	const {} = props

	const { popupRef, visible, handleShowPopup } = Popup.usePopupVisible()
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<IconButton focus={visible} onClick={handleShowPopup}>
				<ApplicationIcon />
			</IconButton>
			<Popup className={classes.notifyPopop} ref={popupRef} visible={visible}>
				APPS
			</Popup>
		</div>
	)
}
