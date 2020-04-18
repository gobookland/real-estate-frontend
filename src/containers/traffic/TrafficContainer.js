import React from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Traffic from '../../components/traffic/Traffic';

import { BUILDING } from '../../graphql/query/building';

const TrafficContainer = ({ history, match }) => {
	const { buildingId } = match.params; // get buildingId param

	// * Query and Mutation
	const {
		data: buildingData,
		error: buildingError,
		loading: buildingLoading,
	} = useQuery(BUILDING, { variables: { id: buildingId } });

	if (buildingError) {
		return 'error';
	}

	return <Traffic loadings={[buildingLoading]} buildingData={buildingData} />;
};

export default withRouter(TrafficContainer);
