import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../config/database'
import { Building, LockKeyhole, Mail, User } from 'lucide-react'
import Notification from '../components/Notification.jsx'

export default function Register () {
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
    if (form.password.length < 0) {
      setNotification({
        message: 'La contraseña debe tener minimo 8 caracteres',
        type: 'error'
      })
      return
    }
    try {
      setLoading(true)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      )

      const user = userCredential.user

      await setDoc(doc(db, 'Soportes', user.uid), {
        name: form.name,
        email: form.email,
        company: form.company,
        password: form.password,
        createdAt: new Date()
      })
      console.log('Usuario agregado en Firestore')
      setNotification({
        message: 'Se registro con exito',
        type: 'success'
      })

      setTimeout(() => {
        navigate('/')
      }, 1500)
    } catch (error) {
      setNotification({
        message: 'Este correo ya esta registrado',
        type: 'error'
      })
      console.log('Error:', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 md:px-2'>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <div className='flex items-center gap-2 mb-6'>
        <img src='./Icon.png' alt='Icon register' className='w-6 h-6' />
        <h1 className='text-lg font-semibold text-gray-800'>
          IT Inventory
        </h1>
      </div>

      <div className='bg-white w-full max-w-md p-8 rounded-xl shadow-sm border border-gray-200'>
        <h2 className='text-lg md:text-xl font-semibold text-gray-900'>
          Create Your Account
        </h2>

        <p className='text-sm text-gray-500 mt-1'>
          Start managing your IT infrastructure today.
        </p>

        <form className='mt-6 flex flex-col gap-5' onSubmit={handleSubmit}>
          <div>
            <label className='text-sm font-medium text-gray-700'>
              Full Name
            </label>
            <div className='flex items-center gap-3 mt-1 border border-gray-300 rounded-lg px-3 py-2'>
              <User size={18} className='text-gray-400' />
              <input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder='Enter your full name'
                className='flex-1 outline-none text-sm'
              />
            </div>
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700'>
              Work Email
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
              Company Name
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
              Password
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
              Minimum 8 characters with numbers and symbols
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
          Already have an account?{' '}
          <a className='ml-2 text-blue-600 font-bold cursor-pointer' onClick={() => navigate('/')}>
            Sign in
          </a>
        </p>

      </div>
    </div>
  )
}
