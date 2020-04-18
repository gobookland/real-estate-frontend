import React from 'react';
import {
	Container,
	Paper,
	CircularProgress,
	Grid,
	Typography,
	Slider,
	Button,
	Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BasicChart from '../../components/chart/BasicChart';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	container: {
		paddingTop: '24px',
		paddingBottom: '24px',
	},
	progressDiv: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '60vh',
	},
	paper: {
		padding: theme.spacing(3),
	},
}));

const valueText = [
	{
		value: 0,
		label: '0%',
	},
	{
		value: 20,
		label: '20%',
	},
	{
		value: 40,
		label: '40%',
	},
	{
		value: 60,
		label: '60%',
	},
	{
		value: 80,
		label: '80%',
	},
	{
		value: 100,
		label: '100%',
	},
];

const Traffic = ({
	loadings,
	buildingData,
	handleTrafficData,
	handleTrafficSubmit,
}) => {
	const classes = useStyles();

	const isLoading =
		loadings.filter((loading) => loading && loading).length !== 0;

	const building = !isLoading && buildingData.building;
	const chartData =
		building.traffic &&
		building.traffic.map((traffic) => {
			const date = new Date(parseInt(traffic.updateDate));
			const argument = `${date.getFullYear()}-${
				date.getMonth() + 1
			}-${date.getDate()}`;

			return {
				argument,
				value1: traffic.percentage,
			};
		});

	const valueMap = {
		value1: '트래픽 지수',
	};

	return (
		<div className={classes.root}>
			<Container maxWidth="md" className={classes.container}>
				{isLoading ? (
					<div className={classes.progressDiv}>
						<CircularProgress />
					</div>
				) : (
					<Paper className={classes.paper}>
						<Grid container spacing={3}>
							<Grid item xs={12} md={12}>
								<Typography variant="h6">
									{building.buildingInfo.name}
								</Typography>
							</Grid>
							<Divider />
							<Grid item xs={12} md={12}>
								<Grid container spacing={3}>
									<Grid item xs={12} md={12}>
										<Typography>트래픽 지수 추가</Typography>
									</Grid>
									<Grid item xs={12} md={12}>
										<Slider
											step={10}
											marks={valueText}
											defaultValue={50}
											valueLabelDisplay="auto"
											min={0}
											onChange={handleTrafficData}
											track="normal"
											max={100}
										/>
									</Grid>
									<Grid item xs={12} md={12}>
										<Button
											color="primary"
											variant="contained"
											style={{ float: 'right' }}
											onClick={handleTrafficSubmit}
										>
											추가
										</Button>
									</Grid>
								</Grid>
							</Grid>

							<Grid item xs={12} md={12}>
								{chartData && chartData.length !== 0 ? (
									<BasicChart
										data={chartData}
										matchingName={valueMap}
										noLegend
									/>
								) : (
									<Typography align="center">
										트래픽 지수가 없습니다.
									</Typography>
								)}
							</Grid>
						</Grid>
					</Paper>
				)}
			</Container>
		</div>
	);
};

export default Traffic;
