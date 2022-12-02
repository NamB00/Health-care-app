import React from 'react';
import { ErrorMessage, useField } from 'formik';

const Radio = ({ control, setValue, name, watchVaccines, ...props }) => {
	const handleRadio = (e) => {
		setValue(name, e.target.dataset.value);
	};
	// sua watch lay name thay vao
	const [field, meta] = useField({ name });
	return (
		<div className='flex items-center'>
			<input
				id={name}
				name={name}
				type='radio'
				value={props.value}
				data-value={props.value}
				onClick={handleRadio}
				onChange={(e) => {}}
				checked={watchVaccines === props.value}
				className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
			/>
			<label htmlFor='link-radio' className='ml-2 text-md dark:text-gray-300'>
				{props.label}
			</label>
		</div>
	);
};

export default Radio;
