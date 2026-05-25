import HeaderComponent from '../components/Header.jsx'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import Notification from '../components/Notification'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// 🔥 SUPABASE
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function Configuracion() {
  const user = JSON.parse(localStorage.getItem('user'))

  const [tecnico, setTecnico] = useState(null)

  const [form, setForm] = useState({
    nombre: '',
    correo: ''
  })

  const [notification, setNotification] = useState({
    message: '',
    type: ''
  })

  // =========================
  // 📌 OBTENER TECNICO (FIX REAL)
  // =========================
  const obtenerTecnico = async () => {
    if (!user?.correo) {
      console.log("No hay usuario en localStorage")
      return
    }

    const { data, error } = await supabase
      .from('tecnicos')
      .select('*')
      .eq('correo', user.correo)
      .single()

    if (error) {
      console.log('ERROR:', error.message)
      return
    }

    setTecnico(data)

    setForm({
      nombre: data.nombre || '',
      correo: data.correo || ''
    })
  }

  useEffect(() => {
    obtenerTecnico()
  }, [])

  // =========================
  // 📌 INPUTS
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // =========================
  // 📌 GUARDAR CAMBIOS
  // =========================
  const guardarCambios = async () => {
    if (!tecnico?.id) return

    const { error } = await supabase
      .from('tecnicos')
      .update({
        nombre: form.nombre,
        correo: form.correo
      })
      .eq('id', tecnico.id)

    if (error) {
      setNotification({
        message: error.message,
        type: 'error'
      })
      return
    }

    setNotification({
      message: 'Datos actualizados correctamente',
      type: 'success'
    })

    obtenerTecnico()
  }

  // =========================
  // 📌 CERRAR SESIÓN
  // =========================
  const cerrarSesion = () => {
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <DashboardLayout>
      <div className="animate-fade-in-down">

        <HeaderComponent />

        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() =>
            setNotification({ message: '', type: '' })
          }
        />

        <main className="p-6">

          <h1 className="text-3xl font-bold">
            Configuración
          </h1>

          <p className="text-gray-500 mt-1">
            Administra tu cuenta y perfil
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

            {/* PERFIL */}
            <div className="bg-white p-6 rounded-2xl shadow">

              <h2 className="text-xl font-semibold mb-5">
                Perfil
              </h2>

              <div className="flex flex-col gap-4">

                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-2"
                  placeholder="Nombre"
                />

                <input
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-2"
                  placeholder="Correo"
                />

                <button
                  onClick={guardarCambios}
                  className="bg-blue-600 text-white p-2 rounded-xl"
                >
                  Guardar cambios
                </button>

              </div>
            </div>

            {/* INFO */}
            <div className="bg-white p-6 rounded-2xl shadow">

              <h2 className="text-xl font-semibold mb-5">
                Información de la cuenta
              </h2>

              {tecnico ? (
                <div className="space-y-3">

                  <p><b>ID:</b> {tecnico.id}</p>
                  <p><b>Nombre:</b> {tecnico.nombre}</p>
                  <p><b>Correo:</b> {tecnico.correo}</p>
                  <p><b>Empresa:</b> {tecnico.empresa}</p>

                </div>
              ) : (
                <p className="text-gray-500">
                  Cargando datos...
                </p>
              )}

            </div>

            {/* SESIÓN */}
            <div className="bg-white p-6 rounded-2xl shadow">

              <h2 className="text-xl font-semibold mb-5 text-red-500">
                Sesión
              </h2>

              <button
                onClick={cerrarSesion}
                className="bg-red-500 text-white p-2 rounded-xl w-full"
              >
                Cerrar sesión
              </button>

            </div>

          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}