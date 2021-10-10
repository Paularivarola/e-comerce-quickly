import styles from '../styles/product.module.css'
import { connect } from 'react-redux'
import productActions from '../redux/actions/productActions'
import { ImCancelCircle } from 'react-icons/im'
import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import userActions from '../redux/actions/userActions'

const Product = ({ product, setMod, user, userData, manageCart, ...props }) => {
  const friesSizes = [
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
  const drinkChoices = [
    { type: 'Sin bebida', cost: 0 },
    { type: 'Coca Cola (500cc)', cost: 100 },
    { type: 'Sprite (500cc)', cost: 100 },
    { type: 'Fanta (500cc)', cost: 100 },
  ]

  const initialCartItem = {
    productId: product._id,
    clarifications: '',
    fries: friesSizes[0],
    extras: [],
    drink: drinkChoices[0],
    unitaryPrice: product.price,
    totalAmount: 1,
    totalPrice: product.price,
  }
  const [cartItem, setCartItem] = useState(initialCartItem)

  const amount = (operation) => {
    const { totalAmount, unitaryPrice } = cartItem
    if (operation === 'sum') {
      if (totalAmount < product.stock) {
        setCartItem({
          ...cartItem,
          totalAmount: totalAmount + 1,
          totalPrice: unitaryPrice * (totalAmount + 1),
        })
      } else {
        alert('ha llegado al límite de este producto')
      }
    } else {
      if (totalAmount > 1)
        setCartItem({
          ...cartItem,
          totalAmount: totalAmount - 1,
          totalPrice: unitaryPrice * (totalAmount - 1),
        })
    }
  }

  const addExtras = (extra) => {
    if (!Object.values(cartItem.extras).includes(extra.type)) {
      setCartItem({ ...cartItem, extras: [...cartItem.extras, extra] })
    } else {
      setCartItem({
        ...cartItem,
        extras: cartItem.extras.filter((e) => e.type !== extra.type),
      })
    }
  }

  // useEffect(() => {
  //   let amount = 0
  //   extrasChoices.forEach((extra) => {
  //     if (extras.includes(extra.type)) amount = amount + extra.cost
  //   })
  //   setExtrasCost(amount)
  // }, [extras])

  useEffect(() => {
    const { fries, extras, drink, totalAmount } = cartItem
    let extrasCost = extras.reduce((acc, extra) => acc + extra.cost, 0)
    setCartItem({
      ...cartItem,
      unitaryPrice:
        product.price +
        fries.cost +
        extrasCost +
        (product.multipleDrinks ? drink.cost : 0),
      totalPrice: product.multipleDrinks
        ? (product.price + fries.cost + extrasCost + drink.cost) * totalAmount
        : (product.price + fries.cost + extrasCost) * totalAmount + drink.cost,
    })
  }, [cartItem.fries, cartItem.extras, cartItem.drink])

  const addToCart = () => {
    console.log(cartItem)
    manageCart({ cartItem, action: 'add', _id: userData?._id })
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
              <p>{cartItem.totalAmount}</p>
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
            {product.fries && product.extras && (
              <div className={styles.column}>
                {product.fries && (
                  <div>
                    <h3 className={styles.h3}>Tamaño papas</h3>
                    {friesSizes.map((size, index) => (
                      <div key={index}>
                        <input
                          type='radio'
                          name='extras'
                          value={size.size}
                          id={size.size}
                          onClick={() =>
                            setCartItem({ ...cartItem, fries: size })
                          }
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
                          onClick={() => addExtras(extra)}
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
                product.fries && product.extras
                  ? styles.column
                  : styles.no_column
              }
            >
              <div>
                <h3 className={styles.h3}>Gaseosa</h3>
                {drinkChoices.map((option, index) => (
                  <div key={index}>
                    <input
                      type='radio'
                      name='drinks'
                      value={option.type}
                      id={option.type}
                      onClick={() =>
                        setCartItem({ ...cartItem, drink: option })
                      }
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
                  name='clarifications'
                  maxRows={4}
                  rows={4}
                  value={cartItem.clarifications}
                  onChange={(e) =>
                    setCartItem({
                      ...cartItem,
                      clarifications: e.target.value,
                    })
                  }
                />
              </Box>
            </div>
          </div>
          <div>
            <h4>Unidad: $ {cartItem.unitaryPrice}</h4>
            <h2>Total: $ {cartItem.totalPrice}</h2>
          </div>
        </div>
      </div>
    </main>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    userData: state.users.userData,
  }
}
const mapDispatchToProps = {
  manageCart: userActions.manageCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
