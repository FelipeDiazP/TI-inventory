import { useEffect, useState } from 'react'

export function useNameUser (email) {
  const [nombre, setNombre] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/tecnicos/email/${email}`)
        const data = await res.json()

        if (res.ok) {
          setNombre(data.name)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (email) getUser()
  }, [email])

  return { nombre, loading }
}
