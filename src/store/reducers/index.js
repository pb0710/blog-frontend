import { combineReducers } from 'redux'
import * as common from './common'
import * as sider from '@/components/sider/store/reducer'
import * as global from '@/components/global/store/reducer'
import * as article from '@/views/articleDetail/store/reducer'

export default combineReducers({
	...common,
	sider: combineReducers(sider),
	global: combineReducers(global),
	article: combineReducers(article)
})
