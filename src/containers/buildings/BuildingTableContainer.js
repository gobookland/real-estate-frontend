import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { BUILDINGS } from '../../graphql/query/building';
import BuildingTable from '../../components/buildings/BuildingTable';
import { REMOVE_BUILDING } from '../../graphql/mutation/building';

const BuildingTableContainer = () => {
	// * Querys and Mutation
	const {
		data: buildings,
		loading: buildings_loading,
		error: buildings_error,
		refetch: buildings_refetch,
	} = useQuery(BUILDINGS);

	const [removeBuilding] = useMutation(REMOVE_BUILDING);
	//

	const handleRemove = async (ids) => {
		await removeBuilding({
			variables: {
				ids,
			},
		});

		buildings_refetch();
	};

	useEffect(() => {}, [buildings]);

	if (buildings_error) {
		return <h1>Error</h1>;
	}

	if (buildings_loading) {
		return <BuildingTable loading />;
	}

	return (
		<BuildingTable data={buildings.buildings} handleRemove={handleRemove} />
	);
};

export default BuildingTableContainer;
