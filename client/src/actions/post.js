import axios from 'axios';
import { setAlert } from './alert';
import {
	ADD_POST,
	DELETE_POST,
	GET_POSTS,
	GET_POST,
	POST_ERROR,
	UPDATE_LIKES,
	ADD_COMMENT,
	REMOVE_COMMENT,
} from './types';

//get posts
export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/posts');

		dispatch({
			type: GET_POSTS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Add like
export const addLike = (id) => async (dispatch) => {
	try {
		const res = await axios.put(`api/posts/like/${id}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: { id, likes: res.data },
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
	try {
		const res = await axios.put(`api/posts/unlike/${id}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: { id, likes: res.data },
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Delete Post
export const deletePost = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`api/posts/${id}`);

		dispatch({
			type: DELETE_POST,
			payload: id,
		});

		dispatch(setAlert('Post Removed', 'success'));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Add Post
export const addPost = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.post(`api/posts/`, formData, config);

		dispatch({
			type: ADD_POST,
			payload: res.data,
		});

		dispatch(setAlert('Post Created', 'success'));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//get post

export const getPost = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/posts/${id}`);

		dispatch({
			type: GET_POST,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Add comment
export const addComment = (postId, formData, loading) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = axios.post(`/api/posts/comment/${postId}`, formData, config);

		dispatch({
			type: ADD_COMMENT,
			payload: res.data,
		});

		dispatch(setAlert('Comment Added', 'success'));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// // Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
	try {
		await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

		dispatch({
			type: REMOVE_COMMENT,
			payload: commentId,
		});
		dispatch(setAlert('Comment Removed', 'success'));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
