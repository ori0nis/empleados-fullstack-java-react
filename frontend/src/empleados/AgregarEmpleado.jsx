import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AgregarEmpleado() {

    let navegacion = useNavigate();

    const [empleado, setEmpleado] = useState({
        // Primero creamos los atributos, para poder relacionarlos luego con el form:
        nombre: "",
        departamento: "",
        sueldo: ""
    })

    // Definimos al empleado:
    const {nombre, departamento, sueldo} = empleado;

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
        const urlBase = "http://localhost:8080/rh-app/empleados";
        // Ahora se manda el empleado actualizado porque previamente hemos definido los atributos del empleado que se asocian con el form, y el form los actualiza con onInputChange();  
        await axios.post(urlBase, empleado);
        // Redirigimos a inicio:
        navegacion("/");
    }

  return (
    <div className='container'>
        <div className='container text-center' style={{margin: "30px"}}>
            <h3>Agregar empleado</h3>
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
