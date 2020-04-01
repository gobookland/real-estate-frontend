import { gql } from 'apollo-boost';

export const ADD_SECTOR = gql`
	mutation($sectorInput: sectorInput) {
		addSector(sectorInput: $sectorInput) {
			type
			name
		}
	}
`;
