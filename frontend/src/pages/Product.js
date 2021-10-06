import { useEffect } from 'react'
import styles from '../styles/product.module.css'
import { connect } from "react-redux"
import productActions from '../redux/actions/productActions'
const Product = (props) => {
    useEffect(() => {
        props.getProd()
    },[])
    return (
        <h1>Product</h1>
    )
}
const mapDispachToProps = {
    getProd: productActions.getProducts
}

export default connect(null, mapDispachToProps)(Product)