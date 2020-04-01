import React from 'react';
import AppBarWithNavi from '../components/layout/AppBarWithNavi';
import { Route, withRouter } from 'react-router-dom';
import BuildingTableContainer from '../containers/buildings/BuildingTableContainer';
import BuildingControlFormContainer from '../containers/buildings/BuildingControlFormContainers';

const MainPage = ({ match }) => {
	return (
		<AppBarWithNavi>
			<Route path={`${match.path}/buildings`} exact>
				<BuildingTableContainer />
			</Route>
			<Route path={`${match.path}/buildings/add`}>
				<BuildingControlFormContainer />
			</Route>
			<Route path={`${match.path}/customers`}>
				<h1>good</h1>
			</Route>
		</AppBarWithNavi>
	);
};

export default withRouter(MainPage);
