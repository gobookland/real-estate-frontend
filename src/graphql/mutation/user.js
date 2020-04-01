import { gql } from 'apollo-boost';

export const REGISTER = gql`
	mutation($userInput: userInput!) {
		register(userInput: $userInput) {
			id
			username
		}
	}
`;
