import { useState } from 'react'
import appFirebase from '../../firebase/config'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import Principal from '../Principal/Principal'
import IniciarSesion from '../IniciarSesion/IniciarSesion'
import ContenedorEntradas from '../ContenedorEntradas/ContenedorEntradas'

const auth = getAuth(appFirebase)

const ContenedorInicio = () => {
    const [ usuario, cambioUsuario ] = useState(null)

    onAuthStateChanged(auth, (usuarioFirebase) => {
        if (usuarioFirebase) {
            cambioUsuario(usuarioFirebase)
        } else {
            cambioUsuario(null)
        }
    })
    
    return(
        <main>
            <div >
                {usuario ? <Principal correoUsuario={usuario.email}/>  : <IniciarSesion />}
            </div>
            
        </main>
    )
}

export default ContenedorInicio