import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Crear, Listar, Editar } from "./components"
import { Navbar } from './ui/Navbar'

export const App = () => {
  return (
    <Router>
        <Navbar/>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Listar />} />
          <Route path='crear' element={<Crear />} />
          <Route path='editar/:id' element={<Editar />} />
        </Routes>
      </div>
    </Router>
  ) 
}
