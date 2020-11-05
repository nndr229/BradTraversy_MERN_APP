import React, { Fragment, useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';

export const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			console.log('Passwords do not match!');
		} else {
			console.log('Success');
			// const newUser = { name, email, password };
			// try {
			// 	const config = {
			// 		headers: {
			// 			'Content-Type': 'application/json',
			// 		},
			// 	};

			// 	const body = JSON.stringify(newUser);

			// 	const res = await axios.post('/api/users', body, config);
			// 	console.log(res.data);
			// } catch (err) {
			// 	console.log(err.response.data);
			// }
		}
	};

	const { name, email, password, password2 } = formData;

	return (
		<Fragment>
			<h1 className='large text-primary'>Sign Up</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create Your Account
			</p>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='name'
						name='name'
						value={name}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='email'
						name='email'
						value={email}
						onChange={(e) => onChange(e)}
						placeholder='email'
					/>
					<small className='form-text'>
						This site uses Gravatar,so if you want a profile image, use a
						gravatar email
					</small>
				</div>
				<div className='form-group'>
					<input
						type='password'
						name='password'
						value={password}
						onChange={(e) => onChange(e)}
						placeholder='password'
						minLength='6'
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						name='password2'
						value={password2}
						onChange={(e) => onChange(e)}
						placeholder='confirm password'
						minLength='6'
					/>
				</div>
				<input type='submit' value='Register' className='btn btn-primary' />
			</form>
			<p className='my-1'>
				Already have an account? <Link to='/login'> Sign In</Link>
			</p>
		</Fragment>
	);
};
