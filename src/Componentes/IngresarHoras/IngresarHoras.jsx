import { getAuth, signOut} from 'firebase/auth'
import appFirebase from '../../firebase/config'

const auth = getAuth(appFirebase)

const IngresarHoras = ({ correoUsuario, añadirHoras, cambioEntrada, cambioSalida }) => {
    function verHoras(e) {
        e.preventDefault()
        document.getElementById('contenedor-entradas').style.display='flex'
        document.getElementById('contenedor-ingresar-horas').style.display='none'
    }
    return(
        <div className="contenedor-ingresar-horas" id="contenedor-ingresar-horas">
            <h1 className='titulo'>Tus Horas</h1>
            <form className="contenedor-form">
                <p>Agregar entrada:</p>
                <input type="datetime-local" name="horaEntrada" id='horaEntrada' onChange={(e) => {cambioEntrada(e.target.value)}}/>
                <p>Agregar salida:</p>
                <input type="datetime-local" name="horaSalida" id='horaSalida' onChange={(e) => {cambioSalida(e.target.value)}} />
                <button className='btn-agregar-horas' onClick={añadirHoras}>Agregar Horas</button>
                <button className='btn-ver-horas' onClick={verHoras}>Ver Horas</button>
            </form>
            <div className='cerrar-sesion'>
                <p>{correoUsuario}</p>
                <button className='btn-cerrar-sesion' onClick={() => signOut(auth)}>Cerrar Sesion</button>
            </div>
        </div>
    )
}

export default IngresarHoras