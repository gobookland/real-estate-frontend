import React from 'react';
import {
	Paper,
	AppBar,
	Toolbar,
	Typography,
	Container,
	useMediaQuery,
} from '@material-ui/core';
import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		display: 'flex',
	},
	container: {
		height: '80vh',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
	},
	mobile: {
		justifyContent: 'flex-end',
	},
});

const AuthForm = ({ children }) => {
	const classes = useStyles();

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('xs'));

	return (
		<>
			<div className={classes.root}>
				<AppBar>
					<Toolbar>
						<Typography variant="h5">Weasy</Typography>
					</Toolbar>
				</AppBar>
				<Container
					maxWidth={matches ? 'xs' : 'sm'}
					className={clsx(classes.container, matches && classes.mobile)}
				>
					<Paper variant={matches ? 'elevation' : 'outlined'} elevation={0}>
						{children}
					</Paper>
				</Container>
			</div>
		</>
	);
};

export default AuthForm;
