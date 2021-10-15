import React, { useState } from 'react'
import styles from '../../styles/adminMenu.module.css'
import { MdDashboard, MdPerson, MdFastfood, MdFileCopy, MdKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom'



import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

const AdminMenu = (props) => {
    const { view, setView } = props


    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleChangeSpecial = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? false : false);
    };

    return (
        <header className={props.open ? `${styles.mainContainer}` : `${styles.close}`}>
            <img src='/assets/quicklyLogo.png' style={{ width: '100%', marginTop: '5vh' }} alt="Logo" />
            <nav className={styles.adminNav}>
                <div>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChangeSpecial('panel4')} >
                        <AccordionSummary
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '100%', flexShrink: 0 }}>
                                <Link to='/admin/dashboard'>
                                    <span onClick={() => {
                                        setView('Escritorio')
                                    }} className={view === 'Escritorio' ? `${styles.navItemActive}` : `${styles.navItem}`}>
                                        <MdDashboard />
                                        Escritorio
                                    </span>
                                </Link>
                            </Typography>
                        </AccordionSummary>
                    </Accordion>
                </div>

                <div>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
                        <AccordionSummary
                            expandIcon={<MdKeyboardArrowDown />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '100%', flexShrink: 0 }}>
                                <span className={styles.navItem}>
                                    <MdPerson />
                                    Usuarios
                                </span>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <Link to='/admin/clientes'>
                                    <span onClick={() => {
                                        setView('Clientes')
                                    }} className={view === 'Clientes' ? `${styles.navItemActive}` : `${styles.navItem}`}>
                                        Ver Todos
                                    </span>
                                </Link>
                                <Link to='/admin/clientes/nuevo'>
                                    <span onClick={() => {
                                        setView('Nuevo Usuario')
                                    }} className={view === 'Nuevo Usuario' ? `${styles.navItemActive}` : `${styles.navItem}`}>
                                        Crear Admin
                                    </span>
                                </Link>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>

                <div>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<MdKeyboardArrowDown />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '100%', flexShrink: 0 }}>
                                <span className={styles.navItem}>
                                    <MdFileCopy />
                                    Pedidos
                                </span>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <Link to='/admin/pedidos'>
                                    <span onClick={() => {
                                        setView('Pedidos')
                                    }} className={view === 'Pedidos' ? `${styles.navItemActive}` : `${styles.navItem}`}>
                                        Ver Todos
                                    </span>
                                </Link>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>

                <div>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<MdKeyboardArrowDown />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '100%', flexShrink: 0 }}>
                                <span className={styles.navItem}>
                                    <MdFastfood />
                                    Productos
                                </span>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <Link to='/admin/productos/nuevo'>
                                    <span onClick={() => {
                                        setView('Nuevo Producto')
                                    }} className={view === 'Nuevo Producto' ? `${styles.navItemActive}` : `${styles.navItem}`}>
                                        Nuevo
                                    </span>
                                </Link>
                                <Link to='/admin/productos'>
                                    <span onClick={() => {
                                        setView('Productos')
                                    }} className={view === 'Productos' ? `${styles.navItemActive}` : `${styles.navItem}`}>
                                        Ver Todos
                                    </span>
                                </Link>
                                {/* <span onClick={() => {
                                    setView('Reviews')
                                }} className={view === 'Reviews' ? `${styles.navItemActive}` : `${styles.navItem}`}>
                                    Reviews
                                </span> */}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </nav>
        </header >
    )
}

export default AdminMenu


