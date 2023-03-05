import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"


export const Listar = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`${api}/`)
        .then(response => response.json())
        .then( result => setData( result ));
    
    }, [ data ])
    
    const eliminarEmpleado = ( id ) => {
        fetch(`${api}/?borrar=`+id)
        .then(response => response.ok)
        .then( result => console.log(result)); 
    }
    


  return (
    <>
    <div className="card">
        <div className="card-header">
            <Link className="btn btn-success" to='/crear'>Agregar nuevo empleado</Link>
        </div>

        <div className="card-body">
            <h4>Lista de empleados</h4>
                <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            data.map((user) => (
                            <tr key={ user.id }>
                                <td scope="row">{ user.id }</td>
                                <td>{ user.nombre }</td>
                                <td>{ user.correo }</td>
                                
                                <td>
                                    <div className="btn-group" role="group" aria-label="">
                                        <Link 
                                        to={`/editar/${user.id}`}
                                        className="btn btn-warning"
                                        >
                                        Editar
                                        </Link>

                                        &nbsp;

                                        <button 
                                        type="button" 
                                        className="btn btn-danger" 
                                        onClick={() => eliminarEmpleado( user.id ) }
                                        >
                                        Borrar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            ))
                        }

                </tbody>
            </table>
        </div>
        

    </div>

    </>
  )
}
