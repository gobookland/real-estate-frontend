import React from 'react';
import AppBarWithNaviContainer from '../containers/layout/AppBarWithNaviContainer';
import { Route, withRouter } from 'react-router-dom';
import BuildingTableContainer from '../containers/buildings/BuildingTableContainer';
import TrafficContainer from '../containers/traffic/TrafficContainer';
import BuildingFormContainer from '../containers/buildings/BuildingFormContainer';
import SubDataContainer from '../containers/subData/SubDataContainer';

const MainPage = ({ match }) => {
	return (
		<AppBarWithNaviContainer>
			<Route path={`${match.path}/buildings`} exact>
				<BuildingTableContainer />
			</Route>
			<Route path={`${match.path}/buildings/add`}>
				<BuildingFormContainer />
			</Route>
			<Route path={`${match.path}/buildings/building/:buildingId`}>
				<BuildingFormContainer />
			</Route>
			<Route path={`${match.path}/customers`}>
				<h1>Building</h1>
			</Route>
			<Route path={`${match.path}/traffic/:buildingId`}>
				<TrafficContainer />
			</Route>
			<Route path={`${match.path}/subData`}>
				<SubDataContainer />
			</Route>
		</AppBarWithNaviContainer>
	);
};

export default withRouter(MainPage);
