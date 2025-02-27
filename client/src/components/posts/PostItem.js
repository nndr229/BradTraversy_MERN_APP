import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
	addLike,
	removeLike,
	deletePost,
	auth,
	post: { _id, text, name, avatar, likes, user, comments, date },
}) => {
	return (
		<div className='post bg-white my-1 p-1'>
			<div>
				<Link to={`/profile/${user}`}>
					<img className='round-img my-1' src={avatar} alt='' />
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<p className='my-1'>{text}</p>
				<p className='post-date'>
					Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
				</p>
				<button className='btn' onClick={(e) => addLike(_id)}>
					<i className='fas fa-thumbs-up'></i> <span>{likes.length}</span>
				</button>
				<button className='btn' onClick={(e) => removeLike(_id)}>
					<i className='fas fa-thumbs-down'></i>
				</button>
				<Link to={`/posts/${_id}`} className='btn btn-primary'>
					Discussion{' '}
					{comments.length > 0 && (
						<span class='comment-count'>{comments.length}</span>
					)}
				</Link>
				{!auth.loading && user === auth.user._id && (
					<button
						type='button'
						className='btn btn-danger'
						onClick={(e) => deletePost(_id)}
					>
						<i className='fas fa-times'></i>
					</button>
				)}
			</div>
		</div>
	);
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
	PostItem
);
