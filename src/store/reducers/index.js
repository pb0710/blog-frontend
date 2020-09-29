import { combineReducers } from 'redux'
import * as common from './common'
import * as sider from '@/components/sider/store/reducer'
import * as article from '@/pages/articleDetail/store/reducer'

export default combineReducers({
  ...common,
  sider: combineReducers(sider),
  article: combineReducers(article)
})
