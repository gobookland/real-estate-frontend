import { gql } from 'apollo-boost';

export const BUILDINGS = gql`
	query {
		buildings {
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
