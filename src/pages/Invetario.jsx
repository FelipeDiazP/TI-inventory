import { useEffect, useState } from 'react'
import HeaderComponent from '../components/header'
import DashboardLayout from '../layouts/DashboardLayout'

export default function Invetario () {
  const [inventario, setInventario] = useState([])

  const invetario = async () => {
    try {
      const res = await fetch('http://localhost:3000/inventario')
      const data = await res.json()
      setInventario(data)
    } catch (error) {
      console.error('Pailas mi rey la jodiste:', error)
    }
  }

  useEffect(() => {
    invetario()
  }, [])

  return (
    <DashboardLayout>
      <div className='animate-fade-in-down'>
        <HeaderComponent />
        <main>
          <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>Inventario</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {
                inventario.map((item) => (
                  <div key={item.id} className='border-2 border-green-500 p-4 rounded-2xl shadow bg-white hover:scale-105 transition'>
                    <h2 className='text-lg font-bold'>{item.nombre}</h2>
                    <div className='w-full h-0.5 bg-black/30 my-2' />
                    <p>Stock:{' '} <span className='font-semibold'>{item.stock}</span></p>
                    <p className='text-sm text-gray-500'>Equipo{item.equipo}</p>
                    {
                      item.stock <= 2 && (
                        <p className='text-red-500 font-bold mt-2'>⚠️ Stock bajo</p>
                      )
                    }
                  </div>
                ))
              }
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}
