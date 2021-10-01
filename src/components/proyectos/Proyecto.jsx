import React, { useContext } from 'react'  
import ProyectoContext from '../../context/proyectos/ProyectoContext'
import TareaContext from '../../context/tareas/TareaContext';

export const Proyecto = ({proyecto}) => {

    const proyectoContext = useContext(ProyectoContext);
    const { proyectoActual } = proyectoContext;

    const tareaContext = useContext(TareaContext);
    const { obtenerTareas } = tareaContext;  

    const seleccionarProyecto = id => {
        obtenerTareas(id);
        proyectoActual(id);
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank" 
                onClick={()=>seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre} </button>
        </li>
    )
}
