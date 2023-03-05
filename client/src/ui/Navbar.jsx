import { NavLink } from "react-router-dom"

export const Navbar = () => {

  let activeLink = {
    color: 'red'
  }

  return (
    <nav className="navbar navbar-expand navbar-light bg-light mb-5">
            <div className="nav navbar-nav">
                <NavLink 
                className='nav-item nav-link' 
                style={( { isActive }) =>  isActive ? activeLink : undefined } to='/'
                >
                  Sistema
                </NavLink>

                <NavLink 
                className='nav-item nav-link' 
                style={( { isActive }) => isActive ? activeLink : undefined } to='/crear'
                >
                  Crear empleado
                </NavLink>
                
                <NavLink 
                className='nav-item nav-link' 
                style={( { isActive }) => isActive ? activeLink : undefined } to='/editar'
                >
                  Editar empleado
                </NavLink>
            </div>
    </nav>

  )
}
