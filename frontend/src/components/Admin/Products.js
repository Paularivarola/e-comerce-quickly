import styles from '../../styles/customer.module.css'
import * as React from 'react';
import { useState, useRef } from 'react'
import { connect } from 'react-redux';
import ProductList from './ProductList';
import NoResults from './NoResults';

const Products = (props) => {
    window.scrollTo(0, 0)
    const allProducts = props.products
    const [filtered, setFiltered] = useState(props.products)
    let catList = []
    const inputName = useRef()
    const inputCategory = useRef()

    props.products.map(product => {
        if (!catList.includes(product.category)) {
            return catList.push(product.category)
        }
        return true
    })

    const handleChange = (e) => {
        setFiltered(allProducts.filter(product => product.name.toLowerCase().includes(inputName.current.value.toLowerCase()) && product.category.includes(inputCategory.current.value)))
    }

    return (
        <section className={styles.customerContainer}>
            <div className={styles.infoTable}>
                <div className={styles.tableHeader}>
                    <h2>Productos</h2>
                </div>
                <hr />
                <div className={styles.filterContainer}>
                    <div style={{ width: '100%' }}>Filtrar por:</div>
                    <div>
                        <label htmlFor='nameSearch'>Nombre</label>
                        <input ref={inputName} name='name' id="nameSearch" label="Nombre" variant="outlined" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='categorySearch'>Categoría</label>
                        <select
                            id="categorySearch"
                            onChange={handleChange}
                            name='category'
                            ref={inputCategory}
                        >
                            <option value=''>Todas las categorías</option>
                            {catList.map(category => <option value={category} key={category}>{category}</option>)}
                        </select>
                    </div>
                </div>
                <span className={styles.results}>{`Mostrando ${filtered.length} productos de ${allProducts.length}`}</span>
                <div className={styles.tableContainer}>
                    <table className={styles.customersTable}>
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre Producto</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(product => <ProductList product={product} key={product._id} setView={props.setView} />)}
                        </tbody>
                        <tfoot>

                        </tfoot>
                    </table>
                </div>
                {!filtered.length && <NoResults />}
            </div>
        </section >
    )
}

const mapStateToProps = state => {
    return {
        products: state.adminProducts.products,
    }
}

export default connect(mapStateToProps)(Products)