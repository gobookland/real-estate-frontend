import React from 'react';
import {
	Grid,
	TextField,
	Typography,
	Button,
	Box,
	Paper,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	body: {
		padding: '1rem',
	},
	login: {
		float: 'right',
	},
	header: {
		color: '#3F51B5',
		marginBottom: '2rem',
		fontWeight: 'lighter',
	},
});

const RegisterForm = ({ onChangeField, onChangeForm, onSubmit }) => {
	const classes = useStyles();

	return (
		<>
			<Typography variant="h5" align="center" className={classes.header}>
				Register
			</Typography>
			<Paper>
				<Box component="form" onSubmit={onSubmit}>
					<Grid container className={classes.body} spacing={3}>
						<Grid item xs={12}>
							<TextField
								label="Username"
								fullWidth
								onChange={onChangeField}
								name="username"
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Password"
								type="password"
								fullWidth
								name="password"
								onChange={onChangeField}
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Password Confirm"
								type="password"
								fullWidth
								name="passwordCheck"
								onChange={onChangeField}
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<Button fullWidth onClick={onChangeForm}>
								로그인으로 전환하기
							</Button>
						</Grid>
						<Grid item xs={12}>
							<Button
								color="primary"
								variant="contained"
								className={classes.login}
								type="submit"
								fullWidth
							>
								회원가입
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</>
	);
};

export default RegisterForm;
