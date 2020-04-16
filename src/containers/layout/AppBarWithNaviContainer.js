import React, { useEffect } from 'react';
import AppBarWithNavi from '../../components/layout/AppBarWithNavi';
import { useQuery } from '@apollo/react-hooks';
import { CHECK } from '../../graphql/query/user';
import { withRouter } from 'react-router-dom';

const AppBarWithNaviContainer = ({ history, children }) => {
	const { data, error } = useQuery(CHECK);

	// useEffect(() => {
	// 	if (data) {
	// 		const { check } = data;
	// 		try {
	// 			const exist = localStorage.getItem('user');
	// 			if (!exist) {
	// 				localStorage.setItem('user', JSON.stringify(check));
	// 			}
	// 		} catch (e) {
	// 			console.log(e);
	// 		}
	// 	}
	// 	if (error) {
	// 		try {
	// 			let error_ = error.graphQLErrors[0].extensions.code;
	// 			if (error_ === 'unauthorized') {
	// 				localStorage.removeItem('user');
	// 				history.push('/auth/login');
	// 			}
	// 		} catch (e) {
	// 			console.log(e);
	// 		}
	// 	}
	// }, [data, error, history]);

	return <AppBarWithNavi children={children}></AppBarWithNavi>;
};

export default withRouter(AppBarWithNaviContainer);
