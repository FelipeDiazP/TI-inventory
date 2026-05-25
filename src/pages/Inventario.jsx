import { useEffect, useState } from 'react'
import HeaderComponent from '../components/Header.jsx'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import { createClient } from '@supabase/supabase-js'

// 🔥 CONEXIÓN SUPABASE
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function Inventario() {
  const [inventario, setInventario] = useState([])

  // =========================
  // OBTENER INVENTARIO
  // =========================
  const obtenerInventario = async () => {
    const { data, error } = await supabase
      .from('inventario')
      .select('*')

    if (error) {
      console.log(error.message)
      return
    }

    setInventario(data)
  }

  useEffect(() => {
    obtenerInventario()
  }, [])

  return (
    <DashboardLayout>
      <div className="animate-fade-in-down">
        <HeaderComponent />

        <main className="p-4">

          <h1 className="text-2xl font-bold mb-4">
            Inventario
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {inventario.length === 0 ? (
              <p className="text-gray-500">
                No hay inventario registrado
              </p>
            ) : (
              inventario.map((item) => (
                <div
                  key={item.id}
                  className="border p-4 rounded-2xl shadow bg-white hover:scale-105 transition"
                >

                  <h2 className="text-lg font-bold">
                    {item.nombre}
                  </h2>

                  <div className="w-full h-0.5 bg-black/20 my-2" />

                  <p>
                    Cantidad:{' '}
                    <span className="font-semibold">
                      {item.cantidad}
                    </span>
                  </p>

                  <p className="text-sm text-gray-500">
                    Categoría: {item.categoria}
                  </p>

                  <p className="text-sm mt-2 text-gray-600">
                    {item.descripcion}
                  </p>

                  {item.cantidad <= item.stock_minimo && (
                    <p className="text-red-500 font-bold mt-2">
                      ⚠️ Stock bajo
                    </p>
                  )}

                </div>
              ))
            )}

          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}