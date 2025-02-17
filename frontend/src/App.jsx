import Nav from "./plantilla/nav";
import ListadoEmpleados from "./empleados/ListadoEmpleados";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AgregarEmpleado from "./empleados/AgregarEmpleado";
import EditarEmpleado from "./empleados/EditarEmpleado";


function App() {
  return (
   <div className="container">
    {/* Podríamos adjuntar los componentes así, pero los vamos a adjuntar con las rutas */}
    {/* <Nav/>
    <ListadoEmpleados/> */}
    <BrowserRouter>
      <Nav/>
        <Routes>
          <Route exact path='/' element={<ListadoEmpleados/>}></Route>
          <Route exact path="/agregar" element={<AgregarEmpleado/>}/>
          <Route exact path="/editar/:id" element={<EditarEmpleado/>}/>
        </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
