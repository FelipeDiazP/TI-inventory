import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Notification from '../components/Notification.jsx'
import { Building, LockKeyhole, Mail, User } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState({
    message: '',
    type: ''
  })
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    password: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.company || !form.password) {
      setNotification({
        message: 'Todos los campos son obligatorios',
        type: 'error'
      })
      return
    }

    if (form.password.length < 8) {
      setNotification({
        message: 'La contraseña debe tener minimo 8 caracteres',
        type: 'error'
      })
      return
    }

    try {
      setLoading(true)

      const { data, error } = await supabase
        .from('tecnicos')
        .insert([
          {
            nombre: form.name,
            correo: form.email,
            empresa: form.company,
            password: form.password
          }
        ])
        .select()

      if (error) throw error

      console.log('Tecnico creado:', data)

      setNotification({
        message: 'Se registro con éxito',
        type: 'success'
      })

      setTimeout(() => {
        navigate('/')
      }, 1500)
    } catch (error) {
      console.log(error)

      setNotification({
        message: error.message || 'Error en el registro',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 md:px-2 animate-fade-in-up'>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />

      <div className='bg-white w-full max-w-md p-8 rounded-xl shadow-sm border border-gray-200'>
        <h2 className='text-lg md:text-xl font-semibold text-gray-900'>
          Crea tu cuenta
        </h2>

        <p className='text-sm text-gray-500 mt-1'>
          Centraliza y administra tus tickets de forma eficiente.
        </p>

        <form className='mt-6 flex flex-col gap-5' onSubmit={handleSubmit}>
          <div>
            <label className='text-sm font-medium text-gray-700'>
              Nombre Completo
            </label>
            <div className='flex items-center gap-3 mt-1 border border-gray-300 rounded-lg px-3 py-2'>
              <User size={18} className='text-gray-400' />
              <input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder='Duvan Jose Mendez Flores'
                className='flex-1 outline-none text-sm'
              />
            </div>
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700'>
              Correo empresarial
            </label>
            <div className='flex items-center gap-3 mt-1 border border-gray-300 rounded-lg px-3 py-2'>
              <Mail size={18} className='text-gray-400' />
              <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder='name@company.com'
                className='flex-1 outline-none text-sm'
              />
            </div>
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700'>
              Nombre Empresa
            </label>
            <div className='flex items-center gap-3 mt-1 border border-gray-300 rounded-lg px-3 py-2'>
              <Building size={18} className='text-gray-400' />
              <input
                type='text'
                name='company'
                value={form.company}
                onChange={handleChange}
                placeholder='Your organization name'
                className='flex-1 outline-none text-sm'
              />
            </div>
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700'>
              Contraseña
            </label>
            <div className='flex items-center gap-3 mt-1 border border-gray-300 rounded-lg px-3 py-2'>
              <LockKeyhole size={18} className='text-gray-400' />
              <input
                type='password'
                name='password'
                value={form.password}
                onChange={handleChange}
                placeholder='••••••••'
                className='flex-1 outline-none text-sm'
              />
            </div>
            <p className='text-xs text-gray-400 mt-1'>
              Minimo 8 caracteres entre letras y simbolos
            </p>
          </div>
          <button
            type='submit'
            disabled={loading}
            className='cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors'
          >
            {loading ? 'Cargando...' : 'Crear Cuenta'}
          </button>

        </form>
        <p className='text-gray-500 text-center mt-6'>
          Ya tienes cuenta?{' '}
          <a className='ml-2 text-blue-600 font-bold cursor-pointer' onClick={() => navigate('/')}>
            Inicia Sesion
          </a>
        </p>

      </div>
    </div>
  )
}
