import { gql } from 'apollo-boost';

export const LOCATIONS = gql`
	query {
		locations {
			image
			name
		}
	}
`;
