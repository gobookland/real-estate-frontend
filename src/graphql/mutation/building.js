import { gql } from 'apollo-boost';

export const REMOVE_BUILDING = gql`
	mutation($ids: [ID!]) {
		deleteBuilding(ids: $ids) {
			id
			creationDate
			buildingInfo {
				name
				image
				saleArea
				realArea
				layer
				number
			}
			dealInfo {
				trade {
					totalPrice
					price
					monthly
					deposit
				}
				lease {
					price
					monthly
					deposit
				}
				rights
			}
			officialsInfo {
				owner
				ownerPhone
				lessee
				lesseePhone
			}
		}
	}
`;

export const ADD_BUILDING = gql`
	mutation($buildingInput: buildingInput) {
		addBuilding(buildingInput: $buildingInput) {
			id
			creationDate
			buildingInfo {
				name
				image
				saleArea
				realArea
				layer
				number
			}
			dealInfo {
				trade {
					totalPrice
					price
					monthly
					deposit
				}
				lease {
					price
					monthly
					deposit
				}
				rights
			}
			officialsInfo {
				owner
				ownerPhone
				lessee
				lesseePhone
			}
		}
	}
`;
