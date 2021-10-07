import styles from '../styles/product.module.css'
import { connect } from 'react-redux'
import productActions from '../redux/actions/productActions'
import { ImCancelCircle } from 'react-icons/im'
import { useEffect, useState } from 'react'

const Product = ({ product, setMod, ...props }) => {
  console.log(product)
  // useEffect(() => {
  //     props.getProd()
  // }, [])
  //   const product = {
  //     //debería venir por props
  //     name: 'Super Hamburguesa',
  //     img: 'https://i.postimg.cc/yWq5xyLZ/hamburguesas.png',
  //     category: '', //para vicular con los extras (?
  //     description: 'Hamburguesa de carne 100% vacuna, salsa casera, cheddar, lechuga, tomate, cebolla, pan de papa. Incluye porción de papas chicas',
  //     price: 100,
  //     ingredients: '', //ni idea dónde usar esto
  //     stock: 10,
  //   }
  const sizeFries = [
    { size: 'Chicas', cost: 0 },
    { size: 'Medianas', cost: 10 },
    { size: 'Grandes', cost: 20 },
  ] //debería venir de props y si no existe debe ser []
  const extrasChoices = [
    { type: 'Carne', cost: 20 },
    { type: 'Queso', cost: 10 },
    { type: 'Cebolla', cost: 5 },
    { type: 'Gaseosa 500cc', cost: 35 },
  ] //debería venir de props y estar siempre (aunque sea una gaseosa)

  const [fries, setFries] = useState('Chicas')
  const [extras, setExtras] = useState([])
  const [extrasCost, setExtrasCost] = useState(0)
  const [totalAmount, setTotalAmount] = useState(1)
  const [unitaryPrice, setUnitaryPrice] = useState(product.price)
  const [totalPrice, setTotalPrice] = useState(product.price)

  const amount = (operation) => {
    if (operation === 'sum') {
      if (totalAmount < product.stock) setTotalAmount(totalAmount + 1)
    } else {
      if (totalAmount > 1) setTotalAmount(totalAmount - 1)
    }
  }

  const addFries = (fries) => {
    setFries(fries)
  }

  const addExtras = (extra) => {
    if (!extras.includes(extra)) {
      setExtras([...extras, extra])
    } else {
      setExtras(extras.filter((e) => e !== extra))
    }
  }

  useEffect(() => {
    let amount = 0
    extrasChoices.forEach((extra) => {
      if (extras.includes(extra.type)) amount = amount + extra.cost
    })
    setExtrasCost(amount)
  }, [extras])

  useEffect(() => {
    let friesCost = sizeFries.find((size) => size.size === fries).cost

    setUnitaryPrice(product.price + friesCost + extrasCost)
  }, [sizeFries, extrasCost])

  useEffect(() => {
    setTotalPrice(unitaryPrice * totalAmount)
  }, [unitaryPrice, totalAmount])

  const addToCart = () => {
    console.log('agregar a mi orden!!!')
  }

  console.log(totalPrice)

  return (
    <main className={styles.main}>
      <div id='productModal' className={styles.card}>
        <ImCancelCircle className={styles.exit} onClick={() => setMod(false)} />

        <div className={styles.product}>
          <div className={styles.cardInfo}>
            <div className={styles.title}>
              <h1>{product.name}</h1>
              <p>La más grande la más bella</p>
            </div>

            <div className={styles.title}>
              <h3>Descripcion:</h3>
              <p>{product.description}</p>
            </div>

            <div className={styles.order}>
              <div className={styles.amount}>
                <p className={styles.amountButton} onClick={() => amount('res')}>
                  -
                </p>
                <p>{totalAmount}</p>
                <p className={styles.amountButton} onClick={() => amount('sum')}>
                  +
                </p>
              </div>
              <p className={styles.addToCart} onClick={addToCart}>
                Agregar a mi orden
              </p>
            </div>
          </div>

          <img className={styles.cardPicture} src={product.img} />

          <div className={styles.cardPrice}>
            <div className={styles.choices}>
              {sizeFries.length !== 0 && (
                <div>
                  <h3 className={styles.h3}>Tamaño papas</h3>
                  {sizeFries.map((size) => (
                    <div>
                      <input type='radio' name='extras' value={size.size} id={size.size} onClick={() => addFries(size.size)} defaultChecked={size.cost === 0 && 'checked'} />

                      <label className={styles.input} for={size.size}>
                        {size.size}
                        {size.cost !== 0 && <span className={styles.span}> (USD {size.cost})</span>}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              <div>
                <h3 className={styles.h3}>Extras</h3>
                {extrasChoices.map((extra) => (
                  <div>
                    <input type='checkbox' name='extras' value={extra.type} id={extra.type} onClick={() => addExtras(extra.type)} />

                    <label className={styles.input} for={extra.type}>
                      {extra.type} <span className={styles.span}>(USD {extra.cost})</span>
                    </label>
                  </div>
                ))}
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
const mapDispachToProps = {
  getProd: productActions.getProducts,
}

export default connect(null, mapDispachToProps)(Product)
