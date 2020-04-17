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
			history {
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
				updateDate
			}
		}
	}
`;

export const BUILDING = gql`
	query($id: ID!) {
		building(id: $id) {
			id
			creationDate
			buildingInfo {
				name
				image
				saleArea
				realArea
				layer
				number
				sectors {
					detail
					basic
				}
				location {
					image
					name
				}
			}
			dealInfo {
				trade {
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
