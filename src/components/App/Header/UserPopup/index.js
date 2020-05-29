import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { IconButton, Popup, Button, Link } from 'ui'
import { UserIcon } from 'ui/utils/icons'
import { usePopupVisible } from 'ui/utils/hooks'

const useStyles = makeStyles({
	root: {},
	popup: {
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: 16
	}
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
			<Popup className={classes.popup} ref={popupRef} visible={visible} onClick={handleBindPopup}>
				<Link to="/article_upload">
					<Button color="primary">发布文章</Button>
				</Link>
			</Popup>
		</div>
	)
}
