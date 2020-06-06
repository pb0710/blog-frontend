import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { IconButton, Popup, Button } from 'ui'
import { NotifyIcon } from 'ui/utils/icons'
// import { usePopupVisible } from 'ui/utils/hooks'

const useStyles = makeStyles({
	root: {},
	notifyPopop: {
		right: 120
	}
})

export default function NotifyPopup(props) {
	const {} = props

	const { popupRef, visible, handleShowPopup } = Popup.usePopupVisible()
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<IconButton focus={visible} onClick={handleShowPopup}>
				<NotifyIcon />
			</IconButton>
			<Popup className={classes.notifyPopop} ref={popupRef} visible={visible}>
				notify
				<Button>说的方法第三方</Button>
			</Popup>
		</div>
	)
}
