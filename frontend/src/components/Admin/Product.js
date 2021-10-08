import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from '../../styles/adminNewProduct.module.css'
import { useState } from 'react';
import Button from '@mui/material/Button';
import { MdOutlineSave } from 'react-icons/md'
import { connect } from 'react-redux';
import adminProductActions from '../../redux/actions/admin/adminProductActions';


const Product = (props) => {
    const [newProduct, setNewProduct] = useState()

    const inputHandler = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.name === 'img' ? e.target.files[0] : e.target.value
        })
    }
    console.log(newProduct)
    const createProduct = async (e) => {
        try {
            console.log('hola')
            // e.preventDefault()
            // if (!validatorFront()) return false
            const { name, category, price, stock, description, img } = newProduct
            const fd = new FormData()
            fd.append('name', name)
            fd.append('category', category)
            fd.append('price', price)
            fd.append('stock', stock)
            fd.append('description', description)
            fd.append('img', img)
            console.log('chao')
            props.createProduct(fd, props)
            // let response = await props.createProduct(newProduct)
            // if (!response.data.succes) throw new Error()
        } catch (error) {

        }
    }

    return (
        <div className={styles.newProductContainer}>
            <div className={styles.imagePreview}></div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div className={styles.pairInput}>
                    <TextField id="outlined-basic" name="name" label="Nombre" variant="outlined" fullWidth={true} onChange={inputHandler} />
                    <TextField id="outlined-basic" name="category" label="Categoría" variant="outlined" fullWidth={true} onChange={inputHandler} />
                </div>
                <div className={styles.pairInput}>
                    <TextField type="number" id="outlined-basic" name="price" label="Precio" variant="outlined" fullWidth={true} onChange={inputHandler} />
                    <TextField type="number" id="outlined-basic" name="stock" label="Stock" variant="outlined" fullWidth={true} onChange={inputHandler} />
                </div>
                <TextField id="outlined-basic" name="descripcion" label="Descripción" variant="outlined" multiline rows={4} fullWidth={true} onChange={inputHandler} />
                <TextField id="outlined-basic" name="ingredients" label="Ingredientes" variant="outlined" fullWidth={true} onChange={inputHandler} />
                <input type='file' id="outlined-basic" name="img" fullWidth={true} onChange={inputHandler} />
                <Button variant="contained" color="info" size="medium" onClick={createProduct}><MdOutlineSave />Guardar</Button>

                {/* <TextField id="filled-basic" label="Filled" variant="filled" />
                <TextField id="standard-basic" label="Standard" variant="standard" /> */}
            </Box>
        </div>
    )
}

const mapDispatchToProps = {
    createProduct: adminProductActions.createProduct
}

export default connect(null, mapDispatchToProps)(Product)
