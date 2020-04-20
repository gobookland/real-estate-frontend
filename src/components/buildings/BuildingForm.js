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
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import BuildingInfoForm from './form/buildingForm/BuildingInfoForm';
import DealInfoForm from './form/buildingForm/DealInfoForm';
import OfficialsInfoForm from './form/buildingForm/OfficialsInfoForm';
import ScreenLoading from '../loading/ScreenLoading';

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

const BuildingForm = ({ data, loading, state, setState, handler }) => {
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
				{loading.buildingLoading || loading.sectors || loading.locations ? (
					<ScreenLoading />
				) : (
					<>
						<Stepper activeStep={activeStep} orientation="vertical">
							<Step>
								<StepLabel>건물 정보</StepLabel>
								<StepContent>
									<BuildingInfoForm
										handler={handler}
										state={state}
										setState={setState}
										data={data}
										loading={loading}
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
										handler={handler}
										state={state}
										setState={setState}
										data={data}
										loading={loading}
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
										handler={handler}
										state={state}
										setState={setState}
										data={data}
										loading={loading}
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
									onClick={handler.handleSubmit}
									className={classes.button}
								>
									제출
								</Button>
							</Paper>
						)}
					</>
				)}
			</Container>
		</div>
	);
};

export default BuildingForm;
