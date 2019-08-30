import { combineReducers } from 'redux'

import { errorReducer } from '../reducers/error'
import { apiReducer } from '../reducers/api'
import { uiReducer } from '../reducers/ui'
import { userReducer } from '../reducers/user'
import { RESET_APP } from '../actions/root'

const appReducers = combineReducers({
    error: errorReducer,
    isMenuOpen: uiReducer,
    loggedInUser: userReducer,
    response: apiReducer
})

export const rootReducer = (state, action) => {
    if (action.type === RESET_APP) state = undefined
    return appReducers(state, action)
}