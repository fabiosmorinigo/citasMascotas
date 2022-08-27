import React, {Fragment, useState, useEffect } from "react";
import Formulario from './components/Formulario';
import Cita from "./components/Cita";
import logo from './media/logo.png'


function App() {

  //citas en localstorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))
  if(!citasIniciales){
    citasIniciales = []
  }


  //arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);


  //use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas, citasIniciales])

  

  //funcion que tome la cita actual y arregle la nueva
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
  }


  //funcion que elimina una cita por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas)
  }


  //mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas'


  return (
      <Fragment>

        <div className="container">
          <div className="row">
            <div className="one-half column">
                <Formulario 
                crearCita={crearCita}
                />
            </div>
            <div className="one-half column listaCitas">
                <h2>{titulo}</h2>
                {citas.map(cita => (
                <Cita 
                    key={cita.id}
                    cita={cita}
                    eliminarCita={eliminarCita}
                    />
                    ))}
            </div>
          </div>
        </div>

      </Fragment>
  );
}

export default App;
