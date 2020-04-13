import React, { useState, useEffect } from 'react';
import RegisterForm from '../../components/auth/RegisterForm';
import { useMutation } from '@apollo/react-hooks';
import { REGISTER } from '../../graphql/mutation/user';
import { withRouter } from 'react-router-dom';

const RegisterFormContainer = ({ history }) => {
	const [getRegisterInfo, { data, error }] = useMutation(REGISTER, {
		errorPolicy: 'none',
	});

	const [inputForm, setInputForm] = useState({
		username: null,
		password: null,
		passwordCheck: null,
	});

	const onChangeField = e => {
		const { name, value } = e.target;
		setInputForm({
			...inputForm,
			[name]: value,
		});
	};

	const onChangeForm = () => {
		history.push('/auth/login');
	};

	const onSubmit = e => {
		e.preventDefault();
		getRegisterInfo({
			variables: { userInput: { ...inputForm } },
		});
	};

	useEffect(() => {
		if (data) {
			try {
				const { register } = data;
				const exist = localStorage.getItem('user');
				if (!exist) {
					localStorage.setItem('user', JSON.stringify(register));
				}
				history.push('/dashboard');
			} catch (e) {
				console.log(e);
			}
		}
		if (error) {
			console.log(error.graphQLErrors[0].extensions.code);
		}
	}, [data, error, history]);

	useEffect(() => {
		try {
			const exist = localStorage.getItem('user');
			if (exist) {
				history.push('/dashboard');
			}
		} catch (e) {
			console.log(e);
		}
	});

	return (
		<RegisterForm
			onChangeField={onChangeField}
			onChangeForm={onChangeForm}
			onSubmit={onSubmit}
		/>
	);
};

export default withRouter(RegisterFormContainer);
