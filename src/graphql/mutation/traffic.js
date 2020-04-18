import { gql } from 'apollo-boost';

export const ADD_TRAFFIC = gql`
	mutation($buildingId: ID!, $percentage: Int!) {
		addTraffic(buildingId: $buildingId, percentage: $percentage) {
			updateDate
			percentage
		}
	}
`;
