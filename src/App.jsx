import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Invetario from './pages/Invetario'
import Personal from './pages/Personal'
import Configuracion from './pages/Configuracion'
import './App.css'

function App () {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/Dashboard' element={<Dashboard />} />
      <Route path='/Invetario' element={<Invetario />} />
      <Route path='/Personal' element={<Personal />} />
      <Route path='/Configuracion' element={<Configuracion />} />
    </Routes>
  )
}

export default App
