import styles from '../styles/productCard.module.css'
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs"
import { MdShoppingCart } from "react-icons/md"

const ProductCard = () => {

    let star = <BsStar style={{ color: 'rgb(216, 205, 56)', fontSize: '1.3em', marginRight: '5%' }}/>
    let starHalf = <BsStarHalf style={{ color: 'rgb(216, 205, 56)', fontSize: '1.3em', marginRight: '5%' }}/>
    let starFill = <BsStarFill style={{ color: 'rgb(216, 205, 56)', fontSize: '1.3em', marginRight: '5%' }}/>

        //         img: '/assets/pizzas.jpeg',
        //         name: 'nombre producto',
        //         category: 'categoria',
        //         description: 'Cómo se llama el campeón de buceo japonés -Tokofondo. Y el subcampeón - Kasitoko',
        //         price: '550',
        //         ingredients: 'jamon, tomate, muzzarella',
        //         stock: 'ni idea',

    return (
        <div className="products">
            <div className="product">
                <div className={styles.productBox}>
                    <div className={styles.productImg} style={{backgroundImage: 'url("/assets/pizzas.jpeg")'}}></div>
                    <div className={styles.productInfo}>
                        <h3>Nombre producto</h3>
                        <p>Acá va a ir toda la descripción</p>
                        <p>Acá van a ir los Ingredientes</p>
                    </div>
                </div>
                <hr className={styles.line}></hr>
                <div className={styles.priceBox}>
                    <p><span>Price: </span>$ 550</p>
                    <div className={styles.calification}>
                        {starFill}
                        {starFill}
                        {starFill}
                        {starHalf}
                        {star}
                    </div>
                </div>
                <button className={styles.addBtn}><MdShoppingCart style={{ color: 'white', fontSize: '1.8em', marginRight: '5%' }}/> +</button>
            </div>
        </div>
    )
}

export default ProductCard

// import styles from '../styles/productCard.module.css'

// const ProductCard = () => {

//     const products = [
//         {
//         img: '/assets/pizzas.jpeg',
//         name: 'nombre producto',
//         category: 'categoria',
//         description: 'Cómo se llama el campeón de buceo japonés -Tokofondo. Y el subcampeón - Kasitoko',
//         price: '550',
//         ingredients: 'jamon, tomate, muzzarella',
//         stock: 'ni idea',
//         },
//         {
//         img: '/assets/pizzas.jpeg',
//         name: 'nombre producto',
//         category: 'categoria',
//         description: 'Cómo se llama el campeón de buceo japonés -Tokofondo. Y el subcampeón - Kasitoko',
//         price: '550',
//         ingredients: 'jamon, tomate, muzzarella',
//         stock: 'ni idea',
//         },
//         {
//         img: '/assets/pizzas.jpeg',
//         name: 'nombre producto',
//         category: 'categoria',
//         description: 'Cómo se llama el campeón de buceo japonés -Tokofondo. Y el subcampeón - Kasitoko',
//         price: '550',
//         ingredients: 'jamon, tomate, muzzarella',
//         stock: 'ni idea',
//         },
//         {
//         img: '/assets/pizzas.jpeg',
//         name: 'nombre producto',
//         category: 'categoria',
//         description: 'Cómo se llama el campeón de buceo japonés -Tokofondo. Y el subcampeón - Kasitoko',
//         price: '550',
//         ingredients: 'jamon, tomate, muzzarella',
//         stock: 'ni idea',
//         },
//         {
//         img: '/assets/pizzas.jpeg',
//         name: 'nombre producto',
//         category: 'categoria',
//         description: 'Cómo se llama el campeón de buceo japonés -Tokofondo. Y el subcampeón - Kasitoko',
//         price: '550',
//         ingredients: 'jamon, tomate, muzzarella',
//         stock: 'ni idea',
//         },
//         {
//         img: '/assets/pizzas.jpeg',
//         name: 'nombre producto',
//         category: 'categoria',
//         description: 'Cómo se llama el campeón de buceo japonés -Tokofondo. Y el subcampeón - Kasitoko',
//         price: '550',
//         ingredients: 'jamon, tomate, muzzarella',
//         stock: 'ni idea',
//         },
//     ]

//     return (
//         <div>
//             <h3>Titulo de categoria</h3>
//             <div className="products">
//                 {products.map((product, index) => {
//                     <div className="product" key={index}>
//                         <div className="imageProduct" style={{backgroundImage: `url("${product.img}")`}}>
//                         </div>
//                         <div className="productTitle">
//                             <h2>{product.name}</h2>
//                             <h3 className="price">$ {product.price}</h3>
//                         </div>
//                         <div className="productDescription">
//                             <p>{product.price}</p>
//                         </div>
//                         <div>
//                             estrellitas
//                         </div>
//                         <div className="productButton">
//                             <button>comprar</button>
//                             <button>no comprar</button>
//                         </div>
//                     </div>
//                 })}
//             </div>
//         </div>
//     )
// }

// export default ProductCard