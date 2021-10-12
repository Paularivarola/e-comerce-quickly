import * as React from 'react';
import TextField from '@mui/material/TextField';
import styles from '../../styles/adminNewProduct.module.css'
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { MdOutlineSave, MdLibraryAdd, MdUploadFile } from 'react-icons/md'
import { connect } from 'react-redux';
import adminProductActions from '../../redux/actions/admin/adminProductActions';
import { message } from './Message';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';

const Product = (props) => {
    const { edited } = props
    const [chosen, setChosen] = useState([{
        name: '',
        category: '',
        price: null,
        stock: null,
        description: '',
        ingredients: null,
        img: '',
        key: 0
    }])
    const defaultName = edited ? chosen[0].name : ''
    const defaultCategory = edited ? chosen[0].category : ''
    const defaultPrice = edited ? chosen[0].price : ''
    const defaultStock = edited ? chosen[0].stock : ''
    const defaultDescription = edited ? chosen[0].description : ''
    const defaultIngredients = edited && chosen[0].ingredients ? chosen[0].ingredients[0].replaceAll(' ', '').split(',') : ''
    const defaultPic = edited && chosen[0].img
    const [newProduct, setNewProduct] = useState({ ingredients: [] })
    const [ingredients, setIngredients] = useState({})
    const [number, setNumber] = useState([1, 1, 1,])
    const [file, setFile] = useState('/assets/tarjeta.png')
    const [saving, setSaving] = useState(false)
    const [update, setUpdate] = useState({})

    useEffect(() => {
        setChosen(props.products.filter(product => product._id === window.location.pathname.slice(24)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const inputHandler = (e) => {
        if (e.target.name.includes('ingredient')) {
            setIngredients({
                ...ingredients,
                [e.target.name]: e.target.value
            })
        } else {
            setNewProduct({
                ...newProduct,
                [e.target.name]: e.target.name === 'img' ? e.target.files[0] : e.target.value
            })
        }
        if (e.target.name === 'img') {
            const newFile = URL.createObjectURL(e.target.files[0])
            setFile(newFile)
        }
    }

    const blurHandler = () => {
        const ingredientsList = Object.values(ingredients)
        setNewProduct({
            ...newProduct,
            ingredients: ingredientsList
        })
    }

    const createProduct = async (e) => {
        setSaving(true)
        try {
            if (!newProduct.name) {
                throw new Error('Ingrese el nombre del producto.')
            } else if (!newProduct.category) {
                throw new Error('Ingrese la categoría del producto.')
            } else if (!newProduct.price) {
                throw new Error('Ingrese el precio del producto.')
            } else if (!newProduct.stock) {
                throw new Error('Ingrese el stock inicial.')
            } else if (!newProduct.description) {
                throw new Error('Ingrese la descripción del producto.')
            } else if (!newProduct.ingredients.length) {
                throw new Error('Debe ingresar al menos 1 ingrediente.')
            } else if (!newProduct.img) {
                throw new Error('Debe cargar una imágen para el producto')
            }
            const { name, category, price, stock, description, img, ingredients } = newProduct
            const fd = new FormData()
            fd.append('name', name)
            fd.append('category', category)
            fd.append('price', price)
            fd.append('stock', stock)
            fd.append('description', description)
            fd.append('img', img)
            fd.append('ingredients', ingredients)
            let response = await props.createProduct(fd, props)
            console.log(response)
            if (response.success) {
                message('success', 'Producto añadido exitosamente')
            }
        } catch (error) {
            message('error', error)
        }
        setSaving(false)
    }

    const updateProduct = () => {
        setSaving(true)
        alert('hola')
    }


    return (
        <div className={styles.newProductContainer}>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <div className={styles.formContainer}>
                    <div className={styles.imageContainer}>
                        <div className={styles.imagePreview} style={{ backgroundImage: `url('${edited ? `${defaultPic}` : file}')` }}></div>
                        <label htmlFor='upload'>
                            <span className={styles.uploadButton}><MdUploadFile />Subir imagen</span>
                        </label>
                        <input style={{ display: 'none' }} type='file' id="upload" name="img" onChange={inputHandler} />

                    </div>
                    <div className={styles.inputContainer}>
                        <div className={styles.textarea}>
                            <TextField name="name" label="Nombre" variant="outlined" multiline onChange={inputHandler} defaultValue={defaultName} />
                            <TextField name="category" label="Categoría" variant="outlined" multiline onChange={inputHandler} defaultValue={defaultCategory} />
                            <TextField type="number" name="price" label="Precio" variant="outlined" multiline onChange={inputHandler} defaultValue={defaultPrice} />
                            <TextField type="number" name="stock" label="Stock" variant="outlined" multiline onChange={inputHandler} defaultValue={defaultStock} />
                            <TextField name="description" label="Descripción" variant="outlined" multiline rows={3} onChange={inputHandler} defaultValue={defaultDescription} />
                        </div>
                        <div className={styles.button}>
                            <Button variant="contained" color="info" size="medium" onClick={() => setNumber([...number, 1])}><MdLibraryAdd />Agregar Campo</Button>

                            <div className={styles.ingredientContainer} id='inputs'>
                                {edited && chosen[0].ingredients && defaultIngredients.map((ingredient, index) => <TextField name={`ingredient${index}`} label="Ingrediente" variant="outlined" onChange={inputHandler} onBlur={blurHandler} key={index} multiline defaultValue={ingredient} />)}
                                {number.map((number, index) => <TextField name={`ingredient${index}`} label="Ingrediente" variant="outlined" onChange={inputHandler} onBlur={blurHandler} key={index} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
            {edited
                ? <Button variant="contained" color="info" size="medium" onClick={updateProduct} disabled={saving && true} ><MdOutlineSave />Actualizar</Button>
                : <Button variant="contained" color="info" size="medium" onClick={createProduct} disabled={saving && true} ><MdOutlineSave />Guardar</Button>
            }
            {saving &&
                <Box sx={{ width: '30%', margin: '0 auto' }}>
                    <LinearProgress />
                    <Typography>{edited ? 'Actualizando...' : 'Guardando...'}</Typography>
                </Box>}
        </div>
    )
}

const mapDispatchToProps = {
    createProduct: adminProductActions.createProduct,
    editProduct: adminProductActions.updateProduct
}

const mapStateToProps = state => {
    return {
        products: state.products.products
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
