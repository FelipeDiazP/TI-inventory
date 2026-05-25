import { useEffect, useState } from 'react'
import HeaderComponent from '../components/Header.jsx'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function Personal() {
  const [tecnicos, setTecnicos] = useState([])

  const obtenerTecnicos = async () => {
  const { data, error } = await supabase
    .from('tecnicos')
    .select('*')

  console.log("📦 TECNICOS:", data)
  console.log("❌ ERROR:", error)

  if (error) return

  setTecnicos(data)
}

  useEffect(() => {
    obtenerTecnicos()
  }, [])

  return (
    <DashboardLayout>
      <div className="animate-fade-in-down">

        <HeaderComponent />

        <main className="p-4">

          <h1 className="text-2xl font-bold mb-4">
            👨‍🔧 Personal técnico
          </h1>

          {/* LISTA */}
          <div className="space-y-3">

            {tecnicos.length === 0 ? (
              <p className="text-gray-500">
                No hay técnicos registrados
              </p>
            ) : (
              tecnicos.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition"
                >

                  {/* INFO IZQUIERDA */}
                  <div className="flex items-center gap-3">

                    {/* AVATAR */}
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {t.name?.charAt(0)}
                    </div>

                    {/* DATOS */}
                    <div>
                      <h2 className="font-semibold">
                        {t.nombre}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {t.correo}
                      </p>
                    </div>
                  </div>

                  {/* EMPRESA / TAG */}
                  <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    {t.empresa || 'Técnico'}
                  </span>

                </div>
              ))
            )}

          </div>
        </main>

      </div>
    </DashboardLayout>
  )
}