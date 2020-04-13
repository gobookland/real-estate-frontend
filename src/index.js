import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';

const link = createHttpLink({
	// Todo: change url written below
	uri: 'https://blueberry-pudding-72910.herokuapp.com/graphql',
	// uri: 'http://localhost:4000/graphql',
	credentials: 'include',
});

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<BrowserRouter basename="/">
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</BrowserRouter>
	</ApolloProvider>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
