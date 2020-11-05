import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log('Success');
	};

	const { email, password } = formData;

	return (
		<Fragment>
			<div className='alert alert-danger'>Invalid credentials</div>
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Sign Into Your Account
			</p>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='email'
						name='email'
						placeholder='email'
						value={email}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						value={password}
						onChange={(e) => onChange(e)}
						type='password'
						name='password'
						placeholder='password'
						minLength='6'
					/>
				</div>
				<input type='submit' value='Login' className='btn btn-primary' />
			</form>
			<p className='my-1'>
				Don't have an account? <Link to='/register'> Sign Up</Link>
			</p>
		</Fragment>
	);
};
