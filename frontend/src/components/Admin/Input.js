import styles from '../../styles/input.module.css'

const Input = () => {
    return (
        <div class="col-3 input-effect">
            <input className={styles.effect16} type="text" placeholder="Hola" />
            <label>First Name</label>
            <span class="focus-border"></span>
        </div>

    )
}
export default Input