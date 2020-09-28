import React from 'react'
import { Menu } from 'sylas-react-ui'
import { NavLink } from 'react-router-dom'
import style from '../style/index.module.scss'

function Nav(props) {
  const { navKey, level, to, title } = props
  return (
    <NavLink to={to}>
      <Menu.Item key={navKey} className={style[`level${level}`]}>
        {title}
      </Menu.Item>
    </NavLink>
  )
}

export default function NavMenu() {
  const navs = [
    {
      navKey: 0,
      level: 1,
      to: '/',
      title: '主页'
    },
    {
      navKey: 1,
      level: 1,
      to: '/upload',
      title: '发布'
    },
    {
      navKey: 3,
      level: 1,
      to: '/detail',
      title: '文章'
    },
    {
      navKey: 2,
      level: 1,
      title: '发布',
      child: [
        {
          navKey: 20,
          level: 2,
          to: '/',
          title: '子菜单0'
        },
        {
          navKey: 21,
          level: 2,
          to: '/',
          title: '子菜单1'
        }
      ]
    }
  ]

  return (
    <Menu className={style.menu}>
      {navs.map(nav =>
        nav.child ? (
          <Menu.SubMenu key={nav.navKey} className={style.level1} title={nav.title}>
            {nav.child.map(child => (
              <Nav key={child.navKey} {...child} />
            ))}
          </Menu.SubMenu>
        ) : (
          <Nav key={nav.navKey} {...nav} />
        )
      )}
    </Menu>
  )
}
