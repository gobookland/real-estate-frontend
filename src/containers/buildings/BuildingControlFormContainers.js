import React, { useState } from 'react';
import { SECTORS } from '../../graphql/query/sector';
import { ADD_SECTOR } from '../../graphql/mutation/sector';
import { useQuery, useMutation } from '@apollo/react-hooks';

import BuildingControlForm from '../../components/buildings/BuildingControlForm';

const BuildingControlFormContainer = () => {
	const initialState = {
		buildingInfo: {
			image: null,
			name: '',
			layer: '',
			number: '',
			saleArea: '',
			realArea: '',
			sectors: {
				basic: '',
				detail: '',
			},
			location: null,
		},
		dealInfo: {
			trade: {
				price: '',
				monthly: '',
				deposit: '',
			},
			lease: {
				price: '',
				monthly: '',
				deposit: '',
			},
			rights: '',
		},
		partyInfo: {
			owner: '',
			ownerPhone: '',
			lessee: '',
			lesseePhone: '',
		},
	};
	const [field, setField] = useState(initialState);
	const [sectorType, setSectorType] = useState('basic');
	const [sectorName, setSectorName] = useState('');

	const {
		data: sectorData,
		loading: queryLoading,
		error: queryError,
		refetch: sectorRefetch,
	} = useQuery(SECTORS);
	const [
		addSector,
		{ loading: mutationLoading, error: mutationError },
	] = useMutation(ADD_SECTOR);

	if (queryLoading || mutationLoading) {
		return 'loading';
	}

	if (queryError || mutationError) {
		return 'error';
	}
	const handleTyping = fieldName => e => {
		const { name, value } = e.target;
		if (fieldName === 'buildingInfo.sectors') {
			setField({
				...field,
				buildingInfo: {
					...field.buildingInfo,
					sectors: {
						...field.buildingInfo.sectors,
						[name]: value,
					},
				},
			});
		} else if (fieldName === 'dealInfo.trade') {
			setField({
				...field,
				dealInfo: {
					...field.dealInfo,
					trade: {
						...field.dealInfo.trade,
						[name]: value,
					},
				},
			});
		} else if (fieldName === 'dealInfo.lease') {
			setField({
				...field,
				dealInfo: {
					...field.dealInfo,
					lease: {
						...field.dealInfo.lease,
						[name]: value,
					},
				},
			});
		} else {
			setField({
				...field,
				[fieldName]: {
					...field[fieldName],
					[name]: value,
				},
			});
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log(sectorData);
	};

	const handleSectorType = e => {
		const { value } = e.target;
		setSectorType(value);
	};

	const handleSectorName = e => {
		const { value } = e.target;
		setSectorName(value);
	};

	const handleSectorAdd = dialogController => e => {
		e.preventDefault();
		addSector({
			variables: {
				sectorInput: {
					[sectorType]: sectorName,
				},
			},
		});
		sectorRefetch();
		dialogController(false);
	};

	const handleLocationAdd = (file, name) => e => {
		// e.preventDefault();
		console.log('?', file, name);
	};

	return (
		<BuildingControlForm
			sectors={sectorData.sectors}
			field={field}
			sectorName={sectorName}
			sectorType={sectorType}
			handleSubmit={handleSubmit}
			handleTyping={handleTyping}
			handleSectorType={handleSectorType}
			handleSectorName={handleSectorName}
			handleSectorAdd={handleSectorAdd}
			handleLocationAdd={handleLocationAdd}
		/>
	);
};

export default BuildingControlFormContainer;
