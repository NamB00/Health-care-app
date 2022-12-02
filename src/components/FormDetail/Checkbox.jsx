import React from 'react';
import { ErrorMessage, useField } from 'formik';

const Checkbox = ({ control, setValue, name, ...props }) => {
	const handleCheckbox = (e) => {
		setValue(name, e.target.value);
	};
	const [field, meta] = useField({ name });
	return (
		<>
			{/* // adit class here */}
			<div className='flex items-center mb-4'>
				<input
					id={name}
					type='checkbox'
					value={props.value}
					name={name}
					className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded outline-none focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600'
					checked={props.watch.symptoms === props.value}
					onChange={handleCheckbox}
				></input>
				<label htmlFor={props.value} className='ml-2 text-base'>
					{props.text}
				</label>
			</div>
		</>
	);
};

export default Checkbox;
