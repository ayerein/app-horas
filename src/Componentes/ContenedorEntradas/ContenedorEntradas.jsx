import appFirebase from '../../firebase/config'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'

const firestore = getFirestore(appFirebase)

const ContenedorEntradas = ({ horasTotales, entradas, correoUsuario, definirEntradas, calcularHorasTotales }) => {

    async function eliminarEntrada(idEntrada){
        const nuevoArrayEntradas = entradas.filter((entrada)=> entrada.id !== idEntrada)

        const docuRef = doc(firestore, `Usuarios/${correoUsuario}`)
        updateDoc(docuRef, { Horas: [...nuevoArrayEntradas]})
        definirEntradas(nuevoArrayEntradas)
        calcularHorasTotales(nuevoArrayEntradas)
    }

    entradas.sort((a, b) => {
        if(a.diaFormato > b.diaFormato) { return 1 }
        if(a.diaFormato < b.diaFormato) { return -1 }
        else{ return 0 }
    })

    return(
        <div className="contenedor-entradas">
            <div className='contenedor-entradas-individuales'>
                {
                entradas.map((entrada)=>{
                    return(
                        <div className='entrada-individual' key={entrada.id}>
                            <p className='p-dia-entrada'>{entrada.diaIngreso}</p>
                            <p className='p-horas'>Hora de entrada: {entrada.ingreso}</p>
                            <p className='p-horas'>Hora de Salida: {entrada.salida}</p>
                            <p className='p-horas'>Horas trabajadas: {entrada.horasTrabajadas}</p>
                            <button className='btn-eliminar' onClick={()=> eliminarEntrada(entrada.id)}>Eliminar</button>
                        </div>
                    )
                })
                }
            </div>
            <p className='horas-totales'>{horasTotales}</p>
        </div>
    )
}

export default ContenedorEntradas