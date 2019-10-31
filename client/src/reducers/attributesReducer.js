import { GET_ATTRIBUTE, GET_USER_ATTRIBUTE, GET_ONE_ATTRIBUTE, ATTRIBUTE_FAILED, UPDATE_ATTRIBUTE, START, ADD_ATTRIBUTE, DELETE_ATTRIBUTE } from "../action/Types";

const INITIAL = {
	isLoading: false,
	isCreated: false,
	userAttribute: null
}

export default (state = INITIAL, action) => {
	const { type, payload } = action;
	switch (type) {
		case START:
			return {
				...state,
				isLoading: payload.isLoading
			}
		case GET_ATTRIBUTE:
			return {
				...state,
				isCreated: true,
				isLoading: false,
				users: payload
			}
		case GET_ONE_ATTRIBUTE:
			return {
				...state,
				isCreated: true,
				isLoading: false,
				OneUser: payload
			}
		case ATTRIBUTE_FAILED:
			return {
				...state,
				msg: payload,
				isLoading: false
			}
		case GET_USER_ATTRIBUTE:
			return {
				...state,
				isLoading: false,
				userAttribute: payload
			}
		case UPDATE_ATTRIBUTE:
			return {
				...state,
				msg: payload,
				isLoading: false,
				isUpdated: true
			}
		case DELETE_ATTRIBUTE:
			return {
				// ...state,
				// msg: payload,
				// isLoading: false
				userAttribute: state.userAttribute.filter(attribute => attribute !== payload)
			}
		case ADD_ATTRIBUTE: 
			return {
				...state,
				msg: payload,
				isLoading: false,
				iscreated: true
			}
		default:
			return state
	}
}


