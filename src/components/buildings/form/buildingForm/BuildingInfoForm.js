import React, { useState } from 'react';
import {
	useMediaQuery,
	Button,
	Grid,
	TextField,
	InputAdornment,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	Tabs,
	Tab,
	Typography,
	CircularProgress,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CameraAlt } from '@material-ui/icons';
// import clsx from 'clsx';

const useBuildingFormStyle = makeStyles((theme) => ({
	columnBox: {
		display: 'flex',
		flexDirection: 'column',
	},
	imageBox: {
		'& .image': {
			borderRadius: '5px',
			width: '100%',
			height: '200px',
			objectFit: 'cover',

			'&.box': {
				background: '#ddd',
			},
		},
	},
	fileInput: {
		display: 'none',
	},
	noLabel: {
		marginTop: theme.spacing(2),
	},
	dialogContent: {
		padding: theme.spacing(5),
	},
	imageBoxFixedWithWidth: {
		'& .image': { height: 'auto', width: '200px' },
	},
	locationMenuItem: {
		textAlign: 'center',
		justifyContent: 'center',
		'& .locationImageBox': {
			display: 'block',
		},
	},
	locationMenuItemSelected: {
		display: 'none',
	},
}));

const BuildingInfoForm = ({
	handleFormState,
	formState,
	handleImageState,
	sectorInfo,
	sectorDetail,
	handleAddSectorState,
	addSectorState,
	handleAddSectorSubmit,
	sectorDialogHook,
	locationDialogHook,
	setLocationName,
	handleAddLocation,
	locationInfo,
	loadings,
}) => {
	const [sectorDialog, setSectorDialog] = sectorDialogHook;
	const [locationDialog, setLocationDialog] = locationDialogHook;

	const [sectors, sector_loading] = sectorInfo;
	const [sectorTab, setSectorTab] = useState(0);

	const [locations, locations_loading] = locationInfo;

	const handleSectorTab = (e, newValue) => {
		setSectorTab(newValue);
	};

	const { buildingInfo } = formState;

	const classes = useBuildingFormStyle();
	const theme = useTheme();
	const breakPoint = useMediaQuery(theme.breakpoints.down('xs'));

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={4}>
				<div className={classes.columnBox}>
					<div className={classes.imageBox}>
						{buildingInfo.image ? (
							<img src={buildingInfo.image} alt="nothing" className="image" />
						) : (
							<div className="image box"></div>
						)}
					</div>
					<input
						className={classes.fileInput}
						type="file"
						id="storeImageInput"
						name="image"
						onChange={handleImageState('buildingInfo')}
					/>
					<label htmlFor="storeImageInput">
						<Button
							variant="contained"
							color="primary"
							component="span"
							fullWidth
						>
							<CameraAlt />
						</Button>
					</label>
				</div>
			</Grid>
			<Grid item xs={12} md={8}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={12}>
						<TextField
							label="건물명"
							name="name"
							value={buildingInfo.name}
							fullWidth
							onChange={handleFormState('buildingInfo')}
						/>
					</Grid>
					{breakPoint && <Grid item xs={12} md={12}></Grid>}
					<Grid item xs={12} md={6}>
						<TextField
							label="층수"
							type="number"
							name="layer"
							value={parseInt(buildingInfo.layer)}
							fullWidth
							onChange={handleFormState('buildingInfo')}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							label="호수"
							type="number"
							name="number"
							value={parseInt(buildingInfo.number)}
							fullWidth
							onChange={handleFormState('buildingInfo')}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					fullWidth
					label="분양 평수"
					type="number"
					name="saleArea"
					value={parseInt(buildingInfo.saleArea)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">평</InputAdornment>
						),
					}}
					onChange={handleFormState('buildingInfo')}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					fullWidth
					label="실제 평수"
					type="number"
					name="realArea"
					value={parseInt(buildingInfo.realArea)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">평</InputAdornment>
						),
					}}
					onChange={handleFormState('buildingInfo')}
				/>
			</Grid>
			{breakPoint && <Grid item xs={12} md={12}></Grid>}
			<Grid item xs={12} md={4}>
				<FormControl fullWidth>
					<InputLabel htmlFor="sector">
						{loadings.sectors ? (
							<CircularProgress style={{ width: '20px', height: '20px' }} />
						) : (
							'업종'
						)}
					</InputLabel>
					<Select
						id="sector"
						value={buildingInfo.sector}
						name="sector"
						onChange={handleFormState('buildingInfo')}
					>
						<MenuItem value={''}>공실</MenuItem>
						{!sector_loading &&
							sectors &&
							sectors.sectors.map((sector) => (
								<MenuItem key={sector.name} value={sector.name}>
									{sector.name}
								</MenuItem>
							))}
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12} md={4}>
				<FormControl fullWidth>
					<InputLabel htmlFor="sectorDetail">
						{loadings.sectorDetail ? (
							<CircularProgress style={{ width: '20px', height: '20px' }} />
						) : (
							'상세 업종'
						)}
					</InputLabel>
					<Select
						id="sectorDetail"
						value={buildingInfo.sectorDetail}
						name="sectorDetail"
						disabled={
							!sectorDetail || (sectorDetail && sectorDetail.length === 0)
						}
						onChange={handleFormState('buildingInfo')}
					>
						<MenuItem value={''}>공실</MenuItem>
						{sectorDetail &&
							sectorDetail.map((sector) => (
								<MenuItem key={sector.name} value={sector.name}>
									{sector.name}
								</MenuItem>
							))}
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12} md={4}>
				<Button
					fullWidth
					variant="outlined"
					color="primary"
					className={classes.noLabel}
					onClick={(e) => setSectorDialog(!sectorDialog)}
				>
					업종 추가
				</Button>
				<Dialog
					fullWidth
					maxWidth="xs"
					open={sectorDialog}
					onClose={(e) => setSectorDialog(false)}
				>
					<div>
						<Tabs
							variant="fullWidth"
							value={sectorTab}
							textColor="primary"
							indicatorColor="primary"
							onChange={handleSectorTab}
						>
							<Tab label="업종 추가" />
							<Tab label="상세업종 추가" />
						</Tabs>
					</div>
					<DialogContent className="dialogContent">
						{sectorTab === 0 && (
							<Grid container spacing={3}>
								<Grid item xs={12} md={12}>
									<TextField
										label="업종"
										fullWidth
										onChange={handleAddSectorState}
										name="basic"
									/>
								</Grid>
							</Grid>
						)}
						{sectorTab === 1 && (
							<Grid container spacing={3}>
								<Grid item xs={12} md={12}>
									<FormControl fullWidth>
										<InputLabel htmlFor="parent">업종</InputLabel>
										<Select
											id="parent"
											value={addSectorState.parent}
											name="parent"
											onChange={handleAddSectorState}
										>
											{!sector_loading &&
												sectors &&
												sectors.sectors.map((sector) => (
													<MenuItem key={sector.name} value={sector.name}>
														{sector.name}
													</MenuItem>
												))}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} md={12}>
									<TextField
										fullWidth
										label="상세 업종"
										onChange={handleAddSectorState}
										name="detail"
									/>
								</Grid>
							</Grid>
						)}
					</DialogContent>
					<DialogActions>
						<Button color="secondary" onClick={(e) => setSectorDialog(false)}>
							취소
						</Button>
						<Button color="primary" onClick={handleAddSectorSubmit(sectorTab)}>
							등록
						</Button>
					</DialogActions>
				</Dialog>
			</Grid>
			<Grid item xs={12} md={6}>
				<FormControl fullWidth>
					<InputLabel htmlFor="location">
						{loadings.locations ? (
							<CircularProgress style={{ width: '20px', height: '20px' }} />
						) : (
							'위치'
						)}
					</InputLabel>
					<Select
						id="location"
						value={buildingInfo.location}
						name="location"
						onChange={handleFormState('buildingInfo')}
					>
						{!locations_loading &&
							locations &&
							locations.locations
								.filter((location) => location.name.trim() !== '')
								.map((location) => (
									<MenuItem
										key={location.name}
										value={location.name}
										className={classes.locationMenuItem}
									>
										<div className={classes.columnBox}>
											{/* <div
											className={clsx(
												classes.imageBoxFixedWithWidth,
												location.name === buildingInfo.location &&
													classes.locationMenuItemSelected,
												'locationImageBox',
											)}
										>
											<img
												src={`https://blueberry-pudding-72910.herokuapp.com/uploads/${location.image}`}
												alt="nothing"
												className="image"
											/>
										</div> */}
											<Typography>{location.name}</Typography>
										</div>
									</MenuItem>
								))}
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12} md={6}>
				<Button
					fullWidth
					variant="outlined"
					color="primary"
					className={classes.noLabel}
					onClick={(e) => setLocationDialog(true)}
				>
					위치 추가
				</Button>
				<Dialog
					fullWidth
					maxWidth="xs"
					open={locationDialog}
					onClose={(e) => setLocationDialog(false)}
				>
					<DialogTitle>위치 추가</DialogTitle>
					<DialogContent>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<div className={classes.imageBox}>
									{buildingInfo.locationUrl ? (
										<img
											src={buildingInfo.locationUrl}
											alt="nothing"
											className="image"
										/>
									) : (
										<div className="image box"></div>
									)}
								</div>
							</Grid>
							<Grid item xs={12}>
								<input
									className={classes.fileInput}
									type="file"
									id="locationImageInput"
									name="locationUrl"
									onChange={handleImageState('buildingInfo')}
								/>
								<label htmlFor="locationImageInput">
									<Button
										variant="contained"
										color="primary"
										component="span"
										fullWidth
									>
										<CameraAlt />
									</Button>
								</label>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="위치 이름"
									onChange={(e) => setLocationName(e.target.value)}
									fullWidth
								/>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button color="secondary" onClick={(e) => setLocationDialog(false)}>
							취소
						</Button>
						<Button color="primary" onClick={handleAddLocation}>
							등록
						</Button>
					</DialogActions>
				</Dialog>
			</Grid>
		</Grid>
	);
};

export default BuildingInfoForm;
