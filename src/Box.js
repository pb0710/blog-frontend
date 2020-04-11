import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
		width: 200,
		height: 200,
		// background: 'skyblue',
  }
  
})

function Box() {
	const clasess = useStyles()
  return (
		<div className={{clasess}}>似懂非懂房贷首付</div>
  )
}

export default Box