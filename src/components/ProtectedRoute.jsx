import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ path, render }) {
	let token = localStorage.getItem('token');

	return token ? (
		<Route path={path} render={render} />
	) : (
		<Redirect to='/login' />
	);
}
