



import { gql } from "@apollo/client";

export const SIGN_UP = gql`
	mutation SignUp($input: SignUpInput!) {
		signUp(input: $input) {
			_id
			name
			username
		}
	}
`;
export const LOG_IN = gql`
mutation LogIn($input:LogInInput){
	logIn(input:$input){
		_id
		name
		username
	}
}
`

export const LOGOUT = gql`
mutation LogOut {
	LogOut {
		message
	}
}
`
