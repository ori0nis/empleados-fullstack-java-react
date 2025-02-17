package gm.rh.controlador;

import gm.rh.excepcion.RecursoNoEncontradoExcepcion;
import gm.rh.modelo.Empleado;
import gm.rh.servicio.EmpleadoServicio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("rh-app") //http://localhost:8080/rh-app
@CrossOrigin(value = "http://localhost:5173") // Puerto de React-Vite
public class EmpleadoControlador {

    private static final Logger logger = LoggerFactory.getLogger(EmpleadoControlador.class);

    @Autowired
    private EmpleadoServicio empleadoServicio;

    @GetMapping("/empleados")
    public List<Empleado> obtenerEmpleados(){
        List<Empleado> empleados = empleadoServicio.listarEmpleados();
        empleados.forEach((empleado) -> logger.info(empleado.toString()));
        return empleados;
    }

    // Recordar: @RequestBody permite a Springboot convertir el JSON que viene con el submit
    // del formulario en un objeto de tipo empleado
    @PostMapping("/empleados")
    public Empleado agregarEmpleado(@RequestBody Empleado empleado){
        logger.info("Empleado a agregar: " + empleado);
        return empleadoServicio.guardarEmpleado(empleado);
    }

    @GetMapping("/empleados/{id}")
    // Aclaramos que la respuesta tiene tipo entidad para que pueda funcionar el método:
    public ResponseEntity<Empleado> obtenerEmpleadoPorId(@PathVariable Integer id){
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(id);
        if(empleado == null){
            throw new RecursoNoEncontradoExcepcion("No se encontró el empleado con id: " + id);
        } else {
            return ResponseEntity.ok(empleado);
        }
    }

    // RequestBody permite que el servidor "abra el paquete" donde está la actualización del empleado para ver
    // si existe un empleado con ese id. En caso de que sí, la info del empleado se actualiza con la del paquete.
    @PutMapping("/empleados/{id}")
    public ResponseEntity<Empleado> actualizarEmpleado(@PathVariable Integer id,
                                                       @RequestBody Empleado empleadoRecibido){
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(id);
        if(empleado == null){
            throw new RecursoNoEncontradoExcepcion("El id recibido no existe: " + id);
        } else {
            empleado.setNombre(empleadoRecibido.getNombre());
            empleado.setDepartamento(empleadoRecibido.getDepartamento());
            empleado.setSueldo(empleadoRecibido.getSueldo());
            empleadoServicio.guardarEmpleado(empleado);
            return ResponseEntity.ok(empleado);
        }
    }

    @DeleteMapping("/empleados/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarEmpleado(@PathVariable Integer id){
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(id);
        if(empleado == null){
            throw new RecursoNoEncontradoExcepcion("El id recibido no existe: " + id);
        } else {
            empleadoServicio.eliminarEmpleado(empleado);
        }
        // Formamos la respuesta que vamos a mostrar:
        Map<String, Boolean> respuesta = new HashMap<>();
        // Utilizamos Boolean.TRUE y no true porque el Map está esperando un objeto de la clase Boolean, no el
        // tipo primitivo true:
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}
