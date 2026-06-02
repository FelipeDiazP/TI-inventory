import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Invetario from './pages/Inventario'
import Personal from './pages/Personal'
import Configuracion from './pages/Configuracion'
import './App.css'
import PresentationPage from './pages/PresentationPage'

function App () {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/Dashboard' element={<Dashboard />} />
      <Route path='/Inventario' element={<Invetario />} />
      <Route path='/Personal' element={<Personal />} />
      <Route path='/Configuracion' element={<Configuracion />} />
      <Route path='/PresentationPage' element={<PresentationPage />} />
    </Routes>
  )
}

export default App
