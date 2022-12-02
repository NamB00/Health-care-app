import React, { useState } from 'react';
// import useClickOutSide from '../hooks/useClickOutSide';
import { ErrorMessage, useField, Formik, Form, Field } from 'formik';

const DropDownOut = ({ control, data, formik, ...props }) => {
	const [field, meta] = useField(props.name);
	const handleClickDropdownItem = (e) => {
		const index = e.target.selectedIndex;
	};
	return (
		<div className={props.class}>
			<div className='flex flex-col gap-3 mb-5'>
				<label htmlFor={props.id} className='cursor-pointer'>
					{props.label}*
				</label>
				<div className='relative'>
					<Field
						name={props.name}
						as='select'
						className='w-full px-3 py-2 transition-all bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500'
						onClick={handleClickDropdownItem}
					>
						<option
							className='px-3 py-2 cursor-pointer hover:bg-gray-100'
							value=''
						>
							----Chose
						</option>
						{data &&
							data.length > 0 &&
							data.map((item, index) => (
								<option
									key={item.id || item.name}
									className='px-3 py-2 cursor-pointer hover:bg-gray-100'
									value={item.value || item.name}
									index={index}
								>
									{item.value || item.name}
								</option>
							))}
					</Field>
				</div>
				{meta.touched && meta.error && (
					<p className='mt-1 text-sm text-red-500'>{meta.error}</p>
				)}
			</div>
		</div>
	);
};

export default DropDownOut;
