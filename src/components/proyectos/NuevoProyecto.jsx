import React, { useContext, useState } from 'react'
import ProyectoContext from '../../context/proyectos/ProyectoContext';

export const NuevoProyecto = () => {
    const proyectosContext = useContext(ProyectoContext);
    const { formulario, mostrarError, mostrarFormulario, agregarProyecto, errorFormulario } = proyectosContext;

    const [proyecto, guardarProyecto] = useState({ nombre: '' });
    const { nombre } = proyecto;

    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    const onClickFormulario = () => {
        mostrarFormulario();
    }

    const onSubmitProyecto = e => {
        e.preventDefault();

        if (nombre === '') {
            mostrarError();
            return;
        }

        agregarProyecto(proyecto);
        guardarProyecto({ nombre: '' });
    }

    return (
        <>
            <button type="button" className="btn btn-block btn-primario"
                onClick={onClickFormulario}>
                Nuevo proyecto
            </button>
            {
                formulario && (
                    <form className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}>
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Nombre proyecto"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeProyecto}
                        />
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Agregar proyecto"
                            name="nombre"
                        />
                    </form>
                )
            }
            {errorFormulario ? <p className="mensaje error">El nombre es obligatorio</p> : null }
        </>
    )
}
