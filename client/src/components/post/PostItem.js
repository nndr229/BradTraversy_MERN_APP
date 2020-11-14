import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { addComment, deleteComment } from '../../actions/post';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';
import { Link, Redirect } from 'react-router-dom';

const PostItem = ({ post, addComment, auth, deleteComment }) => {
	const [text, settext] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		return post.post.comments[0] === null
			? setLoading(true)
			: setLoading(false);
	}, [post.post.comments]);

	return (
		<Fragment>
			<Link to='/posts' className='btn'>
				Back To Posts
			</Link>
			<div className='post bg-white my-1 p-1'>
				<div>
					<a href={`/profile/${post.post.user}`}>
						<img
							className='round-img my-1'
							src={post.post.avatar}
							alt='profile pic'
						/>
						<h4>{post.post.name}</h4>
					</a>
				</div>
				<div>
					<p className='my-1'>{post.post.text}</p>
				</div>
			</div>

			<div className='post-form'>
				<div className='post-form-header bg-primary'>
					<h3>Leave A Comment</h3>
				</div>
				<form
					className='form my-1'
					onSubmit={(e) => {
						e.preventDefault();
						addComment(post.post._id, { text });
						settext('');
					}}
				>
					<textarea
						name='text'
						cols='30'
						rows='5'
						placeholder='Comment on this post'
						value={text}
						onChange={(e) => settext(e.target.value)}
					></textarea>
					<input
						type='submit'
						className='btn btn-dark my-1'
						value='Submit'
						onClick={() => {
							return window.location.reload(false);
						}}
					/>
				</form>
			</div>

			{loading ? (
				<Spinner />
			) : (
				post.post.comments.map((comment) => {
					return (
						<div className='post bg-white my-1 p-1'>
							<div>
								<a href={`/profile/${comment.user}`}>
									<img className='round-img my-1' src={comment.avatar} alt='' />
									<h4>{comment.name}</h4>
								</a>
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-around',
									alignItems: 'center',
								}}
							>
								<p className='my-1'>{comment.text}</p>
								<p className='post-date'>
									Posted on <Moment format='YYYY/MM/DD'>{comment.date}</Moment>
								</p>
								{!auth.loading && comment.user === auth.user._id && (
									<button
										type='button'
										className='btn btn-danger'
										// style={{ width: 50 }}
										onClick={(e) => deleteComment(post.post._id, comment._id)}
									>
										<i className='fas fa-times'></i>
									</button>
								)}
							</div>
						</div>
					);
				})
			)}
		</Fragment>
	);
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	addComment: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	post: state.post,
});

export default connect(mapStateToProps, { addComment, deleteComment })(
	PostItem
);
