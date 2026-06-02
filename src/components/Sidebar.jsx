import {
  LayoutDashboard,
  Settings,
  ShelvingUnit,
  CircleUserRound
} from 'lucide-react'

import {
  useLocation,
  NavLink
} from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  )

  const nombre = user.nombre
  const correo = user.correo
  const empresa = user.empresa

  const info = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard />,
      path: '/Dashboard'
    },
    {
      title: 'Inventario',
      icon: <ShelvingUnit />,
      path: '/Inventario'
    },
    {
      title: 'Personal',
      icon: <CircleUserRound />,
      path: '/Personal'
    },
    {
      title: 'Configuración',
      icon: <Settings />,
      path: '/configuracion'
    }
  ]

  return (
    <aside className='w-64 bg-gray-900 h-screen sticky top-0 text-white'>
      <section className='p-3'>
        <div className='flex items-center gap-3'>
          <img
            src='./Icon2.png'
            alt='Icon SideBar'
          />

          <h1 className='text-2xl font-semibold'>
            Inventory
          </h1>
        </div>

        <div className='mt-10'>
          {info.map((item, index) => {
            const isActive =
              location.pathname === item.path

            return (
              <NavLink
                key={index}
                to={item.path}
              >
                <div
                  className={`flex gap-2 p-2 rounded-lg transition-all mt-4 ${isActive
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-slate-800 text-gray-300'
                    }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </div>
              </NavLink>
            )
          })}
        </div>

        <div className='mt-[310px] animate-fade-in'>
          <div className='h-0.5 w-56 mt-7 rounded-2xl bg-gray-400 mb-5' />

          <h1 className='font-semibold'>
            {nombre || 'Usuario'} - {empresa || 'Empresa'}
          </h1>

          <p className='text-gray-400 text-sm'>
            {correo || 'Sin correo'}
          </p>
        </div>
      </section>
    </aside>
  )
}