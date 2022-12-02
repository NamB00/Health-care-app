import React from 'react';
import { useField } from 'formik';

const InputForm = ({ control, label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<div className={props.classnew}>
				<div className='flex flex-col gap-3 mb-5'>
					<label htmlFor={props.id} className='cursor-pointer'>
						{label}*
					</label>
					<input
						className='px-3 py-2 transition-all bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500'
						// {...props}
						autoComplete='off'
						placeholder={props.placeholder}
						{...field}
					/>
					{meta.touched && meta.error && (
						<p className='mt-1 text-sm text-red-500'>{meta.error}</p>
					)}
				</div>
			</div>
		</>
	);
};

export default InputForm;
