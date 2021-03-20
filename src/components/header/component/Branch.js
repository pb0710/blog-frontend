import React from 'react'
import style from '../style/index.module.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery, useScrollToTop } from '@/utils/hooks'
import { updateDrawer } from '@/components/sider/store/action'

function Branch(props) {
	const { to = '', name = 'BLOG' } = props
	const dispatch = useDispatch()
	const theme = useSelector(state => state.setting.theme)
	const isMobile = useMediaQuery('(max-width:600px)')
	const { run: doScroll } = useScrollToTop(true)
	const handleClickBranch = () => {
		doScroll()
		if (isMobile) dispatch(updateDrawer(false))
	}
	return (
		<Link className={style[`branch_${theme}`]} to={to} onClick={handleClickBranch}>
			<span>{name}</span>
		</Link>
	)
}

export default React.memo(Branch)
