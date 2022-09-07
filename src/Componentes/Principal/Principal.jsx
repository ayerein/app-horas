import appFirebase from '../../firebase/config'
import { useEffect, useState } from 'react'
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'
import { differenceInMinutes } from 'date-fns'

import ContenedorEntradas from '../ContenedorEntradas/ContenedorEntradas'
import IngresarHoras from '../IngresarHoras/IngresarHoras'

const firestore = getFirestore(appFirebase)

const Principal = ({ correoUsuario }) => {
    const [ entradas, definirEntradas ] = useState(null)
    const [ horasTotales, cambioHorasTotales] = useState()
    
    const [ entrada, cambioEntrada ] = useState()
    const [ salida, cambioSalida ] = useState()

    const [ mes, cambioMes ] = useState()
    const [ quincena, cambioQuincena ] = useState()

    useEffect(()=>{
        async function buscarEntradas(){
            const entradasEncontradas = await buscarCrearEntradas(correoUsuario)
            definirEntradas(entradasEncontradas)
            let diaActual = new Date()
            cambioMes(diaActual.getMonth()+1)
            if (diaActual.getDay() < 15){
                cambioQuincena('primera')
            } else {
                cambioQuincena('segunda')
            }
        }
        buscarEntradas()
    } , [])

    async function buscarCrearEntradas(idDocumento){
        const docuRef = doc(firestore, `Usuarios/${idDocumento}`)
        const consulta = await getDoc(docuRef)
        if (consulta.exists()) {
            const infoDoc = consulta.data()
            return infoDoc.Horas
        } else {
            await setDoc(docuRef, {Horas: []})
            const consulta = await getDoc(docuRef)
            const infoDoc = consulta.data()
            return infoDoc.Horas
        }
    }
    
    function calcularHorasTotales(hs) {
        let minutosTotal = hs.reduce((contador, prod) => contador + (prod.minutos) ,0)
        cambioHorasTotales(`Total de horas trabajadas: ${Math.floor(minutosTotal/60)} horas y ${minutosTotal%60} minutos`)
    }

    function limpiarHoras() {
        document.getElementById('horaEntrada').value=('')
        document.getElementById('horaSalida').value=('')
    }
    
    async function añadirHoras(e){
        e.preventDefault()

        let añoEntrada = parseInt(entrada.slice(0, 4))
        let mesEntrada = parseInt(entrada.slice(5, 7))
        let diaEntrada = parseInt(entrada.slice(8, 10))
        let horaEntrada = parseInt(entrada.slice(11, 13))
        let minEntrada = parseInt(entrada.slice(14, 16))
    
        let añoSalida = parseInt(salida.slice(0, 4))
        let mesSalida = parseInt(salida.slice(5, 7))
        let diaSalida = parseInt(salida.slice(8, 10))
        let horaSalida = parseInt(salida.slice(11, 13))
        let minSalida = parseInt(salida.slice(14, 16))
        
        let minutos = differenceInMinutes(
            new Date(añoSalida, (mesSalida -1), diaSalida, horaSalida, minSalida),
            new Date(añoEntrada, (mesEntrada -1), diaEntrada, horaEntrada, minEntrada)
            )
            
        let diaFormato = new Date(añoEntrada, (mesEntrada -1), diaEntrada)
        let mostrarDiaEntrada = `${diaEntrada}/${mesEntrada}/${añoEntrada}`
        let mostrarHoraEntrada = `${horaEntrada} horas y ${minEntrada} minutos.`
        let mostrarHoraSalida = `${horaSalida} horas y ${minSalida} minutos.`
        let mostrarHorasTrabajadas = `${Math.floor(minutos/60)} horas y ${minutos%60} minutos.`

        const nuevoArrayEntradas = [ 
            ...entradas,
            {
                id: + new Date(),
                diaEntrada: diaEntrada,
                diaFormato: diaFormato,
                mesFormato: mesEntrada,
                diaIngreso: mostrarDiaEntrada,
                ingreso: mostrarHoraEntrada,
                salida: mostrarHoraSalida,
                horasTrabajadas: mostrarHorasTrabajadas,
                minutos: minutos,
            }]

        const docuRef = doc(firestore, `Usuarios/${correoUsuario}`)
        updateDoc(docuRef, { Horas: [...nuevoArrayEntradas]})
        definirEntradas(nuevoArrayEntradas)
        calcularHorasTotales(nuevoArrayEntradas)
        limpiarHoras()
    }
    

    return(
        <div className='contenedor-principal'>
            <IngresarHoras 
            correoUsuario={correoUsuario} 
            añadirHoras={añadirHoras}
            cambioEntrada={cambioEntrada}
            cambioSalida={cambioSalida}
            />
            {
                entradas ?
                <ContenedorEntradas 
                horasTotales={horasTotales} 
                entradas={entradas} 
                correoUsuario={correoUsuario} 
                definirEntradas={definirEntradas}
                calcularHorasTotales={calcularHorasTotales}
                mes={mes}
                quincena={quincena}
                cambioMes={cambioMes}
                cambioQuincena={cambioQuincena}
                />
                : null
            }
        </div>
    )
}

export default Principal