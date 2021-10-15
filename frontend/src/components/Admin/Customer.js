import styles from '../../styles/newadmin.module.css'
import styles2 from '../../styles/customerdetails.module.css'
import { connect } from 'react-redux'
import adminUserActions from '../../redux/actions/admin/adminUserActions'
import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MdOutlineSave, MdUploadFile } from 'react-icons/md'
import { message } from './Message';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';

const Customer = (props) => {
    const [newUser, setNewUser] = useState()
    const [saving, setSaving] = useState(false)
    const [file, setFile] = useState('https://i.postimg.cc/rFQ6QKxZ/memelogin.png')
    window.scrollTo(0, 0)

    const inputHandler = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.name === 'src' ? e.target.files[0] : e.target.value
        })
        if (e.target.name === 'src') {
            const newFile = URL.createObjectURL(e.target.files[0])
            setFile(newFile)
        }
    }

    const createUser = async (e) => {
        setSaving(true)
        try {
            if (!newUser.firstName) {
                throw new Error('Ingrese el nombre del usuario.')
            } else if (!newUser.lastName) {
                throw new Error('Ingrese el apellido del usuario.')
            } else if (!newUser.email) {
                throw new Error('Ingrese el correo del usuario.')
            } else if (!newUser.password) {
                throw new Error('Ingrese la clave del usuario.')
            }
            const { firstName, lastName, email, password } = newUser
            const fd = new FormData()
            fd.append('firstName', firstName)
            fd.append('lastName', lastName)
            fd.append('email', email)
            fd.append('password', password)
            newUser.src && fd.append('src', newUser.src)
            let response = await props.createUser(fd, props)
            if (response.success) {
                message('success', 'Usuario creado exitosamente')
            }
        } catch (error) {
            message('error', error)
        }
        setSaving(false)
    }

    return (
        <>
            <div className={styles.newAdminContainer}>
                <div style={{ width: '30%' }} className={styles.userPicture}>
                    <div className={styles2.userImage} style={{ backgroundImage: `url(${file})`, height: '50vh', width: '100%', marginBottom: '2vh', marginRight: '0px' }}></div>
                    <label htmlFor='upload' className={styles.label}>
                        <span className={styles.uploadButton}><MdUploadFile />Subir imagen</span>
                    </label>
                    <input style={{ display: 'none' }} type='file' id="upload" name="src" onChange={inputHandler} />
                </div>
                <div className={styles.newAdminInputs}>
                    <TextField name="firstName" label="Nombre" variant="outlined" onChange={inputHandler} />
                    <TextField name="lastName" label="Apellido" variant="outlined" onChange={inputHandler} />
                    <TextField name="email" label="Correo" variant="outlined" onChange={inputHandler} />
                    <TextField type="password" name="password" label="Contraseña" variant="outlined" onChange={inputHandler} />
                    <Button onClick={createUser} variant="outlined" color="error" size="small"><MdOutlineSave />Crear</Button>
                </div>
            </div>
            {saving &&
                <Box sx={{ width: '30%', margin: '0 auto' }}>
                    <LinearProgress />
                    <Typography>Guardando...</Typography>
                </Box>}
        </>
    )
}
const mapDispatchToProps = {
    createUser: adminUserActions.createUser
}

export default connect(null, mapDispatchToProps)(Customer)