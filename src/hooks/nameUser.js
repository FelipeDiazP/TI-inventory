import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../config/database'

export function nameUser () {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getAuth()

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid
        setEmail(user.email)

        const docRef = doc(db, 'Soportes', uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setNombre(docSnap.data().name)
        }
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { nombre, email, loading }
}
