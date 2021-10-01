import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { NuevaCuenta } from "./components/auth/NuevaCuenta";
import { Proyectos } from "./components/proyectos/Proyectos";
import { tokenAuth } from "./config/tokenAuth";
import { AlertaState } from "./context/alerta/alertaState";
import { AuthState } from "./context/autenticacion/authState";
import { ProyectoState } from "./context/proyectos/ProyectoState";
import { TareaState } from "./context/tareas/TareaState";
import { RutaPrivada } from "./routes/RutaPrivada";


const token = localStorage.getItem('token');
if(token) tokenAuth(token); 

function App() {  

  return (
    <AuthState>
      <AlertaState>
        <ProyectoState>
          <TareaState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </TareaState>
        </ProyectoState>
      </AlertaState>
    </AuthState>
  );
}

export default App;
