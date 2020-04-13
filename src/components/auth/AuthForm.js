import React from 'react';
import { Typography, Container } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		minHeight: '100vh',
		background: '#eeeeee',
	},
	container: {
		height: '90vh',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
	},
	AppName: {
		fontWeight: '300',
		marginBottom: '1rem',
	},
});

const AuthForm = ({ children }) => {
	const classes = useStyles();

	return (
		<>
			<div className={classes.root}>
				<Container maxWidth="xs" className={classes.container}>
					<Typography className={classes.AppName} variant="h4" align="center">
						Real Estate
					</Typography>
					{children}
				</Container>
			</div>
		</>
	);
};

export default AuthForm;
