import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Button, Popup } from 'sylas-react-ui'
import { BellOutlined } from '@ant-design/icons'

const useStyles = makeStyles({
	root: {},
	notifyPopop: {
		top: 56,
		right: 128
	}
})

export default function NotifyPopup(props) {
	const {} = props

	const { popupRef, visible, handleShowPopup } = Popup.usePopupVisible()
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Button.Icon focus={visible} onClick={handleShowPopup}>
				<BellOutlined />
			</Button.Icon>
			<Popup className={classes.notifyPopop} ref={popupRef} visible={visible} direction="top-right">
				notify
				<Button>说的方法第三方</Button>
			</Popup>
		</div>
	)
}
