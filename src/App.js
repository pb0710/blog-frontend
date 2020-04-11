import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Paper, Button } from 'ui'

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    background: '#f6f6f6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    height: 300,
  },
  btn: {
    margin: 8,
    // color: 'red',
    // background: 'skyblue',
  }
})

function App() {
  const classes = useStyles()
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Button className={classes.btn}>默认</Button>
        <Button className={classes.btn} color="primary">主题</Button>
        <Button className={classes.btn} color="success">成功</Button>
        <Button className={classes.btn} color="warning">警告</Button>
        <Button className={classes.btn} color="error">错误</Button>
      </Paper>
    </div>
  )
}


export default App
