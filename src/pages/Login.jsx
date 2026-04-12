import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/database'

export default function Login () {
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

    try {
      const useCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      )

      console.log('Usuario Logueado:', useCredential.user)
      navigate('/Dashboard')
    } catch (error) {
      console.log(error.code)

      if (error.code === 'auth/user-not-found') {
        console.log('Usuario no encontrado')
      } else if (error.code === 'auth/wrong-password') {
        console.log('Contraseña incorrecta')
      } else {
        console.log('Error al iniciar sesión')
      }
    }
  }
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <div className='flex flex-col items-center gap-2'>
        <h1 className='text-3xl md:text-4xl font-bold'>Welcome Back</h1>
        <span className='text-lg md:text-xl text-gray-500'>Manage your infrastructure with ease.</span>
      </div>
      <div className='border-2 border-gray-200 p-5 shadow-md mt-6 md:mt-8 rounded-md w-full max-w-md'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <span>Email Address</span>
          <input
            type='email'
            name='email'
            value={form.email}
            onChange={handleChange}
            placeholder='name@company.com'
            className='border border-gray-300 rounded-md p-2 md:p-3 outline-none focus:ring-2 focus:ring-gray-600'
          />
          <span>Password</span>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            value={form.password}
            onChange={handleChange}
            placeholder='••••••••'
            className='border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-gray-600'
          />
          <div className='flex flex-row items-center gap-2'>
            <input type='checkbox' onChange={() => setShowPassword(!showPassword)} className='scale-130' />
            <span className='text-gray-500'>Remeber this device</span>
          </div>
          <button className='cursor-pointer bg-blue-600 text-white py-2 md:py-3 px-4 rounded-md hover:bg-blue-700 transition-colors'>Sign in</button>
        </form>
        <p className='mt-8 text-gray-500'>
          Don't have an account?
          <a className='ml-2 text-blue-600 font-bold cursor-pointer' onClick={() => navigate('/Register')}>Create Account</a>
        </p>
      </div>
    </div>
  )
}
