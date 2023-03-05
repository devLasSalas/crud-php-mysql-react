import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2";
import api from "../services/api";



export const Editar = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(id)  
  const [empleado, setEmpleado] = useState({
    id: '',
    nombre: '',
    correo: '',
  })

  useEffect(() => {
    fetch(`${api}/?consultar=`+id)
    .then(response => response.json())
    .then(result => {
      const { id, nombre, correo } = result[0];
      setEmpleado({
        id,
        nombre,
        correo
      })
    })
  },[ ])

  const handleChange = ({ target }) => {
    
    const { name, value } = target;
    
    setEmpleado({
      ...empleado,
      [name]: value
    })
  }
  const onSubmit = ( event ) => {
    event.preventDefault();

    fetch(`${api}/?actualizar=1`, {
      method: "POST",
      body: JSON.stringify( empleado )
    })
    .then(response => response.ok)
    .then(result =>  {
      if( result === true ) {
        Swal.fire('Actualizacion exitosa', 'Se actualizo el empleado correctamente','success')
      }
    })

    navigate('/')
  
  }
  

   

  return (
      <div className="card">
        <div className="card-header">
            Editar empleados
        </div>
        <div className="card-body">
            <form action="" onSubmit={ onSubmit }>

              <div className="form-group">
                <label>Clave:</label>
                <input 
                type="text" 
                disabled 
                value={ empleado?.id }
                className="form-control" 
                name="id" 
                id="id" 
                aria-describedby="helpId"
                placeholder=""
                />
                <small id="helpId" className="form-text text-muted">Clave</small>
              </div>

              <div className="form-group">
                <label>Nombre:</label>
                <input 
                type="text" 
                name="nombre" 
                value={ empleado.nombre }
                onChange={ handleChange }
                id="nombre"
                className="form-control" 
                aria-describedby="helpId" 
                />
                <small id="helpId" className="text-muted">Escribe el nombre del empleado</small>
              </div>

              <div className="form-group">
                <label>Correo:</label>
                <input 
                type="text" 
                name="correo" 
                value={ empleado.correo }
                onChange={ handleChange }
                id="correo" 
                className="form-control" 
                aria-describedby="helpId" 
                />
                <small id="helpId" className="text-muted">Escribe el correo electronico del empleado</small>
              </div>

              <div className="btn-group" role="group" aria-label="">
                <button type="submit" className="btn btn-success">Actualizar</button>
                &nbsp;
                <Link className="btn btn-primary" to='/'>Cancelar</Link>
              </div>
            </form>
        </div>
        <div className="card-footer text-muted">
            
        </div>
    </div>
  )
}
