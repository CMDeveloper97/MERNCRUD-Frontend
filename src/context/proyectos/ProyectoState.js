import { useReducer } from "react";
import ProyectoContext from "./ProyectoContext";
import ProyectoReducer from "./ProyectoReducer";
import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO, PROYECTO_ERROR } from '../../types'
import clienteAxios from '../../config/axios'

export const ProyectoState = ({ children }) => { 
    const initialState = {
        proyectos: [],
        formulario: false,
        errorFormulario: false,
        proyecto: null,
        mensaje: null
    }

    // dispatch para jecturar las acciones
    const [state, dispatch] = useReducer(ProyectoReducer, initialState);

    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        });
    }

    const obtenerProyectos = async () => {
        try {
            const response = await clienteAxios.get('api/proyectos');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: response.data.proyectos
            });
        } catch (error) { 
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            } 
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    const agregarProyecto = async proyecto => {
        try {
            const response = await clienteAxios.post('api/proyectos', proyecto);
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: response.data
            })
        } catch (error) { 
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            } 
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        });
    }

    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    const eliminarProyecto = async proyectoId => {
     
        try {
            await clienteAxios.delete(`api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
    
        } catch (error) { 
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            } 
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    return (
        <ProyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorFormulario: state.errorFormulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}>
            {children}
        </ProyectoContext.Provider>
    )

}