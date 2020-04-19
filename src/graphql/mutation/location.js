import { gql } from 'apollo-boost';

export const ADD_LOCATION = gql`
	mutation($locationInput: locationInput) {
		addLocation(locationInput: $locationInput) {
			image
			name
		}
	}
`;

export const DELETE_LOCATION = gql`
	mutation($names: [String!]) {
		deleteLocation(names: $names) {
			image
			name
		}
	}
`;
