import React from 'react'
import styles from '../styles/checkOut.module.css'

const Addresses = (props) => {
  return (
      <div className={styles.containCard}>
        <h1>{props.map.name}</h1>
        <h1>{props.map.calle}</h1>
        <h1>{props.map.numero}</h1>
      </div>
  )
}

export default Addresses
