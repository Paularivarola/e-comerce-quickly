import styles from '../styles/product.module.css'
import { connect } from 'react-redux'
import productActions from '../redux/actions/productActions'
import { ImCancelCircle } from 'react-icons/im'
import { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { urlencoded } from 'express'

const Product = ({ product, setMod, user, manageCart, ...props }) => {
  const sizeFries = [
    { size: 'Chicas', cost: 0 },
    { size: 'Medianas', cost: 10 },
    { size: 'Grandes', cost: 20 },
  ]
  const extrasChoices = [
    { type: 'Carne', cost: 20 },
    { type: 'Queso', cost: 10 },
    { type: 'Cebolla', cost: 5 },
    { type: 'Gaseosa 500cc', cost: 35 },
  ]
  const drinksChoices = [
    { type: 'Sin bebida', cost: 0 },
    { type: 'Coca Cola (500cc)', cost: 100 },
    { type: 'Sprite (500cc)', cost: 100 },
    { type: 'Fanta (500cc)', cost: 100 },
  ]

  const [fries, setFries] = useState('Chicas')
  const [drink, setDrink] = useState('Sin bebida')
  const [aclaraciones, setAclaraciones] = useState('')
  const [extras, setExtras] = useState([])
  const [extrasCost, setExtrasCost] = useState(0)
  const [totalAmount, setTotalAmount] = useState(1)
  const [unitaryPrice, setUnitaryPrice] = useState(product.price)
  const [totalPrice, setTotalPrice] = useState(product.price)

  const amount = (operation) => {
    console.log(product.stock)
    if (operation === 'sum') {
      if (totalAmount < product.stock) {
        setTotalAmount(totalAmount + 1)
      } else {
        alert('ha llegado al límite de este producto')
      }
    } else {
      if (totalAmount > 1) setTotalAmount(totalAmount - 1)
    }
  }
  const addDrink = (drink) => {
    setDrink(drink)
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
    let drinkCost = drinksChoices.find((option) => option.type === drink).cost
    setUnitaryPrice(product.price + friesCost + extrasCost + drinkCost)
  }, [sizeFries, extrasCost, drink])

  useEffect(() => {
    setTotalPrice(unitaryPrice * totalAmount)
  }, [unitaryPrice, totalAmount])

  const addToCart = () => {
    console.log({ papas: sizeFries.find((frie) => frie.size === fries) })
    console.log(extras)
    console.log(aclaraciones)
    console.log(totalAmount)
    console.log(unitaryPrice)
    console.log(totalPrice)
    // manageCart()
    //alert toast
    setMod(false)
  }

  return (
    <main data-modal='closeModal' className={styles.main}>
      <div className={styles.card}>
        <ImCancelCircle className={styles.exit} onClick={() => setMod(false)} />
        <div className={styles.cardInfo}>
          <div>
            <h1 className={styles.h3}>{product.name}</h1>
            <Stack className={styles.calification} spacing={1}>
              {user ? (
                <Rating
                  className={styles.rating}
                  style={{ backgroundColor: 'yelow' }}
                  name='half-rating'
                  defaultValue={product.score}
                  precision={0.5}
                />
              ) : (
                <Rating
                  name='half-rating-read'
                  defaultValue={product.score}
                  precision={0.5}
                  readOnly
                />
              )}
            </Stack>
          </div>

          <div className={styles.div}>
            <div
              style={{ backgroundImage: `url('${product.img}')` }}
              className={styles.picture}
            />
            <h3 className={styles.h3}>Descripcion:</h3>
            <p className={styles.text}>{product.description}</p>
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

        <div className={styles.cardPrice}>
          <div className={styles.choices}>
            {product.papas && product.extras && (
              <div className={styles.column}>
                {product.papas && (
                  <div>
                    <h3 className={styles.h3}>Tamaño papas</h3>
                    {sizeFries.map((size, index) => (
                      <div key={index}>
                        <input
                          type='radio'
                          name='extras'
                          value={size.size}
                          id={size.size}
                          onClick={() => setFries(size.size)}
                          defaultChecked={size.cost === 0 && 'checked'}
                        />

                        <label className={styles.input} htmlFor={size.size}>
                          {size.size}
                          {size.cost !== 0 && (
                            <span className={styles.span}> ${size.cost}</span>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
                {product.extras && (
                  <div>
                    <h3 className={styles.h3}>Extras</h3>
                    {extrasChoices.map((extra, index) => (
                      <div key={index}>
                        <input
                          type='checkbox'
                          name='extras'
                          value={extra.type}
                          id={extra.type}
                          onClick={() => addExtras(extra.type)}
                        />

                        <label className={styles.input} htmlFor={extra.type}>
                          {extra.type}{' '}
                          <span className={styles.span}>${extra.cost}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div
              className={
                product.papas && product.extras
                  ? styles.column
                  : styles.no_column
              }
            >
              <div>
                <h3 className={styles.h3}>Gaseosa</h3>
                {drinksChoices.map((option, index) => (
                  <div key={index}>
                    <input
                      type='radio'
                      name='extras'
                      value={option.type}
                      id={option.type}
                      onClick={() => addDrink(option.type)}
                      defaultChecked={option.cost === 0 && 'checked'}
                    />

                    <label className={styles.input} htmlFor={option.type}>
                      {option.type}
                      {option.cost !== 0 && (
                        <span className={styles.span}> ${option.cost}</span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
              <Box
                component='form'
                sx={{
                  '& .MuiTextField-root': {
                    m: 1,
                    width: '25ch',
                    minHeight: '15ch',
                  },
                }}
                noValidate
                autoComplete='off'
              >
                <TextField
                  id='outlined-multiline-flexible'
                  label='Aclaraciones'
                  multiline
                  maxRows={4}
                  rows={4}
                  value={aclaraciones}
                  onChange={(e) => setAclaraciones(e.target.value)}
                />
              </Box>
            </div>
          </div>
          <div>
            <h4>Unidad: $ {unitaryPrice}</h4>
            <h2>Total: $ {totalPrice}</h2>
          </div>
        </div>
      </div>
    </main>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  }
}
const mapDispachToProps = {
  getProd: productActions.getProducts,
  manageCart: productActions.manageCart,
}

export default connect(mapStateToProps, mapDispachToProps)(Product)
