

import { gql } from "@apollo/client";

export const SIGN_UP = gql`
	mutation SignUp($input: SignUpInput!) {
		signup(input: $input) {
			_id
			name
			username
		}
	}
`;
export const LOG_IN = gql`
mutation LogIn($input: LogInInput!){
	login(input: $input){
		_id
		name
		username
	}
}
`

export const LOGOUT = gql`
mutation LogOut {
	logout {
		message
	}
}
`
