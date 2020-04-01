import React from 'react';
import AuthForm from '../components/auth/AuthForm';
import LoginFormContainer from '../containers/auth/LoginFormContainer';

const AuthPage = () => {
	return (
		<AuthForm>
			<LoginFormContainer />
		</AuthForm>
	);
};

export default AuthPage;
