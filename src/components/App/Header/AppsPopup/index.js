import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Button, Popup } from 'sylas-react-ui'
import { ApplicationIcon } from 'ui/utils/icons'

const useStyles = makeStyles({
	root: {},
	notifyPopop: {
		top: 56,
		right: 72
	}
})

export default function AppsPopup(props) {
	const {} = props

	const { popupRef, visible, handleShowPopup } = Popup.usePopupVisible()
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Button.Icon focus={visible} onClick={handleShowPopup}>
				<ApplicationIcon />
			</Button.Icon>
			<Popup className={classes.notifyPopop} ref={popupRef} visible={visible}>
				APPS
			</Popup>
		</div>
	)
}
