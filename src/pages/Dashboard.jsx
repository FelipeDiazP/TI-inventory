import DashboardLayout from '../layouts/DashboardLayout.jsx'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/database'
import HeaderComponent from '../components/header.jsx'

export default function Dashboard () {
  const [tickets, setTickets] = useState([])
  const [soportes, setSoportes] = useState([])

  const obtenerTickets = async () => {
    const rest = await fetch('http://localhost:3000/tickets')
    const data = await rest.json()
    setTickets(data)
  }

  const obtenerSoportes = async () => {
    const querySnapshot = await getDocs(collection(db, 'Soportes'))

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))

    setSoportes(data)
  }

  useEffect(() => {
    obtenerTickets()
    obtenerSoportes()
  }, [])

  const asignarSoporte = async (ticketId, soporteId) => {
    await fetch(`http://localhost:3000/tickets/${ticketId}/asignar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ soporteId })
    })
    obtenerTickets()
  }

  const getNombre = (id) => {
    const soporteEncontrado = soportes.find((s) => s.id === id)
    return soporteEncontrado ? soporteEncontrado.name : 'Sin asignar'
  }

  const cambiarEstado = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === 'Pendiente' ? 'Resuelto' : 'Pendiente'

    await fetch(`http://localhost:3000/tickets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        estado: nuevoEstado
      })
    })
    obtenerTickets()
  }

  return (
    <DashboardLayout>
      <div className='text-black animate-fade-in-down'>
        <HeaderComponent />
        <main className='p-5'>
          <h2 className='text-2xl font-bold'>Tickets</h2>
          <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
              tickets.map((t) => (
                <div key={t.id} className='bg-white rounded-2xl shadow-md p-4 border hover:shadow-lg transition'>
                  <h3 className='text-lg font-semibold'>{t.titulo}</h3>
                  <p className='text-gray-700 text-sm mt-1'>{t.descripcion}</p>
                  <div className='mt-3'>
                    <span className={`px-3 py-1 text-sm rounded-xl font-medium 
                      ${t.estado === 'activo' ? 'bg-green-100 text-green-700' : t.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-500' : 'bg-green-100 text-green-700'}`}
                    >
                      {t.estado}
                    </span>
                  </div>
                  <p className='text-sm mt-2'>
                    👤 {getNombre(t.soporteId)}
                  </p>
                  <div className='mt-4 flex flex-col gap-2'>
                    <button onClick={() => cambiarEstado(t.id, t.estado)} className='w-fit p-2 rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 cursor-pointer'>
                      Cambiar estado
                    </button>
                    <select onChange={(e) => asignarSoporte(t.id, e.target.value)} className='border rounded-lg p-1 text-sm' defaultValue=''>
                      <option value='' disabled>
                        Asingnar Soporte
                      </option>
                      {
                        soportes.map((s) => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              ))
            }
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}
