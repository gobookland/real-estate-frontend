import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
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

export default App;
