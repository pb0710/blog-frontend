import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Input, Popup, List, ListItem } from 'ui'
import { usePopupVisible } from 'ui/utils/hooks'
import { flexCenter } from 'utils/styles'

const useStyles = makeStyles({
	root: {
		...flexCenter,
		justifyContent: 'space-between',
		margin: '0 auto',
		position: 'relative'
	},
	searchInput: {
		background: 'rgba(250,250,250,.8)',
		width: 240,
		height: 30
	},
	searchResult: {
		width: 360,
		minHeight: 280,
		top: 64,
		left: 'calc(50% - 180px)'
	}
})

export default function Search(props) {
	const {} = props

	const { popupRef, triggerRef, visible, handleBindPopup } = usePopupVisible(true, true)
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Input ref={triggerRef} className={classes.searchInput} search={true} onClick={handleBindPopup} />
			<Popup ref={popupRef} className={classes.searchResult} visible={visible} onClick={handleBindPopup}>
				<List bordered={false}>
					<ListItem rippleMuted={true} linked={true} to="/">
						时代发生地方
					</ListItem>
					<ListItem rippleMuted={true} linked={true} to="/article/frontend">
						时代发生地方
					</ListItem>
					<ListItem rippleMuted={true} linked={true} to="/setting">
						时代发生地方
					</ListItem>
				</List>
			</Popup>
		</div>
	)
}
