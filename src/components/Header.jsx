import { useNameUser } from '../hooks/nameUser.js'
import { User } from 'lucide-react'

export default function HeaderComponent () {
  const { nombre } = useNameUser()
  const fecha = new Date().toLocaleDateString('es-Co', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <header>
      <div>
        <section className='flex flex-row items-center justify-between p-3'>
          <h1 className='text-2xl font-semibold'>Panel de Control</h1>
          <span>{fecha}</span>
          <div className='flex gap-2 border-2 border-blue-500 rounded-2xl p-2 '>
            <User size={20} className='text-blue-600' />
            <h1 className='font-bold text-blue-600'>Supporter {nombre}</h1>
          </div>
        </section>
      </div>
      <div className='h-0.5 max-w-full bg-blue-400' />
    </header>
  )
}
