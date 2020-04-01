import { gql } from 'apollo-boost';

export const BUILDINGS = gql`
	query(
		$creationDate: Int
		$dealType: String
		$field: String
		$fieldOrder: Int
	) {
		buildings(
			creationDate: $creationDate
			dealType: $dealType
			field: $field
			fieldOrder: $fieldOrder
		) {
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
			partyInfo {
				owner
				ownerPhone
				lessee
				lesseePhone
			}
		}
	}
`;
