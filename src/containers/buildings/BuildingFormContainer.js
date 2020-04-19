import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';

// import { SINGLE_FILE_UPLOAD } from '../../graphql/mutation/file';
import { SECTORS } from '../../graphql/query/sector';
import { ADD_SECTOR } from '../../graphql/mutation/sector';
import { ADD_LOCATION } from '../../graphql/mutation/location';
import { LOCATIONS } from '../../graphql/query/location';
import { ADD_BUILDING, MODIFY_BUILDING } from '../../graphql/mutation/building';
import { BUILDING } from '../../graphql/query/building';

import BuildingForm from '../../components/buildings/BuildingForm';

const initialState = {
	buildingInfo: {
		name: '',
		layer: 0,
		number: 0,
		saleArea: 0,
		realArea: 0,
		sector: '',
		sectorDetail: '',
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
	// * Graphql Mutation, Query manage
	const [
		modifyBuilding,
		{ data: modifiedBuilding, error: modifiedBuilding_error },
	] = useMutation(MODIFY_BUILDING);
	const [
		addBuilding,
		{ data: addedBuilding, error: addedBuilding_error },
	] = useMutation(ADD_BUILDING);

	const {
		data: locations,
		error: locations_error,
		loading: locations_loading,
		refetch: locations_refetch,
	} = useQuery(LOCATIONS);

	const [addLocation] = useMutation(ADD_LOCATION);

	// const [uploadSingleFile, { data: uploaded_file }] = useMutation(
	// 	SINGLE_FILE_UPLOAD,
	// );

	const [addSector, { data: addedSector }] = useMutation(ADD_SECTOR);

	const {
		data: sectors,
		error: sectors_error,
		loading: sectors_loading,
		refetch: sectors_refetch,
	} = useQuery(SECTORS, { variables: { type: 'basic' } });

	const [
		getSectorDetail,
		{
			data: sectorDetail,
			error: sectorDetail_error,
			refetch: sectorDetail_refetch,
			loading: sectorDetail_loading,
		},
	] = useLazyQuery(SECTORS);
	//

	// * State Manage
	const [formState, setFormState] = useState(initialState);
	const [checkState, setCheckState] = useState({
		tradeCheck: false,
		leaseCheck: false,
		rightsCheck: false,
	});

	const [isModify, setIsModify] = useState(false);

	const {
		params: { buildingId },
	} = match;
	// * Initialize with selected building
	const { data: building, loading: buildingLoading } = useQuery(BUILDING, {
		variables: { id: buildingId },
	});
	useEffect(() => {
		if (building) {
			setIsModify(true);

			const info = building.building;

			const newInitialState = {
				buildingInfo: {
					...info.buildingInfo,
					sector: info.buildingInfo.sectors.basic || 0,
					sectorDetail: info.buildingInfo.sectors.detail || 0,
					image: `http://localhost:4000/uploads/${info.buildingInfo.image}`,
					location: info.buildingInfo.location.name,
					locationUrl: `http://localhost:4000/uploads/${info.buildingInfo.location.image}`,
				},
				dealInfo: {
					...info.dealInfo,
				},
				officialsInfo: {
					...info.officialsInfo,
				},
			};

			if (info.buildingInfo.sectors.basic) {
				getSectorDetail({
					variables: {
						type: 'detail',
						parent: info.buildingInfo.sectors.basic,
					},
				});
			}
			delete newInitialState.buildingInfo.sectors;
			delete newInitialState.buildingInfo.__typename;
			delete newInitialState.dealInfo.__typename;
			delete newInitialState.dealInfo.trade.__typename;
			delete newInitialState.dealInfo.lease.__typename;
			delete newInitialState.officialsInfo.__typename;

			setFormState(newInitialState);
			if (info.dealInfo.trade.monthly) {
				setCheckState((checkState) => ({ ...checkState, tradeCheck: true }));
			}
			if (info.dealInfo.lease.monthly) {
				setCheckState((checkState) => ({ ...checkState, leaseCheck: true }));
			}
			if (info.dealInfo.rights) {
				setCheckState((checkState) => ({ ...checkState, rightsCheck: true }));
			}
		}
	}, [building, getSectorDetail]);

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
			sectors_refetch({
				variables: {
					type: 'basic',
				},
			});
		} else {
			// Adding detail sector
			await addSector({
				variables: {
					type: 'detail',
					name: addSectorState.detail,
					parent: addSectorState.parent,
				},
			});
			sectorDetail_refetch({
				variables: {
					type: 'detail',
					parent: formState.buildingInfo.sector,
				},
			});
		}
		setSectorDialog(false);
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
			name: copiedFormState.buildingInfo.location,
			image: 'No-Image.jpg',
		};
		if (isModify) {
			await modifyBuilding({
				variables: {
					id: buildingId,
					buildingInput: copiedFormState,
				},
			});
		} else {
			await addBuilding({
				variables: {
					buildingInput: copiedFormState,
				},
			});
		}
	};

	// * Manage Effects hook
	useEffect(() => {
		if (addedSector) {
		}
	}, [addedSector]);

	useEffect(() => {
		if (modifiedBuilding) {
			alert('수정이 완료됐습니다!');
			setFormState(initialState);
			history.push('/dashboard/buildings');
		}
		if (modifiedBuilding_error) {
			console.log(modifiedBuilding_error);
		}
		if (addedBuilding) {
			alert('등록이 완료됐습니다!');
			setFormState(initialState);
			history.push('/dashboard/buildings');
		}
		if (addedBuilding_error) {
			console.log(addedBuilding_error);
		}
	}, [
		addedBuilding,
		addedBuilding_error,
		modifiedBuilding,
		modifiedBuilding_error,
		history,
	]);

	if (sectors_error || sectorDetail_error || locations_error) {
		return 'error';
	}

	return (
		<BuildingForm
			loadings={{
				sectorDetail: sectorDetail_loading,
				sectors: sectors_loading,
				locations: locations_loading,
			}}
			buildingLoading={buildingLoading}
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
