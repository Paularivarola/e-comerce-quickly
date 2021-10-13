import { useEffect, useState } from 'react'
import styles from '../styles/cardTost.module.css'

const CardTost = ({ properties, setCardTost, accept, deny }) => {
  const { time, icon, text, view, tost, question = question || '' } = properties
  const [typeTost, setTypeTost] = useState(icon)
  const [imageTost, setImageTost] = useState('')
  const [iconTost, setIconTost] = useState('')
  const [textTost, setTextTost] = useState(text)
  const [render, setRender] = useState(view)
  const [tostType, setTostType] = useState(tost)

  if (render) {
    setTimeout(() => {
      setRender(false)
      setCardTost({
        icon: '',
        text: '',
        view: false,
      })
    }, time || 1500)
  }
  useEffect(() => {
    if (typeTost === 'success') {
      setImageTost('https://i.postimg.cc/4dr1ZcmV/papasfritas1.jpg')
      setIconTost('https://i.postimg.cc/J4nh2sQx/ok.png')
    } else if (typeTost === 'error') {
      setImageTost('https://i.postimg.cc/xjzR564R/papasfritas2.jpg')
      setIconTost('https://i.postimg.cc/fRhTdPQ9/error.png')
    } else if (typeTost === 'leave') {
      setImageTost(
        'https://us.123rf.com/450wm/alvincadiz/alvincadiz1604/alvincadiz160400275/55827798-ilustraci%C3%B3n-del-vector-de-la-mascota-del-pan-del-pan.jpg?ver=6'
      )
      setIconTost('https://i.postimg.cc/J4nh2sQx/ok.png')
    } else if (typeTost === 'warning') {
      setImageTost('')
      setIconTost('')
    }
  }, [])

  return (
    <>
      {tostType === 'accept' ? (
        <div className={styles.containCard}>
          <div className={styles.containImage}>
            <div className={styles.imageBack}></div>
          </div>
          <div className={styles.containText}>
            <div className={styles.text}>
              <h2>{text}</h2>
              <p>{question}</p>
            </div>
          </div>
          <div className={styles.containButtons}>
            <button onClick={accept}>Si</button>
            <button onClick={deny}>No</button>
          </div>
        </div>
      ) : (
        <div className={styles.cardContain}>
          <div className={styles.imageIcon} style={{ backgroundImage: `url("${iconTost}")` }}></div>
          <div>
            <h4>{textTost}</h4>
          </div>
          <div className={styles.imageTost} style={{ backgroundImage: `url("${imageTost}")` }}></div>
        </div>
      )}
    </>
  )
}

export default CardTost
