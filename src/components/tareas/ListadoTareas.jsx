import React, { useContext } from 'react'
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';
import { Tarea } from './Tarea';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export const ListadoTareas = () => {
    const proyectoContext = useContext(ProyectoContext);
    const { proyecto, eliminarProyecto } = proyectoContext;

    const tareaContext = useContext(TareaContext);
    const { tareasProyecto } = tareaContext;

    if (!proyecto) return <h2>Selecciona un proyecto</h2>;

    const onClickEliminar = () => {
        eliminarProyecto(proyecto._id);
    }


    return (
        <>
            <h2>Proyecto: {proyecto.nombre} </h2>

            <ul className="listado-tareas">
                {tareasProyecto.length === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    : <TransitionGroup>
                        {tareasProyecto.map((tarea, idx) => (
                            <CSSTransition
                                key={idx}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea tarea={tarea} />
                            </CSSTransition>
                        ))
                        }
                    </TransitionGroup>
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}>
                Eliminar Proyecto &times;</button>
        </>
    )
}
