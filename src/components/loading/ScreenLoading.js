import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
	progressDiv: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		width: '100vw',
		position: 'fixed',
		top: 0,
		left: 0,
	},
});

const ScreenLoading = () => {
	const classes = useStyles();
	return (
		<div className={classes.progressDiv}>
			<CircularProgress />
		</div>
	);
};

export default ScreenLoading;
