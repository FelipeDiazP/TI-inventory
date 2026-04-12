import { useEffect, useState } from 'react'
import HeaderComponent from '../components/Header.jsx'
import DashboardLayout from '../layouts/DashboardLayout'
import { db } from '../config/database'
import { collection, getDocs } from 'firebase/firestore'

export default function Personal () {
  const [soportes, setSoportes] = useState([])

  const obtenerPersonal = async () => {
    const querySnapshot = await getDocs(collection(db, 'Soportes'))

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))

    setSoportes(data)
  }

  useEffect(() => {
    obtenerPersonal()
  }, [])
  return (
    <DashboardLayout>
      <div className='animate-fade-in-down'>
        <HeaderComponent />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
          {soportes.map((s) => (
            <div
              key={s.id}
              className='border-2 border-blue-600 p-4 rounded-xl shadow bg-white'
            >
              <h2 className='text-lg font-bold'>{s.name}</h2>
              <p className='text-gray-600'>{s.email}</p>
              <p className='text-sm text-gray-500'>{s.company}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
