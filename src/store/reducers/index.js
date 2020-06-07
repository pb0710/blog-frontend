import { combineReducers } from 'redux'
import * as common from './common'
import * as user from './user'

export default combineReducers({
	...common,
	user: combineReducers(user)
})
