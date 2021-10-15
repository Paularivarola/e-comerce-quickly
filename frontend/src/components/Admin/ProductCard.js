import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const ProductCard = (props) => {
    const { name, img, price, description } = props.data
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="150"
                image={`https://quickly-food.herokuapp.com${img}`}
                alt={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                    <p className='cardPrice'>${price}</p>
                </Typography>
                <div className='priceContainer'>
                    <p>{description}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProductCard