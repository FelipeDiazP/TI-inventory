import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from('tecnicos')
      .select('*')
      .eq('correo', form.email)
      .eq('password', form.password)
      .single()

    if (error || !data) {
      console.log('Usuario o contraseña incorrectos')
      return
    }

    console.log('DATA LOGIN:', data)

    localStorage.setItem(
      'user',
      JSON.stringify(data)
    )

    console.log(
      'USER GUARDADO:',
      localStorage.getItem('user')
    )

    navigate('/Dashboard')
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen animate-fade-in-down'>
      <div className='flex flex-col items-center gap-2'>
        <h1 className='text-3xl md:text-4xl font-bold'>
          Bienvenido
        </h1>

        <span className='text-lg md:text-xl text-gray-500'>
          Gestiona tus tickets de soporte fácilmente.
        </span>
      </div>

      <div className='border-2 border-gray-200 p-5 shadow-md mt-6 md:mt-8 rounded-md w-full max-w-md'>
        <form
          className='flex flex-col gap-4'
          onSubmit={handleSubmit}
        >
          <span>Correo</span>

          <input
            type='email'
            name='email'
            placeholder='Ejemplo@test.com'
            value={form.email}
            onChange={handleChange}
            className='border p-2 rounded-md'
          />

          <span>Contraseña</span>

          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='••••••••'
            value={form.password}
            onChange={handleChange}
            className='border p-2 rounded-md'
          />

          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              onChange={() => setShowPassword(!showPassword)}
            />

            <span className='text-gray-500'>
              Mostrar contraseña
            </span>
          </div>

          <button
            type='submit'
            className='bg-blue-600 text-white py-2 rounded-md cursor-pointer transition duration-300 hover:bg-blue-800'
          >
            Iniciar Sesion
          </button>
        </form>

        <p className='text-gray-500 text-center mt-6'>
          No tienes cuenta?

          <span
            className='ml-2 text-blue-600 font-bold cursor-pointer'
            onClick={() => navigate('/Register')}
          >
            Registrate
          </span>
        </p>
      </div>
    </div>
  )
}