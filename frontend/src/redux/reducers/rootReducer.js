import { combineReducers } from 'redux'
import userReducer from './userReducer'
import productReducer from './productReducer'
import orderReducer from './orderReducer'

const rootReducer = combineReducers({
    users: userReducer,
    products: productReducer,
    orders: orderReducer
})

export default rootReducer