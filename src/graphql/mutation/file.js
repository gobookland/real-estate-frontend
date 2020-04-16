import { gql } from 'apollo-boost';

export const SINGLE_FILE_UPLOAD = gql`
	mutation($file: Upload!) {
		singleFileUpload(file: $file) {
			filename
			mimetype
			encoding
		}
	}
`;
