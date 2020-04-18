import React from 'react';
import { Container, Paper, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
}));

const Traffic = ({ loadings, buildingData }) => {
	const classes = useStyles();

	const isLoading =
		loadings.filter((loading) => loading && loading).length !== 0;

	return (
		<div className={classes.root}>
			<Container maxWidth="md" className={classes.container}>
				{isLoading ? (
					<div className={classes.progressDiv}>
						<CircularProgress />
					</div>
				) : (
					<Paper></Paper>
				)}
			</Container>
		</div>
	);
};

export default Traffic;
