import { gql } from 'apollo-boost';

export const ADD_SECTOR = gql`
	mutation($type: String, $name: String, $parent: String) {
		addSector(type: $type, name: $name, parent: $parent) {
			type
			name
			parent
		}
	}
`;

export const DELETE_SECTOR = gql`
	mutation($sectorInput: [sectorInput]) {
		deleteSector(sectorInput: $sectorInput) {
			type
			name
			parent
		}
	}
`;
