import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';

import { SINGLE_FILE_UPLOAD } from '../../graphql/mutation/file';
import { SECTORS } from '../../graphql/query/sector';
import { ADD_SECTOR } from '../../graphql/mutation/sector';
import { ADD_LOCATION } from '../../graphql/mutation/location';
import { LOCATIONS } from '../../graphql/query/location';
import { ADD_BUILDING } from '../../graphql/mutation/building';

import BuildingForm from '../../components/buildings/BuildingForm';

const initialState = {
	buildingInfo: {
		name: '',
		layer: 0,
		number: 0,
		saleArea: 0,
		realArea: 0,
		sector: 0,
		sectorDetail: 0,
		image: '',
		location: '',
		locationUrl: '',
	},
	dealInfo: {
		trade: {
			price: 0,
			deposit: 0,
			monthly: 0,
		},
		lease: {
			price: 0,
			deposit: 0,
			monthly: 0,
		},
		rights: 0,
	},
	officialsInfo: {
		owner: '',
		ownerPhone: '',
		lessee: '',
		lesseePhone: '',
	},
};

const BuildingFormContainer = ({ history, match }) => {
	// * State Manage
	const [formState, setFormState] = useState(initialState);
	const [checkState, setCheckState] = useState({
		tradeCheck: false,
		leaseCheck: false,
		rightsCheck: false,
	});

	const [imageState, setImageState] = useState({
		image: null,
		locationUrl: null,
	});

	const [locationName, setLocationName] = useState('');

	const [addSectorState, setAddSectorState] = useState({
		basic: '',
		parent: '',
		detail: '',
	});

	const [sectorDialog, setSectorDialog] = useState(false);
	const [locationDialog, setLocationDialog] = useState(false);

	//
	// * Graphql Mutation, Query manage
	const [addBuilding] = useMutation(ADD_BUILDING);

	const {
		data: locations,
		error: locations_error,
		loading: locations_loading,
		refetch: locations_refetch,
	} = useQuery(LOCATIONS);

	const [addLocation] = useMutation(ADD_LOCATION);

	const [uploadSingleFile, { data: uploaded_file }] = useMutation(
		SINGLE_FILE_UPLOAD,
	);

	const [addSector, { data: addedSector }] = useMutation(ADD_SECTOR);

	const {
		data: sectors,
		error: sectors_error,
		loading: sectors_loading,
		refetch: sectors_refetch,
	} = useQuery(SECTORS, { variables: { type: 'basic' } });

	const [
		getSectorDetail,
		{ data: sectorDetail, error: sectorDetail_error },
	] = useLazyQuery(SECTORS);
	//

	// change state with Form Element's onChange
	const handleFormState = (form) => (e) => {
		const { name, value, type } = e.target;
		setFormState({
			...formState,
			[form]: {
				...formState[form],
				[name]: type === 'number' ? parseInt(value) : value,
			},
		});
		if (name === 'sector') {
			if (value === 0) {
				getSectorDetail({ variables: { type: 'nope' } });
				setFormState({
					...formState,
					[form]: {
						...formState[form],
						sectorDetail: 0,
						sector: 0,
					},
				});
			} else {
				getSectorDetail({ variables: { type: 'detail', parent: value } });
			}
		}
	};

	// * Handle add Sector mutation
	const handleAddSectorState = (e) => {
		const { name, value } = e.target;
		setAddSectorState({ ...addSectorState, [name]: value });
	};

	const handleAddSectorSubmit = (tabIndex) => async (e) => {
		if (tabIndex === 0) {
			// Adding basic sector
			await addSector({
				variables: {
					type: 'basic',
					name: addSectorState.basic,
				},
			});
		} else {
			// Adding detail sector
			addSector({
				variables: {
					type: 'detail',
					name: addSectorState.detail,
					parent: addSectorState.parent,
				},
			});
		}
		setSectorDialog(false);
		sectors_refetch({
			variables: {
				type: 'basic',
			},
		});
	};

	//
	const handleDealInfoFormState = (form) => (e) => {
		const { name, value, type } = e.target;
		setFormState({
			...formState,
			dealInfo: {
				...formState.dealInfo,
				[form]: {
					...formState.dealInfo[form],
					[name]: type === 'number' ? parseInt(value) : value,
				},
			},
		});
	};

	const handleCheckState = (e) => {
		const { name } = e.target;
		const init = !checkState[name];
		setCheckState({ ...checkState, [name]: !checkState[name] });

		if (!init) {
			if (name === 'tradeCheck') {
				setFormState({
					...formState,
					dealInfo: {
						...formState.dealInfo,
						trade: {
							...initialState.dealInfo.trade,
						},
					},
				});
			}
			if (name === 'leaseCheck') {
				setFormState({
					...formState,
					dealInfo: {
						...formState.dealInfo,
						lease: {
							...initialState.dealInfo.lease,
						},
					},
				});
			}
			if (name === 'rightsCheck') {
				setFormState({
					...formState,
					dealInfo: {
						...formState.dealInfo,
						rights: null,
					},
				});
			}
		}
	};

	const handleImageState = (form) => (e) => {
		const { files, name } = e.target;
		setImageState({ ...imageState, [name]: files[0] });
		setFormState({
			...formState,
			[form]: {
				...formState[form],
				[name]: URL.createObjectURL(files[0]),
			},
		});
	};

	const handleAddLocation = async (e) => {
		// const result = await uploadSingleFile({
		// 	variables: { file: imageState.locationUrl },
		// });

		// const imageName = `uploads/${result.data.singleFileUpload.filename}`;

		await addLocation({
			variables: {
				locationInput: {
					image: 'No-Image.jpg',
					name: locationName,
				},
			},
		});
		locations_refetch();
		setLocationDialog(false);
	};

	const handleSubmit = async (e) => {
		// const result = await uploadSingleFile({
		// 	variables: {
		// 		file: imageState.image,
		// 	},
		// });

		// const imageName = `uploads/${result.data.singleFileUpload.filename}`;
		// setFormState({
		// 	...formState,
		// 	buildingInfo: { ...formState.buildingInfo, image: imageName },
		// });
		const copiedFormState = { ...formState };
		delete copiedFormState.buildingInfo.locationUrl;

		copiedFormState.buildingInfo.image = 'No-Image.jpg';
		copiedFormState.buildingInfo.location = {
			name: 'No',
			image: 'No-Image.jpg',
		};

		console.log(copiedFormState);

		await addBuilding({
			variables: {
				buildingInput: copiedFormState,
			},
		});

		setFormState(initialState);
		history.push('/dashboard/buildings');
	};

	// * Manage Effects hook
	useEffect(() => {
		if (addedSector) {
			console.log('good');
		}
	}, [addedSector]);

	if (sectors_error || sectorDetail_error || locations_error) {
		return 'error';
	}

	return (
		<BuildingForm
			sectorInfo={[sectors, sectors_loading]}
			locationInfo={[locations, locations_loading]}
			handleFormState={handleFormState}
			handleDealInfoFormState={handleDealInfoFormState}
			handleCheckState={handleCheckState}
			handleAddSectorState={handleAddSectorState}
			checkState={checkState}
			formState={formState}
			handleImageState={handleImageState}
			sectorDetail={sectorDetail && sectorDetail.sectors}
			addSectorState={addSectorState}
			handleAddSectorSubmit={handleAddSectorSubmit}
			sectorDialogHook={[sectorDialog, setSectorDialog]}
			locationDialogHook={[locationDialog, setLocationDialog]}
			setLocationName={setLocationName}
			handleAddLocation={handleAddLocation}
			handleSubmit={handleSubmit}
		/>
	);
};

export default withRouter(BuildingFormContainer);
