import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardActions = () => {
	return (
		<div class='dash-buttons'>
			<Link to='/edit-profile' className='btn'>
				<i class='fas fa-user-circle text-primary'></i> Edit Profile
			</Link>
			<Link to='/add-experience' className='btn'>
				<i class='fab fa-black-tie text-primary'></i> Add Experience
			</Link>
			<Link to='/add-education' className='btn'>
				<i class='fas fa-graduation-cap text-primary'></i> Add Education
			</Link>
		</div>
	);
};
