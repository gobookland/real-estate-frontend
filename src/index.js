import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';

const link = createHttpLink({
	uri: 'https://blueberry-pudding-72910.herokuapp.com/graphql',
	credentials: 'include',
});

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<HashRouter basename="/">
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</HashRouter>
	</ApolloProvider>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
