import { GET_ATTRIBUTE, GET_ONE_ATTRIBUTE, GET_USER_ATTRIBUTE,ATTRIBUTE_FAILED,UPDATE_ATTRIBUTE, START, ADD_ATTRIBUTE, DELETE_ATTRIBUTE } from "./Types";
import {axios} from "./user";

export const start = () => {
	return {
		type: START,
		payload: {
			isLoading: true
		}
	}
};

export const failed = (msg) => {
	return {
		type: ATTRIBUTE_FAILED,
		payload: msg

	}
};

export const addAttributeSuccess = (data) => {
	return {
		type: ADD_ATTRIBUTE,
		payload: data
	}
};

export const addAttribute = (userData) => {
	return (dispatch) => {
		axios.post("/attributes/add", userData)
			.then(res => {
				dispatch(addAttributeSuccess(res.data))
				console.log("posted")
			})
			.catch(err => {
				dispatch(failed(err.msg))
				console.log(err.response.data.msg)
			})
	}
};

export const getAllAttributes = () => {
	return (dispatch) => {
		axios.get("/attributes/all")
			.then(res => {
				dispatch({
					type: GET_ATTRIBUTE,
					payload: res.data.data
				});
			})
			.catch(err => {
				dispatch(failed(err.msg))
			})
	}
};

export const getAttributeById = (id) => {
	return (dispatch) => {
		axios.get(`/attributes/${id}`)
			.then(res => {
				dispatch({
					type: GET_ONE_ATTRIBUTE,
					payload: res.data.data
				});
			})
			.catch(err => {
				dispatch(failed(err.msg))
			})
	}
};

export const getUserAttribute = (id) => {
	return (dispatch) => {
		axios.get(`/attributes/user/${id}`)
			.then(res => {
				dispatch({
					type: GET_USER_ATTRIBUTE,
					payload: res.data.data
				})
			})
			.catch(err => {
				dispatch(failed(err.msg))
			})
	}
};

export const editAttribute = (data) => {
	console.log(data)
	return (dispatch) => {
		axios.post(`/attributes/update/${data.userId}`, data)
			.then(res => {
				dispatch({
					type: UPDATE_ATTRIBUTE,
					payload: res.data.data
				});
			})
			.catch(err => {
				dispatch(failed(err.msg))
			})
}
};

export const deleteAttribute = (id) => {
	return (dispatch) => {
		axios.post(`/attributes/delete/${id}`)
			.then(res => {
				dispatch({
					type: DELETE_ATTRIBUTE,
					payload: res.data.data
				});
			})
			.catch(err => {
				dispatch(failed(err.msg))
			})
}
}