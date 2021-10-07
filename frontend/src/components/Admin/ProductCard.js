import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ProductCard = (props) => {
    const { name, image, price } = props.data
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="150"
                image={image}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                    <p className='cardPrice'>${price}</p>
                </Typography>
                <div className='priceContainer'>
                    <p>Pedidos: <span>25</span></p>
                    <p>Ingresos: <span>$3.750</span></p>
                </div>
            </CardContent>
            <CardActions>
                <Button size="small">Ver Producto</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard