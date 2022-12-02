import React from 'react';
import { useField } from 'formik';

const InputDate = ({
	control,
	label,
	setDataTravel,
	dataTravel,
	name,
	value,
	...props
}) => {
	const [field, meta] = useField(name);
	props.formik.values.travel = dataTravel;
	const handlebvb = (e, i) => {
		let dataClone = [...dataTravel];
		dataClone[i - 1][e.target.name] = e.target.value;
		setDataTravel(dataClone);
		// ko nhan name
	};
	return (
		<div className={props.classnew}>
			<div className='flex flex-col gap-3 mb-5'>
				<label htmlFor={props.id} className='cursor-pointer'>
					{label}*
				</label>
				<input
					type='date'
					name={name}
					// value={dataTravel[props.index - 1].name}
					value={value}
					className='items-center px-3 py-2 transition-all bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500'
					// {...props}
					onChange={(e) => handlebvb(e, props.index)}
					// {...field}
				/>
				{meta.touched && meta.error && (
					<p className='mt-1 text-sm text-red-500'>{meta.error}</p>
				)}
			</div>
		</div>
	);
};

export default InputDate;
