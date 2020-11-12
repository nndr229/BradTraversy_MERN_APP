import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
	profile: {
		bio,
		skills,
		user: { name, avatar },
	},
}) => {
	return (
		<div className='profile-about bg-light p-2'>
			{bio && (
				<Fragment>
					<h2 className='primary'>{name.trim().split(' ')[0]}'s Bio </h2>
					<p>{bio}</p>
					<div className='line'></div>
				</Fragment>
			)}
			<h2 class='text-primary'>Skill Set</h2>
			<div class='skills'>
				{skills.map((skill, index) => {
					return (
						<div class='p-1' key={index}>
							<i class='fas fa-check'></i> {skill}
						</div>
					);
				})}
			</div>
		</div>
	);
};

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
