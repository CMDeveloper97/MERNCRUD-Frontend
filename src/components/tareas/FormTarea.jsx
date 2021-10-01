import React, { useContext, useState, useEffect } from 'react'
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

export const FormTarea = () => {
    const proyectoContext = useContext(ProyectoContext);
    const {proyecto} = proyectoContext;

    const tareaContext = useContext(TareaContext);
    const {tareaSeleccionada, agregarTarea, errorTarea, validarTarea, actualizarTarea} = tareaContext; 

    useEffect(() => {
        if(tareaSeleccionada){
            guardarTarea(tareaSeleccionada);
        }else {
            guardarTarea({nombre: ''})
        }
    }, [tareaSeleccionada])

    const [tarea, guardarTarea] = useState({nombre: ''})
    const {nombre} = tarea;

    if(!proyecto) return null;
 
    const handleChange = e => {
        guardarTarea({  ...tarea, [e.target.name] : e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();

        if(nombre.trim() === ''){
            validarTarea();
            return;
        } 

        if(tareaSeleccionada){
            actualizarTarea(tarea);
        }else {
            tarea.proyecto = proyecto._id; 
            agregarTarea(tarea);
        }
 
        guardarTarea({nombre:''})
    }

    return (
        <div className="formulario">
             <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errorTarea}
            {errorTarea && <p className="mensaje error">El nombre de la tarea es obligatorio.</p>}
        </div>
    )
}
