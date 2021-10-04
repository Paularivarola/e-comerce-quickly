import { combineReducers } from 'redux'
import userReducer from './userReducer'
import productReducer from './productReducer'


const rootReducer = combineReducers({
    users: userReducer,
    products: productReducer
})

export default rootReducer