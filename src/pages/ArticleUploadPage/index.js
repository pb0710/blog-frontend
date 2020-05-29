import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useParams } from 'react-router-dom'
import FlexablePage from 'components/FlexablePage'
import * as api from 'apis'
import { Paper, Input } from 'ui'

const useStyles = makeStyles({
	root: {},
	container: {
		width: 1048,
		padding: '0 16px',
		margin: 0,
		position: 'absolute',
		top: 68
	},
	uploadWrapper: {
		width: 792,
		marginBottom: 16
	}
})

export default function ArticlePage(props) {
	const {} = props
	const { id } = useParams()
	const classes = useStyles()

	return (
		<FlexablePage className={classes.root}>
			<div className={classes.container}>
				<Paper className={classes.uploadWrapper}>
					<Input />
				</Paper>
			</div>
		</FlexablePage>
	)
}
