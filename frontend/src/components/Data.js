import { useEffect, useState } from 'react'
import styles from '../styles/data.module.css'
import PersonalData from './PersonalData'
import ChangePassword from './ChangePassword'
import Addresses from './Addresses'
import Payment from './Payment'
import Notifications from './Notifications'

const Data = (props) => {
  const { user, subComp, setFormConfirm } = props
  const [cancelForm, setCancelForm] = useState({})
  const [view, setView] = useState(<PersonalData user={user} setCancelForm={setCancelForm} />)
  setFormConfirm(cancelForm)
  useEffect(() => {
    if (subComp === 'personalData') {
      setView(<PersonalData user={user} setCancelForm={setCancelForm} />)
    } else if (subComp === 'changePassword') {
      setView(<ChangePassword user={user} setCancelForm={setCancelForm} />)
    } else if (subComp === 'adresses') {
      setView(<Addresses user={user} setCancelForm={setCancelForm} />)
    } else if (subComp === 'payment') {
      setView(<Payment user={user} setCancelForm={setCancelForm} />)
    } else {
      setView(<Notifications user={user} />)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subComp])

  return (
    <div className={styles.containerData}>
      <div className={styles.containAllProfile}>{view}</div>
    </div>
  )
}

export default Data
