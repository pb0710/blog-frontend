import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Paper, Button, IconButton, List, ListItem, Dialog, Switch } from 'ui'

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    background: '#f6f6f6',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'auto',
  },
  paper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 600,
    height: 120,
    margin: 40,
  },
  test: {
    margin: 8,
  },
  list: {
    width: 240
  }
})

function App() {
  const classes = useStyles()
  const [visible, setVisible] = useState(false)

  const handleShowDialog = () => {
    setVisible(true)
  }

  const onConfirm = () => {
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const handleToggleSwitch = value => {
    // console.log('value', value)
  }

  return (
    <div className={classes.root}>
      <Dialog visible={visible} onConfirm={onConfirm} onCancel={handleCancel}>
        There are dialog of content
      </Dialog>

      <Paper className={classes.paper}>
        <Button className={classes.test}>默认</Button>
        <Button className={classes.test} color="primary">主题</Button>
        <Button className={classes.test} color="success">成功</Button>
        <Button className={classes.test} color="warning">警告</Button>
        <Button className={classes.test} color="error">错误</Button>
        <Button className={classes.test} color="primary" disabled={true}>禁用</Button>
      </Paper>

      <Paper className={classes.paper}>
        <IconButton className={classes.test}>图</IconButton>
        <IconButton className={classes.test}>标</IconButton>
        <IconButton className={classes.test}>Icon</IconButton>
        <IconButton disabled={true}>禁用</IconButton>
      </Paper>

      <Paper className={classes.paper} style={{ height: 200 }}>
        <List className={classes.list} bordered={true}>
          <ListItem>列表项</ListItem>
          <ListItem>这是一个列表1</ListItem>
          <ListItem>Bordered</ListItem>
          <ListItem>这是一个列表2</ListItem>
        </List>
        <List className={classes.list} bordered={false}>
          <ListItem bordered={false}>无边框列表项</ListItem>
          <ListItem bordered={false}>这是一个无边框列表1</ListItem>
          <ListItem bordered={false}>No bordered</ListItem>
          <ListItem bordered={false}>这是一个无边框列表2</ListItem>
        </List>
      </Paper>

      <Paper className={classes.paper} style={{ height: 300, flexDirection: 'column' }}>
        <Button color="primary" className={classes.test} onClick={handleShowDialog}>按钮</Button>
        <IconButton className={classes.test} onClick={handleShowDialog}>Icon</IconButton>
        <List className={classes.list} bordered={true}>
          <ListItem onClick={handleShowDialog}>列表项1</ListItem>
          <ListItem onClick={handleShowDialog}>列表项2</ListItem>
          <ListItem onClick={handleShowDialog}>列表项3</ListItem>
        </List>
        <Switch onChange={handleShowDialog} />
      </Paper>

      <Paper className={classes.paper}>
        <Switch onChange={handleToggleSwitch} />
        <Switch color="success" onChange={handleToggleSwitch} />
        <Switch color="warning" onChange={handleToggleSwitch} />
        <Switch color="error" onChange={handleToggleSwitch} />
        <Switch label="切换" defaultChecked={false} onChange={handleToggleSwitch} />
        <Switch disabled={true} defaultChecked={false} />
        <Switch disabled={true} label="禁用模式" />
      </Paper>
    </div>
  )
}


export default App
