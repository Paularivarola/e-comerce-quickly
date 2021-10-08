import axios from 'axios'

const adminOrderActions = {
    getOrders: () => {
        let token = localStorage.getItem("token");
        return async (dispatch) => {
            let response = await axios.get(
                "http://localhost:4000/api/admin/orders",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            if (response.data.success) {
                await dispatch({ type: "GET_ORDERS", payload: response.data.response });
                return response.data;
            }
        };
    },
    updateOrder: (updated, orderId) => {
        let token = localStorage.getItem("token");
        return async (dispatch) => {
            let response = await axios.put('http:localhost:4000/api/admin/order/' + orderId, updated, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            if (response.data.success) {
                await dispatch({ type: 'UPDATE_ORDER', payload: updated })
                return response.data
            }
        }
    },
    deleteOrder: (orderId) => {
        let token = localStorage.getItem("token");
        return async (dispatch) => {
            let response = await axios.delete('http://localhost:4000/api/admin/order/' + orderId, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            if (response.data.success) {
                await dispatch({ type: "DELETE_ORDER", payload: orderId })
                return response.data
            }
        }

    }
}

export default adminOrderActions