import { combineReducers } from 'redux'
import userReducer from './userReducer'
import productReducer from './productReducer'
import orderReducer from './orderReducer'
import adminUserReducer from './admin/adminUserReducer'
import adminProductReducer from './admin/adminProductReducer'
import adminOrderReducer from './admin/adminOrderReducer'

const rootReducer = combineReducers({
    users: userReducer,
    products: productReducer,
    orders: orderReducer,
    adminUsers: adminUserReducer,
    adminProducts: adminProductReducer,
    adminOrders: adminOrderReducer
})

export default rootReducer