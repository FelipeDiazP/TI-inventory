import HeaderComponent from '../components/Header.jsx'
import DashboardLayout from '../layouts/DashboardLayout'

export default function Configuracion () {
  return (
    <DashboardLayout>
      <div className='animate-fade-in-down'>
        <HeaderComponent />
        <div className='p-5'>
          <h1 className='text-xl font-semibold'>Configuracion</h1>
          <div className='flex flex-row gap-5 mt-5'>
            <span>Cambiar nombre</span>
            <input type='text' placeholder='Editar nombre' className='p-1' />
          </div>
          <div className='flex flex-row gap-5 mt-5'>
            <span>Cambiar email</span>
            <input type='text' placeholder='Editar email' className='p-1' />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
