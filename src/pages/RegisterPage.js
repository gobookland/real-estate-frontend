import React from 'react';
import AuthForm from '../components/auth/AuthForm';
import RegisterFormContainer from '../containers/auth/RegisterFormContainer';

const RegisterPage = () => {
	return (
		<AuthForm>
			<RegisterFormContainer />
		</AuthForm>
	);
};
export default RegisterPage;
