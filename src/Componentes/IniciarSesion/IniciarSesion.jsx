import appFirebase from '../../firebase/config'
import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth(appFirebase)

const IniciarSesion = () => {
    const [ estado, cambiarEstado ] = useState(true)
    const [ error, mostrarError ] = useState('')
    
    const [ email, cambioEmail ] = useState()
    const [ contraseña, cambioContraseña ] = useState()
    
    const iniciar = async (e) => {
        try {
            await signInWithEmailAndPassword(auth, email, contraseña)
        } catch (error) {
            mostrarError('Correo o contraseña incorrectos')
        }
    }
    const crearCuenta = async (e) => {
        try {
            await createUserWithEmailAndPassword(auth, email, contraseña)
        } catch (error) {
            mostrarError('El email o la contraseña no son validos.')
        }
    }

    return(
        <div className="contenedor-iniciar-sesion">
        <h1 className='titulo'>Tus Horas</h1>
        <input className='input-iniciar' type="email" name="email" placeholder="Tu email" onChange={(e)=> cambioEmail(e.target.value)} />
        <input className='input-iniciar' type="password" name="contraseña" placeholder="Contraseña" onChange={(e)=> cambioContraseña(e.target.value)} />
            {estado ? 
            <>
                <p className='error-crear-cuenta'>{error}</p>
                <p className='cambio' onClick={()=> cambiarEstado(false)}>Crear una cuenta</p>
                <button className='btn-iniciar' onClick={()=> iniciar()}>Iniciar Sesion</button>
            </>
            :
            <>
                <p className='error-crear-cuenta'>{error}</p>
                <p className='cambio' onClick={()=> cambiarEstado(true)}>Ya tengo una cuenta</p>
                <button className='btn-iniciar' onClick={()=> crearCuenta()}>Crear Cuenta</button>
            </>
        }
        </div>
    )
}

export default IniciarSesion