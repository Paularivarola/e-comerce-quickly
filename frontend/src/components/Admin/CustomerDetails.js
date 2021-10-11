import styles from '../../styles/customerdetails.module.css'
import { MdCancel } from "react-icons/md";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PersonalData from './PersonalData';
import Favorites from './Favorites'
import ProfileOrders from './ProfileOrders';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import adminUsersActions from '../../redux/actions/admin/adminUserActions';
import { useEffect } from 'react'

const CustomerDetails = (props) => {

    console.log(props.user)
    useEffect(() => {
        props.getUser(window.location.pathname.replace('/admin/cliente/', ''))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <div className={styles.detailsContainer}>
            <div className={styles.mainContainer}>
                <Link to='/admin/clientes'><MdCancel onClick={() => { props.setChosen(null) }} /></Link>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Datos Personales" {...a11yProps(0)} />
                            <Tab label={`Favoritos (${props.user.favouriteProductsId.length})`} />
                            <Tab label={`Pedidos (${props.user.ordersId.length})`} {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0} >
                        <PersonalData user={props.user} />
                    </TabPanel>
                    <TabPanel value={value} index={1} >
                        <Favorites user={props.user} />
                    </TabPanel>
                    <TabPanel value={value} index={2} >
                        <ProfileOrders user={props.user} />
                    </TabPanel>
                </Box>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    getUser: adminUsersActions.getUser
}

export default connect(null, mapDispatchToProps)(CustomerDetails)