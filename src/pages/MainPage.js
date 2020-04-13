import React from 'react';
import AppBarWithNaviContainer from '../containers/layout/AppBarWithNaviContainer';
import { Route, withRouter } from 'react-router-dom';
import BuildingTableContainer from '../containers/buildings/BuildingTableContainer';
import BuildingControlFormContainer from '../containers/buildings/BuildingControlFormContainers';

const MainPage = ({ match }) => {
	return (
		<AppBarWithNaviContainer>
			<Route path={[`${match.path}/buildings`, `${match.path}`]} exact>
				<BuildingTableContainer />
			</Route>
			<Route path={`${match.path}/buildings/add`}>
				<BuildingControlFormContainer />
			</Route>
			<Route path={`${match.path}/customers`}>
				<h1>good</h1>
			</Route>
		</AppBarWithNaviContainer>
	);
};

export default withRouter(MainPage);
