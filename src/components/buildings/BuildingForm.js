import React, { useState } from 'react';
import {
	Container,
	Stepper,
	Step,
	StepLabel,
	StepContent,
	useMediaQuery,
	Button,
	Paper,
	Typography,
	Grid,
	TextField,
	InputAdornment,
	FormGroup,
	FormControlLabel,
	Checkbox,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import BuildingInfoForm from './BuildingInfoForm';

const DealInfoForm = ({
	handleFormState,
	formState,
	handleDealInfoFormState,
	checkState,
	handleCheckState,
}) => {
	const {
		dealInfo,
		buildingInfo: { saleArea },
	} = formState;

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={12}>
				<FormGroup row>
					<FormControlLabel
						control={
							<Checkbox
								color="primary"
								onChange={handleCheckState}
								checked={checkState.tradeCheck}
								name="tradeCheck"
							/>
						}
						label="매매"
					/>
					<FormControlLabel
						control={
							<Checkbox
								color="primary"
								onChange={handleCheckState}
								checked={checkState.leaseCheck}
								name="leaseCheck"
							/>
						}
						label="임대"
					/>
				</FormGroup>
			</Grid>
			{checkState.tradeCheck && (
				<>
					<Grid item xs={12} md={12}>
						<Typography varaint="h5">매매</Typography>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							type="number"
							label="평당 가격"
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">원</InputAdornment>
								),
							}}
							onChange={handleDealInfoFormState('trade')}
							name="price"
							value={parseInt(dealInfo.trade.price)}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							disabled
							type="number"
							label="총 가격"
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">원</InputAdornment>
								),
							}}
							value={parseInt(saleArea) * parseInt(dealInfo.trade.price)}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							type="number"
							label="월세"
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">원</InputAdornment>
								),
							}}
							onChange={handleDealInfoFormState('trade')}
							name="monthly"
							value={parseInt(dealInfo.trade.monthly)}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							type="number"
							label="보증금"
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">원</InputAdornment>
								),
							}}
							onChange={handleDealInfoFormState('trade')}
							name="deposit"
							value={parseInt(dealInfo.trade.deposit)}
						/>
					</Grid>
					<Grid item xs={12} md={12}></Grid>
					<Grid item xs={12} md={12}></Grid>
				</>
			)}
			{checkState.leaseCheck && (
				<>
					<Grid item xs={12} md={12}>
						<Typography varaint="h5">임대</Typography>
					</Grid>
					<Grid item xs={12} md={12}>
						<TextField
							type="number"
							label="평당 가격"
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">원</InputAdornment>
								),
							}}
							onChange={handleDealInfoFormState('lease')}
							name="price"
							value={parseInt(dealInfo.lease.price)}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							type="number"
							label="월세"
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">원</InputAdornment>
								),
							}}
							onChange={handleDealInfoFormState('lease')}
							name="monthly"
							value={parseInt(dealInfo.lease.monthly)}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							type="number"
							label="보증금"
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">원</InputAdornment>
								),
							}}
							onChange={handleDealInfoFormState('lease')}
							name="deposit"
							value={parseInt(dealInfo.lease.deposit)}
						/>
					</Grid>
					<Grid item xs={12} md={12}></Grid>
					<Grid item xs={12} md={12}></Grid>
				</>
			)}
			<Grid item xs={12} md={12}>
				<FormControlLabel
					control={
						<Checkbox
							color="primary"
							onChange={handleCheckState}
							checked={checkState.rightsCheck}
							name="rightsCheck"
						/>
					}
					label="권리금"
				/>
			</Grid>
			{checkState.rightsCheck && (
				<>
					<Grid item xs={12} md={12}>
						<TextField
							type="number"
							label="권리금"
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">원</InputAdornment>
								),
							}}
							onChange={handleFormState('dealInfo')}
							name="rights"
							value={parseInt(dealInfo.rights)}
						/>
					</Grid>
				</>
			)}
		</Grid>
	);
};

const OfficialsInfoForm = ({ handleFormState, formState }) => {
	const theme = useTheme();
	const breakPoint = useMediaQuery(theme.breakpoints.down('xs'));

	const { officialsInfo } = formState;

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={6}>
				<TextField
					label="주인 이름"
					value={officialsInfo.owner}
					fullWidth
					onChange={handleFormState('officialsInfo')}
					name="owner"
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label="주인 연락처"
					value={officialsInfo.ownerPhone}
					fullWidth
					helperText="-를 제외하고 입력해주세요"
					onChange={handleFormState('officialsInfo')}
					name="ownerPhone"
				/>
			</Grid>
			{breakPoint && <Grid item xs={12} md={12}></Grid>}
			<Grid item xs={12} md={6}>
				<TextField
					label="임차인 이름"
					value={officialsInfo.lessee}
					fullWidth
					onChange={handleFormState('officialsInfo')}
					name="lessee"
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label="임차인 연락처"
					value={officialsInfo.lesseePhone}
					fullWidth
					helperText="-를 제외하고 입력해주세요"
					onChange={handleFormState('officialsInfo')}
					name="lesseePhone"
				/>
			</Grid>
		</Grid>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	container: {
		padding: theme.spacing(2),
	},
	button: {
		marginTop: theme.spacing(2),
		marginRight: theme.spacing(1),
	},
	actionsContainer: {
		marginBottom: theme.spacing(2),
	},
	resetContainer: {
		padding: theme.spacing(3),
	},
}));

const BuildingForm = ({
	handleFormState,
	handleDealInfoFormState,
	handleCheckState,
	checkState,
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
	handleSubmit,
}) => {
	const [activeStep, setActiveStep] = useState(0);
	const classes = useStyles();

	const theme = useTheme();
	const breakPoint = useMediaQuery(theme.breakpoints.down('xs'));

	const handleBack = () => {
		setActiveStep((prev) => prev - 1);
	};

	const handleNext = () => {
		setActiveStep((prev) => prev + 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<div className={classes.root}>
			<Container
				maxWidth={breakPoint ? 'xs' : 'md'}
				className={classes.container}
			>
				<Stepper activeStep={activeStep} orientation="vertical">
					<Step>
						<StepLabel>건물 정보</StepLabel>
						<StepContent>
							<BuildingInfoForm
								handleImageState={handleImageState}
								handleFormState={handleFormState}
								handleAddSectorState={handleAddSectorState}
								formState={formState}
								sectorInfo={sectorInfo}
								sectorDetail={sectorDetail}
								addSectorState={addSectorState}
								handleAddSectorSubmit={handleAddSectorSubmit}
								sectorDialogHook={sectorDialogHook}
								locationDialogHook={locationDialogHook}
								setLocationName={setLocationName}
								handleAddLocation={handleAddLocation}
								locationInfo={locationInfo}
							/>
							<div className={classes.actionsContainer}>
								<div>
									<Button disabled className={classes.button}>
										이전
									</Button>
									<Button
										variant="contained"
										color="primary"
										onClick={handleNext}
										className={classes.button}
									>
										다음
									</Button>
								</div>
							</div>
						</StepContent>
					</Step>
					<Step>
						<StepLabel>거래 정보</StepLabel>
						<StepContent>
							<DealInfoForm
								handleFormState={handleFormState}
								formState={formState}
								handleDealInfoFormState={handleDealInfoFormState}
								checkState={checkState}
								handleCheckState={handleCheckState}
							/>
							<div className={classes.actionsContainer}>
								<div>
									<Button onClick={handleBack} className={classes.button}>
										이전
									</Button>
									<Button
										variant="contained"
										color="primary"
										onClick={handleNext}
										className={classes.button}
									>
										다음
									</Button>
								</div>
							</div>
						</StepContent>
					</Step>
					<Step>
						<StepLabel>관계자 정보</StepLabel>
						<StepContent>
							<OfficialsInfoForm
								handleFormState={handleFormState}
								formState={formState}
							/>
							<div className={classes.actionsContainer}>
								<div>
									<Button onClick={handleBack} className={classes.button}>
										이전
									</Button>
									<Button
										variant="contained"
										color="primary"
										onClick={handleNext}
										className={classes.button}
									>
										완료{' '}
									</Button>
								</div>
							</div>
						</StepContent>
					</Step>
				</Stepper>
				{activeStep === 3 && (
					<Paper square elevation={0} className={classes.resetContainer}>
						<Typography>모든 입력을 마치셨습니다.</Typography>
						<Button onClick={handleReset} className={classes.button}>
							처음부터
						</Button>
						<Button
							color="primary"
							onClick={handleSubmit}
							className={classes.button}
						>
							제출
						</Button>
					</Paper>
				)}
			</Container>
		</div>
	);
};

export default BuildingForm;
