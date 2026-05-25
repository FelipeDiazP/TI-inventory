import DashboardLayout from '../layouts/DashboardLayout.jsx'
import { useEffect, useState } from 'react'
import HeaderComponent from '../components/Header.jsx'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function Dashboard() {
  const [tickets, setTickets] = useState([])
  const [tecnicos, setTecnicos] = useState([])

  // =====================
  // TICKETS
  // =====================
  const obtenerTickets = async () => {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.log('tickets error:', error.message)
      return
    }

    setTickets(data)
  }

  // =====================
  // TECNICOS
  // =====================
  const obtenerTecnicos = async () => {
    const { data, error } = await supabase
      .from('tecnicos') // 👈 ASEGÚRATE QUE EXISTE
      .select('*')

    if (error) {
      console.log('tecnicos error:', error.message)
      return
    }

    setTecnicos(data)
  }

  // =====================
  // ASIGNAR TECNICO
  // =====================
  const asignarTecnico = async (ticketId, tecnicoId) => {
    const { error } = await supabase
      .from('tickets')
      .update({ tecnico_id: Number(tecnicoId) })
      .eq('id', ticketId)

    if (error) {
      console.log('assign error:', error.message)
      return
    }

    obtenerTickets()
  }

  // =====================
  // CAMBIAR ESTADO (CORRECTO)
  // =====================
  const cambiarEstado = async (ticket) => {
    let nuevoEstado = 'Pendiente'

    if (ticket.estado_ticket === 'Pendiente') {
      nuevoEstado = 'En proceso'
    } else if (ticket.estado_ticket === 'En proceso') {
      nuevoEstado = 'Resuelto'
    }

    const { error } = await supabase
      .from('tickets')
      .update({ estado_ticket: nuevoEstado })
      .eq('id', ticket.id)

    if (error) {
      console.log('estado error:', error.message)
      return
    }

    obtenerTickets()
  }

  // =====================
  // INIT
  // =====================
  useEffect(() => {
    obtenerTickets()
    obtenerTecnicos()
  }, [])

  // =====================
  // GET TECNICO NAME
  // =====================
  const getTecnico = (id) => {
    const t = tecnicos.find(x => x.id === id)
    return t ? (t.nombre || t.name) : 'Sin asignar'
  }

  return (
    <DashboardLayout>
      <div className="p-5">

        <HeaderComponent />

        <h1 className="text-2xl font-bold mt-4">
          Tickets
        </h1>

        <div className="grid md:grid-cols-3 gap-4 mt-5">

          {tickets.map(ticket => (
            <div key={ticket.id} className="border p-4 rounded-xl shadow">

              <h2 className="font-bold">
                {ticket.titulo}
              </h2>

              <p className="text-sm text-gray-600">
                {ticket.descripcion}
              </p>

              {/* ESTADO */}
              <div className="mt-2">
                <span className="px-2 py-1 text-xs rounded bg-gray-200">
                  {ticket.estado_ticket}
                </span>
              </div>

              {/* TECNICO */}
              <p className="text-sm mt-2">
                👨‍🔧 {getTecnico(ticket.tecnico_id)}
              </p>

              {/* BOTONES */}
              <div className="mt-3 flex flex-col gap-2">

                <button
                  onClick={() => cambiarEstado(ticket)}
                  className="bg-blue-600 text-white p-2 rounded"
                >
                  Cambiar estado
                </button>

                <select
                  className="border p-1 rounded"
                  onChange={(e) =>
                    asignarTecnico(ticket.id, e.target.value)
                  }
                >
                  <option value="">
                    Asignar técnico
                  </option>

                  {tecnicos.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.nombre || t.name}
                    </option>
                  ))}
                </select>

              </div>

            </div>
          ))}

        </div>
      </div>
    </DashboardLayout>
  )
}