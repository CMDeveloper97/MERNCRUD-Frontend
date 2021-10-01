import React, { useContext, useEffect } from 'react'
import { Redirect, Route } from 'react-router';
import AuthContext from '../context/autenticacion/authContext';

export const RutaPrivada = ({component: Component, ...props}) => {
	const authContext = useContext(AuthContext);
	const {autenticado, cargando, usuarioAutenticado} = authContext;

	useEffect(() => {
		usuarioAutenticado();
		//eslint-disable-next-line
	}, [])

	return (
		<Route {...props} render={props => !autenticado && !cargando ? (
			<Redirect to="/" />
		) : (
			<Component {...props}/>
		) }/>
	)
}