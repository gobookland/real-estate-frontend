import { gql } from 'apollo-boost';

export const LOGIN = gql`
	query($userInput: userInput!) {
		login(userInput: $userInput) {
			id
			username
		}
	}
`;

export const CHECK = gql`
	query {
		check {
			id
			username
		}
	}
`;
