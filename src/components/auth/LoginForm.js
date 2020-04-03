import React from 'react';
import { Grid, TextField, Typography, Button, Box } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	body: {
		padding: '1rem',
	},
	login: {
		float: 'right',
	},
	error: {
		color: '#f44336',
		fontSize: '.8rem',
	},
});

const LoginForm = ({ onChangeField, onChangeForm, onSubmit, error }) => {
	const classes = useStyles();

	return (
		<>
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
					{error && (
						<Grid item xs={12}>
							<Typography
								variang="body2"
								className={classes.error}
								align="center"
							>
								{error}
							</Typography>
						</Grid>
					)}
					<Grid item xs={12}>
						<Button fullWidth onClick={onChangeForm}>
							회원가입으로 전환하기
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
							로그인
						</Button>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default LoginForm;
