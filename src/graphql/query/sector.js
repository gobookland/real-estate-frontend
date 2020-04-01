import { gql } from 'apollo-boost';

export const SECTORS = gql`
	query($type: String) {
		sectors(type: $type) {
			type
			name
		}
	}
`;
