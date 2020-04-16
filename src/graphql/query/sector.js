import { gql } from 'apollo-boost';

export const SECTORS = gql`
	query($type: String, $parent: String) {
		sectors(type: $type, parent: $parent) {
			type
			name
			parent
		}
	}
`;
