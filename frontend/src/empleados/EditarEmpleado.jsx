import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarEmpleado() {

    const urlBase = "http://localhost:8080/rh-app/empleados";

    let navegacion = useNavigate();

    // Recogemos el valor del id que se pasa con el URL gracias a useParams(). Si se encuentra el parámetro id, se inicializará con el valor que se esté recibiendo en la URL:
    const {id} = useParams();

    const [empleado, setEmpleado] = useState({
        // Primero creamos los atributos, para poder relacionarlos luego con el form:
        nombre: "",
        departamento: "",
        sueldo: ""
    })

    // Definimos al empleado:
    const {nombre, departamento, sueldo} = empleado;

    // Procesamos lo que ocurre cuando se carga el componente de EditarEmpleado():
    useEffect(() => {
        cargarEmpleado();
    }, []);

    const cargarEmpleado = async () => {
        // Esto es como una llamada indirecta al buscarEmpleadoPorId() de Java, ya que la URL proporcionada tiene la misma estructura:
        const resultado = await axios.get(`${urlBase}/${id}`);
        // Inicializamos al empleado con los datos obtenidos de la petición:
        setEmpleado(resultado.data);
    }

    const onInputChange = (e) => {
        // Utilizamos el operador spread (...) para crear una copia del objeto empleado y expandir sus atributos. Luego, actualizamos el valor del atributo correspondiente de empleado usando el nombre del componente (e.target.name) como clave y el valor del componente (e.target.value) como valor. De esta manera, el estado de empleado se actualiza con el nuevo valor del campo del formulario que generó el evento. Es decir, esto sirve para "actualizar al empleado". El : sirve para asignar la propiedad de value a la de name, que es un valor dinámico:
        setEmpleado({...empleado, [e.target.name]: e.target.value});
        // Esto sería lo mismo, pero en código más básico:
        // const updatedEmpleado = {...empleado};
        // updatedEmpleado[e.target.name] = e.target.value;
        // setEmpleado(updatedEmpleado);
    }

    const onSubmit = async (e) => {
        // Esto evita que los parámetros se coloquen dentro de la URL y sean parte del cuerpo del envío del form:
        e.preventDefault();
        // En el caso de editar, la petición que mandamos ya no es tipo post, sino put:  
        await axios.put(`${urlBase}/${id}`, empleado);
        // Redirigimos a inicio, ya que el tipo de petición put hace que los empleados aparezcan actualizados cuando redireccionamos:
        navegacion("/");
    }

  return (
    <div className='container'>
        <div className='container text-center' style={{margin: "30px"}}>
            <h3>Editar empleado</h3>
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            {/* Asociamos el elemento empleado con cada uno de los elementos del form. Recibimos el evento y lo pasamos a onInputChange() */}
            <input type="text" className="form-control" id="nombre" name="nombre" required={true} value={nombre} onChange={(e) => onInputChange(e)}/>
        </div>
        <div className="mb-3">
            <label htmlFor="departamento" className="form-label">Departamento</label>
            <input type="text" className="form-control" id="departamento" name='departamento'
            value={departamento} onChange={(e) => onInputChange(e)}/>
        </div>
        <div className="mb-3">
            <label htmlFor="sueldo" className="form-label">Sueldo</label>
            <input type="number" step="any" className="form-control" id="sueldo" name='sueldo'
            value={sueldo} onChange={(e) => onInputChange(e)}/>
        </div>
        <div className='container text-center'>
            <button type="submit" className="btn btn-warning btn-sm me-3">Aceptar</button>
            <a href="/" className='btn btn-danger btn-sm'>Cancelar</a>
        </div>
        </form>
    </div>
  )
}
