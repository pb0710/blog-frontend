import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Paper, Button, IconButton } from 'ui'

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    background: '#f6f6f6',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    height: 120,
  },
  test: {
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
        <Button className={classes.test}>默认</Button>
        <Button className={classes.test} color="primary">主题</Button>
        <Button className={classes.test} color="success">成功</Button>
        <Button className={classes.test} color="warning">警告</Button>
        <Button className={classes.test} color="error">错误</Button>
      </Paper>

      <Paper className={classes.paper}>
        <IconButton className={classes.test}>图</IconButton>
      </Paper>
    </div>
  )
}


export default App
