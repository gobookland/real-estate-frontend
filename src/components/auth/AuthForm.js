import React from 'react';
import { Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		minHeight: '100vh',
		background: '#eee',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		'& > *': {
			width: '437px',
		},
	},
});

const AuthForm = ({ children }) => {
	const classes = useStyles();

	return (
		<>
			<div className={classes.root}>
				<Paper>{children}</Paper>
			</div>
		</>
	);
};

export default AuthForm;
