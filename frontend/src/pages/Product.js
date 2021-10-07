import styles from '../styles/product.module.css'
import { ImCancelCircle } from "react-icons/im";
import { useEffect, useState } from 'react';

const Product = () => {
    const price = 100 //debería venir por props
    var [sizeFries, setSizeFries] = useState(0)
    const [totalAmount, setTotalAmount] = useState(1)
    var [extras, setExtras] = useState([])
    const [unitaryPrice, setUnitaryPrice] = useState(price)
    const [totalPrice, setTotalPrice] = useState(unitaryPrice)

    const amount = (operation) => {
        if(operation==="sum"){
            setTotalAmount(totalAmount + 1)
        } else {
            if(totalAmount > 1){
                setTotalAmount(totalAmount - 1)
            }
        }
    }

    const addFries = (fries) => {
        setSizeFries(fries)
    }

    const addExtras = (extra) => {
        if(!extras.includes(extra)) {
            setExtras([...extras, extra])
        } else {
            setExtras(extras.filter((e) => e !== extra))
        }
    }

    useEffect(() => {
        console.log(extras)
        setUnitaryPrice(price + sizeFries + (extras.length*10))
    }, [sizeFries, extras])
    
    useEffect(() => {
        setTotalPrice(unitaryPrice*totalAmount)
    },[unitaryPrice ,totalAmount])

    const addToCart = () => {
        console.log("agregar a mi orden!!!")
    }

    return (
        <main className={styles.main}>
            <div className={styles.card}>
                <ImCancelCircle className={styles.exit}/>

                <div className={styles.product}>
                    <div className={styles.cardInfo}>

                        <div className={styles.title}>
                            <h1>Super Hamburguesa</h1>
                            <p>La más grande la más bella</p>
                        </div>
                        
                        <div className={styles.title}>
                            <h3>Descripcion:</h3>
                            <p>Hamburguesa de carne 100% vacuna, salsa casera, cheddar, lechuga, tomate, cebolla, 
                                pan de papa. Incluye porción de papas</p>
                        </div>
                        
                        <div className={styles.order}>
                            <div className={styles.amount}>
                                <p className={styles.amountButton} onClick={() => amount("res")}>-</p>
                                <p>{totalAmount}</p>
                                <p className={styles.amountButton} onClick={() => amount("sum")}>+</p>
                            </div>
                            <p className={styles.addToCart} onClick={addToCart}>Agregar a mi orden</p>
                        </div>

                    </div>

                    <img className={styles.cardPicture} src="https://i.postimg.cc/yWq5xyLZ/hamburguesas.png"/>

                    <div className={styles.cardPrice}>
                        <div className={styles.choices}>
                            <div>
                                <h3 className={styles.h3}>Tamaño papas</h3>
                                <div>
                                    <input type="radio" name="papas" value="chicas" id="chicas" defaultChecked onClick={() => addFries(0)}/>
                                    <label className={styles.input} for="chicas">Chicas</label>
                                </div>
                                <div>
                                    <input type="radio" name="papas" value="medianas" id="medianas" onClick={() => addFries(10)}/>
                                    <label className={styles.input} for="medianas">Medianas <span className={styles.span}>USD 10</span></label>
                                </div>
                                <div>
                                    <input type="radio" name="papas" value="grandes" id="grandes" onClick={() => addFries(20)}/>
                                    <label className={styles.input} for="grandes">Grandes <span className={styles.span}>USD 20</span></label>
                                </div>
                            </div>
                            <div>
                                <h3 className={styles.h3}>Extras</h3>
                                <div>
                                    <input type="checkbox" name="extras" value="carne" id="carne" onClick={() => addExtras("carne")}/>
                                    <label className={styles.input} for="carne">Carne <span className={styles.span}>USD 10</span></label>
                                </div>
                                <div>
                                    <input type="checkbox" name="extras" value="queso" id="queso" onClick={() => addExtras("queso")}/>
                                    <label className={styles.input} for="queso">Queso <span className={styles.span}>USD 10</span></label>
                                </div>
                                <div>
                                    <input type="checkbox" name="extras" value="cebolla" id="cebolla" onClick={() => addExtras("cebolla")}/>
                                    <label className={styles.input} for="cebolla">Cebolla <span className={styles.span}>USD 10</span></label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4>Unidad: USD {unitaryPrice}</h4>
                            <h2>Total: USD {totalPrice}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Product