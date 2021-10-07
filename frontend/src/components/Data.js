import { useEffect, useState } from 'react'
import styles from '../styles/data.module.css'
import PersonalData from './PersonalData'
import ChangePassword from './ChangePassword'
import Addresses from './Addresses'
import Payment from './Payment'
import Notifications from './Notifications'

const Data = (props) => {
  const { user, subComp } = props
  const [view, setView] = useState(<PersonalData user={user} />)
  useEffect(() => {
    if (subComp === 'personalData') {
      setView(<PersonalData user={user} />)
    } else if (subComp === 'changePassword') {
      setView(<ChangePassword />)
    } else if (subComp === 'adresses') {
      setView(<Addresses />)
    } else if (subComp === 'payment') {
      setView(<Payment />)
    } else {
      setView(<Notifications />)
    }
  }, [subComp])

  return (
    <div className={styles.containerData}>
      {/* <div className={styles.containerProfile}>
        <div className={styles.imageProfile} style={{ backgroundImage: 'url("/assets/profile.png")' }}></div>
        <h1>NOMBRE DE LA PERSONA</h1>
      </div> */}
      <div className={styles.containAllProfile}>{view}</div>
    </div>
  )
}

export default Data
