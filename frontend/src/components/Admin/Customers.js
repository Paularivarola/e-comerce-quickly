import styles from '../../styles/customer.module.css'
import * as React from 'react';
import { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import UserRow from './UserRow'
import NoResults from './NoResults';
import CustomerDetails from './CustomerDetails';

const Customers = (props) => {
    const [render, setRender] = useState(false)
    window.scrollTo(0, 0)
    const [filtered, setFiltered] = useState(props.users)
    const [chosen, setChosen] = useState(null)
    const inputVal = useRef()
    useEffect(() => {
        setFiltered(props.users)
        inputVal.current.value = ''
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [render])

    console.log(chosen)

    const handleChange = (e) => {
        setFiltered(props.users.filter(user => `${user.data.firstName} ${user.data.lastName}`.trim().toLowerCase().includes(e.target.value.toLowerCase())))
    }

    return (
        <section className={styles.customerContainer}>
            <div className={styles.infoTable}>
                <div className={styles.tableHeader}>
                    <h2>Clientes</h2>
                </div>
                <hr />
                <div className={styles.filterContainer}>
                    <div style={{ width: '100%' }}>Filtrar por:</div>
                    <div>
                        <label htmlFor='nameSearch'>Nombre</label>
                        <input ref={inputVal} style={{ width: '20vw' }} name='name' id="nameSearch" label="Nombre" variant="outlined" onChange={handleChange} />
                    </div>
                </div>
                <span className={styles.results}>{`Mostrando ${filtered.length} clientes de ${props.users.length}`}</span>
                <div className={styles.tableContainer}>
                    <table className={styles.customersTable}>
                        <thead>
                            <tr>
                                <th style={{ width: '15%' }}>Imagen</th>
                                <th style={{ width: '25%' }}>Nombre</th>
                                <th style={{ width: '25%' }}>Correo</th>
                                <th style={{ width: '15%' }}>Tipo Usuario</th>
                                <th style={{ width: '20%' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(user => <UserRow user={user} key={user._id} setView={props.setView} setChosen={setChosen} render={render} setRender={setRender} />)}
                        </tbody>
                        <tfoot>

                        </tfoot>
                    </table>
                </div>
                {chosen && <CustomerDetails user={chosen} setChosen={setChosen} />}
                {!filtered.length && <NoResults />}
            </div>
        </section>
    )
}
const mapStateToProps = state => {
    return {
        users: state.adminUsers.users
    }
}
export default connect(mapStateToProps)(Customers)