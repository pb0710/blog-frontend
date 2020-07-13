import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Input, Popup, List } from 'sylas-react-ui'
// import { usePopupVisible } from 'ui/utils/hooks'
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

	const { popupRef, triggerRef, visible, handleShowPopup } = Popup.usePopupVisible({ clickPopupHide: true })
	const classes = useStyles()

	const handleInput = value => {
		console.log('value: ', value)
	}

	return (
		<div className={classes.root}>
			<Input.Search
				ref={triggerRef}
				className={classes.searchInput}
				type="search"
				onClick={handleShowPopup}
				onChange={handleInput}
			/>
			<Popup ref={popupRef} className={classes.searchResult} visible={visible}>
				<List bordered={false}>
					<List.Item rippleMuted hovered linked to="/">
						时代发生地方
					</List.Item>
					<List.Item rippleMuted hovered linked to="/article/frontend">
						时代发生地方
					</List.Item>
					<List.Item rippleMuted hovered linked to="/setting">
						时代发生地方
					</List.Item>
				</List>
			</Popup>
		</div>
	)
}
