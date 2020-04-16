import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App({ history }) {
	if (
		history.location.pathname === '/' ||
		history.location.pathname === '/dashboard'
	) {
		history.push('/dashboard/buildings');
	}

	return (
		<>
			<Switch>
				<Route path={`/dashboard`} component={MainPage} />
				<Route path={'/auth/login'} component={LoginPage} />
				<Route path={'/auth/register'} component={RegisterPage} />
			</Switch>
		</>
	);
}

export default withRouter(App);
