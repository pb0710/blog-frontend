import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { IconButton, Popup } from 'ui'
import { UserIcon } from 'ui/utils/icons'
import { usePopupVisible } from 'ui/utils/hooks'

const useStyles = makeStyles({
	root: {}
})

export default function UserPopup(props) {
	const {} = props

	const { popupRef, visible, handleBindPopup } = usePopupVisible(false, true)
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<IconButton focus={visible} onClick={handleBindPopup}>
				<UserIcon />
			</IconButton>
			<Popup ref={popupRef} visible={visible} onClick={handleBindPopup}>
				user
			</Popup>
		</div>
	)
}
