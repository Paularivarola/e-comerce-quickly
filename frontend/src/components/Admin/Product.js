import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from '../../styles/adminNewProduct.module.css'
const Product = () => {
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
                    <TextField id="outlined-basic" label="Nombre" variant="outlined" fullWidth={true} />
                    <TextField id="outlined-basic" label="Categoría" variant="outlined" fullWidth={true} />
                </div>
                <div className={styles.pairInput}>
                    <TextField id="outlined-basic" label="Precio" variant="outlined" fullWidth={true} />
                    <TextField id="outlined-basic" label="Stock" variant="outlined" fullWidth={true} />
                </div>
                <TextField id="outlined-basic" label="Descripción" variant="outlined" multiline rows={4} />
                <TextField id="outlined-basic" label="Ingredientes" variant="outlined" />

                {/* <TextField id="filled-basic" label="Filled" variant="filled" />
                <TextField id="standard-basic" label="Standard" variant="standard" /> */}
            </Box>
        </div>
    )
}

export default Product
