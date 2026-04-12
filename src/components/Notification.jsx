import { useEffect } from 'react'

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  if (!message) return null

  const baseStyles = 'fixed top-5 right-5 px-6 py-3 rounded-lg shadow-lg text-white transition-all'

  const typeStyles =
  type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-blue-500'

  return (<div className={`${baseStyles} ${typeStyles} animate-fade-in`}>{message}</div>)
}

export default Notification
