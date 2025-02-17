import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom'

export default function ListadoEmpleados() {

  // Conectamos al backend:
  const urlBase = "http://localhost:8080/rh-app/empleados";

  // Concepto de hook, declaramos un estado/objeto llamado empleados que se actualizará con la función setEmpleados() gracias a useState. Cuando useState actualiza, la página se re-renderiza automáticamente:
  const[empleados, setEmpleados] = useState([]);

  // Hook que se llama cuando se carga la página. Con el array indicamos que solo se ejecute una vez y no cree un bucle infinito:
  useEffect(() => {
    cargarEmpleados();
  }, []);

  // Axios nos permite hacer peticiones asíncronas al backend:
  const cargarEmpleados = async () => {
    const resultado = await axios.get(urlBase);
    console.log("Resultado: ");
    console.log(resultado.data);
    // Con esto cargamos los datos recibidos en la variable de empleados:
    setEmpleados(resultado.data);
  }

  const eliminarEmpleado = async (id) => {
    await axios.delete(`${urlBase}/${id}`);
    cargarEmpleados();
  }

  return (
    <div className='container text-center'>
        <div className="container" style={{margin: "30px"}}>
            <h3>Sistema de Recursos Humanos</h3>
        </div>
        <table className="table table-striped table-hover align-middle">
        <thead className='table-dark'>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Departamento</th>
            <th scope="col">Sueldo</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
          {
            // Iteramos el array de empleados:
            empleados.map((empleado, index) => (
              // Por cada elemento que iteramos, es necesario proporcionar un key o si no dará error:
              <tr key={index}>
                <th scope="row">{empleado.id}</th>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.departamento}</td>
                  <td><NumericFormat value={empleado.sueldo} displayType={'text'}
                thousandSeparator=',' prefix={'$'} decimalScale={2} fixedDecimalScale/>
                  </td>
                  <td className="text-center">
                    <div>
                      <Link to={`/editar/${empleado.id}`} 
                      className='btn btn-warning btn-sm me-3'>Editar</Link>
                      <button onClick={() => eliminarEmpleado(empleado.id)} 
                      className='btn btn-danger ntn-sm'>Eliminar</button>
                    </div>
                  </td>
              </tr>
            ))
          }
        </tbody>
        </table>
    </div>
  )
}
