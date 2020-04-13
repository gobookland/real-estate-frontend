import React, { useState, useEffect } from 'react';
import LoginForm from '../../components/auth/LoginForm';
import { useLazyQuery } from '@apollo/react-hooks';
import { LOGIN } from '../../graphql/query/user';
import { withRouter } from 'react-router-dom';

const LoginFormContainer = ({ history }) => {
	const [_error, set_error] = useState(null);

	const [getLoginInfo, { data, error }] = useLazyQuery(LOGIN);

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
		history.push('/auth/register');
	};

	const onSubmit = e => {
		e.preventDefault();
		getLoginInfo({
			variables: { userInput: { ...inputForm } },
		});
	};

	useEffect(() => {
		if (data) {
			try {
				const { login } = data;
				const exist = localStorage.getItem('user');
				if (!exist) {
					localStorage.setItem('user', JSON.stringify(login));
				}
				history.push('/dashboard');
			} catch (e) {
				console.log(e);
			}
		}
		if (error) {
			let error_ = error.graphQLErrors[0].extensions.code;
			if (error_ === 'user_not_found') {
				set_error('사용자를 찾을 수 없습니다.');
			}
			if (error_ === 'invalid_password') {
				set_error('비밀번호가 일치하지 않습니다.');
			}
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
		<LoginForm
			onChangeField={onChangeField}
			onChangeForm={onChangeForm}
			onSubmit={onSubmit}
			error={_error}
		/>
	);
};

export default withRouter(LoginFormContainer);
