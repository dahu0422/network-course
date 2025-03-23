import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk' // 处理异步操作, redux 本身只能处理同步操作
import accountReducer from './features/accounts/accountSlice'
import customerReducer from './features/customers/customerSlice'

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store

