import { ADD_USER, GET_USERS, GET_ONE_USER,GET_USER_BY_Id,ADD_ATTRIBUTE, SET_SELECTED_USER,USER_FAILED, START } from "./Types";
import Axios from "axios";

export const axios = Axios.create({
	baseURL: 'http://localhost:5000/'
});

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
		type: USER_FAILED,
		payload: msg

	}
};

export const addUserSuccess = (user) => {
	return {
		type: ADD_USER,
		payload: user
	}
};

export const addUser = (userData) => {
	return (dispatch) => {
		axios.post("/user/add", userData)
			.then(res => {
				dispatch(addUserSuccess(res.data))
			})
			.catch(err => {
				dispatch(failed(err.msg))
			})
	}
};

export const addAttributeSuccess = (data) => {
	return {
		type: ADD_ATTRIBUTE,
		payload: data
	}
};

export const addAttribute = (userData) => {
	console.log(userData)
	return (dispatch) => {
		axios.post(`/user/attribute/create/${userData.id}`, userData)
			.then(res => {
				dispatch(addAttributeSuccess(res.data))
			})
			.catch(err => {
				dispatch(failed(err.msg))
				console.log(err.response.data.msg)
			})
	}
};

export const deleteAttribute = (user) => {
	return {
	  type: SET_SELECTED_USER,
	  payload: user,
	};
  };


export const getAllUsers = () => {
	return (dispatch) => {
		axios.get("/user/all")
			.then(res => {
				dispatch({
					type: GET_USERS,
					payload: res.data.data
				});
			})
			.catch(err => {
				dispatch(failed(err.msg))
			})
	}
};

export const getUserByName = (name) => {
	return (dispatch) => {
		axios.get(`/user/${name}`)
			.then(res => {
				dispatch({
					type: GET_ONE_USER,
					payload: res.data.data
				});
				
			})
			.catch(err => {
				dispatch(failed(err.msg))
			})
	}
};

export const getUserById = (id) => {
	return (dispatch) => {
		axios.get(`/user/${id}`)
			.then(res => {
				dispatch({
					type: GET_USER_BY_Id,
					payload: res.data.data
				});
			})
			.catch(err => {
				dispatch(failed(err.msg))
			})
	}
};

export const setSelectedUser = (user) => {
	console.log(user)
	return {
	  type: SET_SELECTED_USER,
	  payload: user,
	};
  };
