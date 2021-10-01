import TareaContext from "./TareaContext";
import TareaReducer from "./TareaReducer";  
import { useReducer } from "react";
import { ACTUALIZAR_TAREA, AGREGAR_TAREA, ELIMINAR_TAREA, TAREAS_PROYECTO, TAREA_ACTUAL, VALIDAR_TAREA } from "../../types";
import clienteAxios from '../../config/axios';

export const TareaState = ({ children }) => {
    const initialState = { 
        tareasProyecto: [],
        errorTarea: false,
        tareaSeleccionada: null
    }

    const [state, dispatch] = useReducer(TareaReducer, initialState);

    const obtenerTareas = async proyecto => {  
        try {
            const resultado = await clienteAxios.get(`/api/tareas`, { params: {proyecto} }) 
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            
        }
    }

    const agregarTarea = async tarea =>{  
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);

            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error);
        }       
    }

    
    const actualizarTarea = async tarea => { 
        try { 
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error);
        }

    }


    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const eliminarTarea = async (id, proyecto) =>{

        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto }});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            
        }
    }
 
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    return (
        <TareaContext.Provider
            value={{ 
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea, 
                guardarTareaActual,
                actualizarTarea
            }}>
            {children}
        </TareaContext.Provider>
    )

}
