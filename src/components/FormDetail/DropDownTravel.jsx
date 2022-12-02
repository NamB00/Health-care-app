import React, { useState } from 'react';
// import useClickOutSide from '../hooks/useClickOutSide';
import { ErrorMessage, useField, Formik, Form, Field } from 'formik';

const DropDownTravel = ({ control, data, name, value, ...props }) => {
	const [field, meta] = useField(name);
	props.formik.values.travel = props.dataTravel;
	const handleClickDropdownItem = (e, i) => {
		const index = e.target.selectedIndex;
		const indexChildTravel = e.target.getAttribute('index');
		let dataClone = [...props.dataTravel];
		dataClone[i - 1][e.target.name] = e.target.value;
		props.setDataTravel(dataClone);
	};
	return (
		<div className={props.class}>
			<div className='flex flex-col gap-3 mb-5'>
				<label htmlFor={name} className='cursor-pointer'>
					{props.label}*
				</label>
				<div className='relative'>
					<Field
						index={props.index}
						name={name}
						as='select'
						className='w-full px-3 py-2 transition-all bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500'
						value={value}
						onChange={(e) => handleClickDropdownItem(e, props.index)}
					>
						<option className='px-3 py-2 cursor-pointer hover:bg-gray-100'>
							----Chose
						</option>
						{data &&
							data.length > 0 &&
							data.map((item, index) => (
								<option
									key={item.id || item.name}
									className='px-3 py-2 cursor-pointer hover:bg-gray-100'
									index={index}
									name={name}
									// value={value}
								>
									{item.name}
								</option>
							))}
					</Field>
				</div>
			</div>
		</div>
	);
};

export default DropDownTravel;
