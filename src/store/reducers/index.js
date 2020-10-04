import { combineReducers } from 'redux'
import * as common from './common'
import * as sider from '@/components/sider/store/reducer'
import * as modal from '@/components/modal/store/reducer'
import * as article from '@/pages/articleDetail/store/reducer'

export default combineReducers({
  ...common,
  sider: combineReducers(sider),
  modal: combineReducers(modal),
  article: combineReducers(article)
})
