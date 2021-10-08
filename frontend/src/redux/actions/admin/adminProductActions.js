import axios from 'axios'

const adminProductActions = {
    createProduct: (product, props) => {
        let token = localStorage.getItem("token");
        return async (dispatch) => {
            let response = await axios.post(
                "http://localhost:4000/api/admin/productos",
                product,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            console.log(response.data)
            if (response.data.success) {
                await dispatch({ type: "ADD_PRODUCT", payload: response.data.response });
                return response.data;
            }
        };
    },
    updateProduct: (updated, productId) => {
        let token = localStorage.getItem("token");
        return async (dispatch) => {
            let response = await axios.put('http:localhost:4000/api/admin/producto/' + productId, updated, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            if (response.data.success) {
                await dispatch({ type: 'UPDATE_PRODUCT', payload: updated })
                return response.data
            }
        }
    },
    deleteProduct: (productId) => {
        let token = localStorage.getItem("token");
        return async (dispatch) => {
            let response = await axios.delete('http://localhost:4000/api/admin/producto/' + productId, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            if (response.data.success) {
                await dispatch({ type: "DELETE_PRODUCT", payload: productId })
                return response.data
            }
        }

    }
}

export default adminProductActions