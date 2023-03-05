import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import api from "../services/api";


export const Crear = () => {

  const [formValue, setFormValue] = useState({
    nombre: '',
    correo: '',
  })
  const { nombre, correo } = formValue;
  
  const handleChange = ({ target } ) => {
    const { name, value } = target;
    // console.log({ name, value })

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const onSubmit = ( event ) => {
    event.preventDefault();
    if( nombre.length <= 1 || !correo.includes('@') || correo.length <= 1 ) {
      Swal.fire('Error al registrar', 'Campos incorrectos', 'error');
      return;
    }

    fetch(`${api}/?insertar=1`, {
      method: 'POST',
      body: JSON.stringify( formValue )
    })
    .then(response => response.json())
    .then(result => console.log(result));

    // window.history.back();


  }

  return (
    <div className="card">
        <div className="card-header">
            Registra un nuevo empleado
        </div>
        <div className="card-body">
            <form action="" onSubmit={ onSubmit }>
              <div className="form-group">
                <label>Nombre:</label>
                <input 
                type="text" 
                name="nombre" 
                value={ nombre }
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
                value={ correo }
                onChange={ handleChange }
                id="correo" 
                className="form-control" 
                aria-describedby="helpId" 
                />
                <small id="helpId" className="text-muted">Escribe el correo electronico del empleado</small>
              </div>

              <div className="btn-group" role="group" aria-label="">
                <button type="submit" className="btn btn-success">Agregar</button>
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
