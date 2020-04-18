import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Traffic from '../../components/traffic/Traffic';

import { BUILDING } from '../../graphql/query/building';
import { ADD_TRAFFIC } from '../../graphql/mutation/traffic';

const TrafficContainer = ({ history, match }) => {
	const { buildingId } = match.params; // get buildingId param

	// * Query and Mutation
	const {
		data: buildingData,
		error: buildingError,
		loading: buildingLoading,
		refetch: buildingRefetch,
	} = useQuery(BUILDING, { variables: { id: buildingId } });

	const [addTraffic] = useMutation(ADD_TRAFFIC);

	// * Manage state
	const [percentage, setPercentage] = useState(50);

	const handleTrafficData = (e, newValue) => {
		setPercentage(newValue);
	};

	const handleTrafficSubmit = async () => {
		await addTraffic({
			variables: {
				buildingId,
				percentage,
			},
		});

		buildingRefetch({ variables: { id: buildingId } });
	};

	if (buildingError) {
		return 'error';
	}

	return (
		<Traffic
			loadings={[buildingLoading]}
			buildingData={buildingData}
			handleTrafficData={handleTrafficData}
			handleTrafficSubmit={handleTrafficSubmit}
		/>
	);
};

export default withRouter(TrafficContainer);
