import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileTop = ({
	profile: {
		status,
		company,
		location,
		website,
		social,
		user: { name, avatar },
	},
}) => {
	return (
		<div class='profile-top bg-primary p-2'>
			<img class='round-img my-1' src={avatar} alt='' />
			<h1 class='large'>{name}</h1>
			<p class='lead'>
				{status} {company && <span>at {company}</span>}
			</p>
			<p>{location && <span>{location}</span>}</p>
			<div class='icons my-1'>
				{website && (
					<Link to={website}>
						<i class='fas fa-globe fa-2x'></i>
					</Link>
				)}
				{social.twitter && (
					<Link to={social.twitter}>
						<i class='fab fa-twitter fa-2x'></i>
					</Link>
				)}
				{social.facebook && (
					<Link to={social.facebook}>
						<i class='fab fa-facebook fa-2x'></i>
					</Link>
				)}
				{social.instagram && (
					<Link to={social.instagram}>
						<i class='fab fa-instagram fa-2x'></i>
					</Link>
				)}
				{social.linkedin && (
					<Link to={social.linkedin}>
						<i class='fab fa-linkedin fa-2x'></i>
					</Link>
				)}
			</div>
		</div>
	);
};

ProfileTop.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileTop;
