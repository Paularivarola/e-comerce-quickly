const orderReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case "GET_USER_ORDERS":
			return { ...state, orders: action.payload }

		case "CREATE_ORDER":
			return { ...state, orders: [action.payload, ...state.orders] }

		case "CANCEL_ORDER":
			return {
				...state,
				orders: state.orders.filter(
				(order) => order._id !== action.payload._id
				),
			}
	}
}

export default orderReducer