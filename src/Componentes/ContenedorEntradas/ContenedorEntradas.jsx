import appFirebase from '../../firebase/config'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react' 

const firestore = getFirestore(appFirebase)

const ContenedorEntradas = ({ horasTotales, entradas, correoUsuario, definirEntradas, calcularHorasTotales, eliminarEntrada, mes, cambioMes }) => {

    const [ entradasFiltradas, cambioEntradasFiltradas ] = useState([])
    
    async function eliminarEntrada(idEntrada){
        const nuevoArrayEntradas = entradas.filter((entrada)=> entrada.id !== idEntrada)
        const docuRef = doc(firestore, `Usuarios/${correoUsuario}`)
        updateDoc(docuRef, { Horas: [...nuevoArrayEntradas]})
        definirEntradas(nuevoArrayEntradas) 
        cambioEntradasFiltradas(nuevoArrayEntradas)
        calcularHorasTotales(nuevoArrayEntradas)
    }

    entradas.sort((a, b) => {
        if(a.diaFormato > b.diaFormato) { return 1 }
        if(a.diaFormato < b.diaFormato) { return -1 }
        else{ return 0 }
    })

    useEffect(()=>{
        const nuevoArrayEntradas = (entradas.filter(entrada =>  entrada.mesFormato === parseInt(mes)))
        cambioEntradasFiltradas(nuevoArrayEntradas)
        calcularHorasTotales(nuevoArrayEntradas)
    } , [mes, entradas])

    return(
        <div className="contenedor-entradas">
            <div className='contenedor-filtro'>
                {/* <input type="number" value={año} onChange={(e) => {cambioAño(e.target.value)}} /> */}
                <select name="mes" className='seleccionar-mes' onChange={(e) => {cambioMes(e.target.value)}}>
                    <option value="">Filtrar por mes</option>
                    <option value="1">Enero</option>
                    <option value="2">Febrero</option>
                    <option value="3">Marzo</option>
                    <option value="4">Abril</option>
                    <option value="5">Mayo</option>
                    <option value="6">Junio</option>
                    <option value="7">Julio</option>
                    <option value="8">Agosto</option>
                    <option value="9">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
                </select>
                {/* <select name="quincena" onChange={(e) => {}}>
                    <option value="">Filtrar por quincena</option>
                    <option value="primera">Primer quincena</option>
                    <option value="segunda">Segunda quincena</option>
                </select>  */}
            </div>
            <div className='contenedor-entradas-individuales'>
                {
                entradasFiltradas.map((entrada)=>{
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