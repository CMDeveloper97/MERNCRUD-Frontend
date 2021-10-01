import { ListadoProyectos } from "../proyectos/ListadoProyectos";
import { NuevoProyecto } from "../proyectos/NuevoProyecto";


export const Sidebar = () => {

    return (
        <aside>
            <h1>MERN <span>Tasks</span></h1>
            <NuevoProyecto />

            <div className="proyectos">
                <h2>Tus proyectos</h2>
                <ListadoProyectos/>
            </div>
        </aside>
    )
}
