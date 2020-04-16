import React from 'react';
import AppBarWithNaviContainer from '../containers/layout/AppBarWithNaviContainer';
import { Route, withRouter } from 'react-router-dom';
import BuildingTableContainer from '../containers/buildings/BuildingTableContainer';
// import BuildingControlFormContainer from '../containers/buildings/BuildingControlFormContainers';
import BuildingFormContainer from '../containers/buildings/BuildingFormContainer';

const MainPage = ({ match }) => {
	return (
		<AppBarWithNaviContainer>
			<Route path={`${match.path}/buildings`} exact>
				<BuildingTableContainer />
			</Route>
			<Route path={`${match.path}/buildings/add`}>
				<BuildingFormContainer />
			</Route>
			<Route path={`${match.path}/customers`}>
				<h1>Building</h1>
			</Route>
			<Route path={`${match.path}/traffic`}>
				<h1>Building</h1>
			</Route>
		</AppBarWithNaviContainer>
	);
};

export default withRouter(MainPage);
