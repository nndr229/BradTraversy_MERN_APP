import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
	<Fragment>
		<img
			src={spinner}
			style={{ width: '300px', margin: 'auto', display: 'block' }}
			alt='Loading...'
		/>
	</Fragment>
);
export default Spinner;
