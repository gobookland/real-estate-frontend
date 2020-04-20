import React, { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import SubData from '../../components/subData/SubData';

import { SECTORS } from '../../graphql/query/sector';
import { LOCATIONS } from '../../graphql/query/location';

import { ADD_SECTOR, DELETE_SECTOR } from '../../graphql/mutation/sector';
import { ADD_LOCATION, DELETE_LOCATION } from '../../graphql/mutation/location';

const SubDataContainer = () => {
	// * Queries and Mutations
	const {
		data: sectors,
		error: sectors_error,
		loading: sectors_loading,
		refetch: sectors_refetch,
	} = useQuery(SECTORS);

	const {
		data: locations,
		error: locations_error,
		loading: locations_loading,
		refetch: locations_refetch,
	} = useQuery(LOCATIONS);

	const [addSector] = useMutation(ADD_SECTOR);
	const [deleteSector] = useMutation(DELETE_SECTOR);

	const [addLocation] = useMutation(ADD_LOCATION);
	const [deleteLocation] = useMutation(DELETE_LOCATION);

	// * State
	const [tabValue, setTabValue] = useState(0);
	const [formValue, setFormValue] = useState({
		sectors: '',
		sectorsDetail: '',
		parent: '',
	});
	const [locationName, setLocationName] = useState('');

	const handleTabChange = useCallback(
		(e, newValue) => {
			setTabValue(newValue);
		},
		[setTabValue],
	);

	const handleFormValueChange = useCallback(
		(e) => {
			const { name, value } = e.target;
			setFormValue((formValue) => ({ ...formValue, [name]: value }));
		},
		[setFormValue],
	);

	const handleSectorSubmit = useCallback(
		(type) => async (e) => {
			if (type === 'basic')
				await addSector({
					variables: {
						type: 'basic',
						name: formValue.sectors,
					},
				});

			if (type === 'detail')
				await addSector({
					variables: {
						type: 'detail',
						parent: formValue.parent,
						name: formValue.sectorsDetail,
					},
				});

			sectors_refetch();
			setFormValue({
				sectors: '',
				sectorsDetail: '',
				parent: '',
			});
		},
		[addSector, sectors_refetch, formValue],
	);

	const handleLocationSubmit = useCallback(async () => {
		await addLocation({
			variables: {
				locationInput: {
					name: locationName,
					image: 'No-Image.jpg',
				},
			},
		});

		locations_refetch();
	}, [addLocation, locationName, locations_refetch]);

	const handleDelete = useCallback(
		async (deleting) => {
			if (tabValue === 0) {
				await deleteSector({
					variables: {
						sectorInput: deleting,
					},
				});

				sectors_refetch();
			}
			if (tabValue === 1) {
				await deleteLocation({
					variables: {
						names: deleting,
					},
				});

				locations_refetch();
			}
		},
		[
			deleteSector,
			deleteLocation,
			locations_refetch,
			sectors_refetch,
			tabValue,
		],
	);

	// * Effects
	useEffect(() => {}, [sectors, locations]);

	if (sectors_error || locations_error) {
		return 'error';
	}

	// * Immutable
	const data = {
		sectors,
		locations,
	};

	const loading = {
		sectors: sectors_loading,
		locations: locations_loading,
	};

	const state = { tabValue, formValue, locationName };
	const setState = { setLocationName };

	const handler = {
		handleTabChange,
		handleFormValueChange,
		handleSectorSubmit,
		handleDelete,
		handleLocationSubmit,
	};

	return (
		<SubData
			loading={loading}
			data={data}
			state={state}
			setState={setState}
			handler={handler}
		/>
	);
};

export default SubDataContainer;
