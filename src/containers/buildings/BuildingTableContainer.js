import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { BUILDINGS } from '../../graphql/query/building';
import BuildingTable from '../../components/buildings/BuildingTable';

const BuildingTableContainer = () => {
	const { data, loading, error } = useQuery(BUILDINGS);
	// const [order, setOrder] = useState(-1);
	// const [orderby, setOrderby] = useState('creationDate');
	// const [orderType, setOrderType] = useState('all');

	if (error) {
		return <h1>Error</h1>;
	}

	if (loading) {
		return <h1>Loading</h1>;
	}

	// const handleOrder = field => {
	// 	if (field === 'creationDate') {
	// 	}
	// };

	if (data) {
		return <BuildingTable data={data.buildings} />;
	}
};

export default BuildingTableContainer;
