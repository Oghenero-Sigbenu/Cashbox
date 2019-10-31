import { ADD_USER, GET_USERS, GET_ONE_USER, ADD_ATTRIBUTE, USER_FAILED, GET_USER_BY_Id, START, SET_SELECTED_USER } from '../action/Types';

const INITIAL = {
	isLoading: false,
	attribute: null
}

export default (state = INITIAL, action) => {
	const { type, payload } = action;
	switch (type) {
		case START:
			return {
				...state,
				isLoading: payload.isLoading
			}
		case ADD_USER:
			return {
				...state,
				isCreated: true,
				isLoading: false,
			}
		case ADD_ATTRIBUTE: {
			let attribute = [...state.attribute.userAttribute]
			attribute.push(payload)
			return {
				...state,
				attribute: {
					...state.attribute,
					userAttribute: attribute
				},
				iscreated: true
			}
		}
		case GET_USERS:
			return {
				...state,
				isCreated: true,
				isLoading: false,
				users: payload
			}
		case GET_ONE_USER:
			return {
				...state,
				isFound: true,
				isLoading: false,
				oneUser: payload
			}
		case USER_FAILED:
			return {
				...state,
				msg: payload,
				isLoading: false
			}
		case SET_SELECTED_USER:
			return {
				...state,
				selectedUser: payload,
				isLoading: false
			}
		case GET_USER_BY_Id:
			return {
				...state,
				user: payload,
				isLoading: false
			}
		default:
			return state
	}
}