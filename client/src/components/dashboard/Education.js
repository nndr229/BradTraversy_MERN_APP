import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

function Education({ education, deleteEducation }) {
	const educations = education.map((edu) => (
		<tr key={edu._id}>
			<td>{edu.school}</td>
			<td className='hide-sm'>{edu.degree}</td>
			<td className='hide-sm'>
				<Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
				{edu.to === null ? (
					' Now'
				) : (
					<Moment format='YYYY/MM/DD'>{edu.to}</Moment>
				)}
			</td>
			<td>
				<button
					onClick={(e) => deleteEducation(edu._id)}
					className='btn btn-danger'
				>
					Delete
				</button>
			</td>
		</tr>
	));

	return (
		<Fragment>
			<h2 class='my-2'>Education</h2>
			<table class='table'>
				<thead>
					<tr>
						<th>School</th>
						<th class='hide-sm'>Degree</th>
						<th class='hide-sm'>Years</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{educations}</tbody>
			</table>
		</Fragment>
	);
}

Education.propTypes = {
	education: PropTypes.array.isRequired,
	deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
