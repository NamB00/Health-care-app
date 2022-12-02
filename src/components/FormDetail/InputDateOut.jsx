import React from 'react';
import { useField } from 'formik';

const InputDateOut = ({ control, label, setDataTravel, ...props }) => {
	const [field, meta] = useField(props.name);
	return (
		<div className={props.classnew}>
			<div className='flex flex-col gap-3 mb-5'>
				<label htmlFor={props.id} className='cursor-pointer'>
					{label}*
				</label>
				<input
					type='date'
					name={props.name}
					className='items-center px-3 py-[0.4rem] transition-all bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500'
					// {...props}
					{...field}
				/>
				{meta.touched && meta.error && (
					<p className='mt-1 text-sm text-red-500'>{meta.error}</p>
				)}
			</div>
		</div>
	);
};

export default InputDateOut;
