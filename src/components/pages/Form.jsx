import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Formik, useField, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import InputForm from '../FormDetail/InputForm';
import DropDownOut from '../FormDetail/DropDownOut';
import InputDateOut from '../FormDetail/InputDateOut';
import countries from '../../data/coutries.json';
import Button from '../FormDetail/Button';
import DropDown from '../FormDetail/DropDown';
import Checkbox from '../FormDetail/Checkbox';
import Radio from '../FormDetail/Radio';
import InputDate from '../FormDetail/InputDate';
import DropDownTravel from '../FormDetail/DropDownTravel';

const dropdownData = [
	{
		id: 1,
		value: 'expert',
		text: 'Expert',
	},
	{
		id: 2,
		value: 'international student',
		text: 'International Student',
	},
	{
		id: 3,
		value: 'vietnamese',
		text: 'Vietnamese',
	},
	{
		id: 4,
		value: 'other',
		text: 'Other',
	},
];
const dropdownGender = [
	{
		id: 1,
		value: 'male',
		text: 'Male',
	},
	{
		id: 2,
		value: 'female',
		text: 'Female',
	},
	{
		id: 3,
		value: 'other',
		text: 'Other',
	},
];

const Form = ({
	setDataTravel,
	dataTravel,
	setDataForm,
	dataForm,
	chooseIndex,
}) => {
	const [citiesInVietnam, setCitiesInVietnam] = useState([]);
	const { slug } = useParams();
	const navigate = useNavigate();
	const initialValues = {
		travel: [],
		username: '',
		object: '',
		date: '',
		gender: '',
		nationality: '',
		nationId: '',
		province: '',
		district: '',
		address: '',
		email: '',
		mobile: '',
		symptoms: '',
		vaccines: 'none',
		id: Date.now(),
	};
	useEffect(() => {
		const fectData = async () => {
			const res = await axios.get('https://provinces.open-api.vn/api/?depth=2');
			setCitiesInVietnam(res.data);
		};
		fectData();
	}, []);
	const handleAddmore = (e) => {
		e.preventDefault();
		const travelAdd = [
			...dataTravel,
			{
				departureDate: '',
				immigrationDate: '',
				departure: '',
				destination: '',
				id: Date.now(),
			},
		];
		console.log(travelAdd);
		setDataTravel(travelAdd);
	};
	const handleDeletemore = (index) => {
		let data = [...dataTravel];
		data.splice(index - 1, 1);
		setDataTravel(data);
	};
	return (
		<div className='container'>
			<Formik
				initialValues={
					slug !== undefined ? dataForm[chooseIndex - 1] : initialValues
				}
				// enableReinitialize
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setDataForm((prev) => [...prev, values]);
					for (let i = 0; i < dataForm.length; i++) {
						if (dataForm[i].id === Number(slug)) {
							dataForm[i] = values;
						}
					}

					navigate('/table');
				}}
				validationSchema={yup.object({
					username: yup.string().required('Name is required'),
					email: yup
						.string()
						.email('Please enter valid email adress')
						.required('Email is required'),
					object: yup.string().required('Object is required'),
					date: yup.string().required('Date of birth is required'),
					gender: yup.string().required('Gender is required'),
					nationality: yup.string().required('Nationality is required'),
					nationId: yup
						.string()
						.min(6, 'your Id must be at least 8 characters or greater')
						.required('Nation ID is required'),
					province: yup.string().required('Contact province is required'),
					district: yup.string().required('Contact district is required'),
					address: yup.string().required('Contact address is required'),
					mobile: yup
						.string()
						.matches(/^[0-9]+$/, 'Must be only digits')
						.min(8, 'Must be at least 8 digits')
						.required('Mobile is required'),
				})}
			>
				{(formik) => {
					const watchVaccines = formik.values.vaccines;
					const watch = formik.values;
					return (
						<>
							<h2 className='py-5 text-3xl font-semibold text-center text-green-600'>
								MEDICAL DECLARATION FORM FOR FOREIGN ENTRY
							</h2>
							<form className='col-span-12 p-5' onSubmit={formik.handleSubmit}>
								<div>
									<div className='mt-3'>
										<h4 className='text-xl font-bold'>Personal information:</h4>
										<InputForm
											name='username'
											id='username'
											label='Username'
											type='text'
											placeholder='Full name...'
											classnew='col-span-12'
										></InputForm>
									</div>
									<div className='grid grid-cols-12 gap-4'>
										<DropDownOut
											data={dropdownData}
											class='col-span-6'
											name='object'
											label='Object'
										></DropDownOut>
										<InputDateOut
											classnew='col-span-3'
											name='date'
											label='Date of birth'
										></InputDateOut>
										<DropDownOut
											data={dropdownGender}
											name='gender'
											label='Gender'
											class='col-span-3'
										></DropDownOut>
									</div>
									<div className='grid grid-cols-12 gap-4'>
										<DropDownOut
											data={countries}
											name='nationality'
											label='Nationality'
											class='col-span-6'
											height='h-[250px] overflow-y-scroll'
										></DropDownOut>
										<InputForm
											name='nationId'
											id='nationId'
											label='Nation ID or Passport ID'
											type='text'
											placeholder='Nation ID or Passport ID...'
											classnew='col-span-6'
										></InputForm>
									</div>
									{/* Travel: */}
									<div className='mt-3'>
										<h4 className='mb-3 text-xl font-bold'>Travel:</h4>
										<div className='flex items-center mb-3'>
											<h5 className='font-medium'>
												Do you travel in the last 14 days ?
											</h5>
											<Button
												type='button'
												className='text-[16px] font-normal text-black h-9 ml-5'
												bgColor='quaternary'
												full={false}
												onClick={handleAddmore}
											>
												Add more
											</Button>
										</div>
									</div>
									{/* {travel} */}
									<div>
										{dataTravel !== undefined &&
											dataTravel.length > 0 &&
											dataTravel.map((item, index) => (
												<div
													key={index}
													index={index}
													id={dataTravel[index].id}
												>
													<h5 className='font-bold text-blue-600'>
														Travel {(index += 1)}
													</h5>
													<div className='grid grid-cols-12 gap-4'>
														<InputDate
															index={index}
															classnew='col-span-6'
															name='departureDate'
															label='Departure Date'
															dataTravel={dataTravel}
															setDataTravel={setDataTravel}
															formik={formik}
															value={item.departureDate}
														></InputDate>
														<InputDate
															index={index}
															classnew='col-span-6'
															name='immigrationDate'
															label='Immigration Date'
															setDataTravel={setDataTravel}
															dataTravel={dataTravel}
															formik={formik}
															value={item.immigrationDate}
														></InputDate>
														<DropDownTravel
															index={index}
															data={countries}
															name='departure'
															label='Departure'
															class='col-span-6'
															height='h-[250px] overflow-y-scroll'
															setDataTravel={setDataTravel}
															dataTravel={dataTravel}
															chooseIndex={chooseIndex}
															formik={formik}
															value={item.departure}
														></DropDownTravel>
														<DropDownTravel
															index={index}
															data={countries}
															name='destination'
															label='Destination'
															class='col-span-6'
															height='h-[250px] overflow-y-scroll'
															setDataTravel={setDataTravel}
															dataTravel={dataTravel}
															formik={formik}
															value={item.destination}
														></DropDownTravel>
														<div className='col-span-6'>
															<div className='flex mb-7 gap-x-3'>
																<Button
																	type='button'
																	className='text-sm font-normal text-black'
																	bgColor='quaternary'
																	full={false}
																	onClick={handleAddmore}
																>
																	Add more
																</Button>
																<Button
																	type='button'
																	className='text-sm font-normal text-black'
																	bgColor='Tertiary'
																	// full={false}
																	onClick={() => handleDeletemore(index)}
																>
																	Delete
																</Button>
															</div>
														</div>
													</div>
												</div>
											))}
									</div>
									{/* Contact: */}
									<div className='mt-3'>
										<h4 className='mb-3 text-xl font-bold'>Contact:</h4>
										<div className='grid grid-cols-12 gap-4'>
											<DropDownOut
												data={citiesInVietnam}
												name='province'
												label='Province'
												class='col-span-6'
												height='h-[300px] overflow-y-scroll'
												formik={formik}
											></DropDownOut>
											<DropDown
												data={citiesInVietnam}
												name='district'
												label='District'
												class='col-span-6'
												height='h-[300px] overflow-y-scroll'
												formik={formik}
											></DropDown>
										</div>
									</div>
									<div className='grid grid-cols-12 gap-4'>
										<InputForm
											name='address'
											label='Address'
											type='text'
											placeholder='Address...'
											classnew='col-span-6'
										></InputForm>
										<InputForm
											name='email'
											label='Email'
											type='text'
											placeholder='Email...'
											classnew='col-span-3'
										></InputForm>
										<InputForm
											name='mobile'
											label='Mobile'
											type='text'
											placeholder='Mobile...'
											classnew='col-span-3'
										></InputForm>
									</div>
									{/* Symptoms: */}
									<div className='mt-3'>
										<h4 className='mb-3 text-xl font-bold'>Symptoms:</h4>
										<div className='grid grid-cols-12 gap-4'>
											<div className='col-span-5'>
												<p>Do you have any following symptoms?:</p>
											</div>
											<div className='col-span-7'>
												<div className='flex justify-around'>
													<Checkbox
														text='Fiber'
														name='symptoms'
														value='fiber'
														watch={watch}
														setValue={formik.setFieldValue}
													></Checkbox>
													<Checkbox
														text='Fever'
														name='symptoms'
														value='fever'
														watch={watch}
														setValue={formik.setFieldValue}
													></Checkbox>
													<Checkbox
														text='Sore throat'
														name='symptoms'
														value='sore throat'
														watch={watch}
														setValue={formik.setFieldValue}
													></Checkbox>
													<Checkbox
														text='Difficulty of breathing'
														name='symptoms'
														value='difficulty of breathing'
														watch={watch}
														setValue={formik.setFieldValue}
													></Checkbox>
												</div>
											</div>
										</div>
									</div>
									{/* Vaccines */}
									<div className='mt-3'>
										<h4 className='mb-3 text-xl font-bold'>Vaccines:</h4>
										<div className='grid grid-cols-12 gap-4'>
											<div className='col-span-5'>
												<p>Which one would you like to vaccinate ?:</p>
											</div>
											<div className='col-span-7'>
												<div className='flex justify-around'>
													<Radio
														name='vaccines'
														value='none'
														label='None'
														setValue={formik.setFieldValue}
														watchVaccines={watchVaccines}
													></Radio>
													<Radio
														name='vaccines'
														value='astra zenecca'
														label='Astra Zenecca'
														setValue={formik.setFieldValue}
														watchVaccines={watchVaccines}
													></Radio>
													<Radio
														name='vaccines'
														value='pfizer'
														label='Pfizer'
														setValue={formik.setFieldValue}
														watchVaccines={watchVaccines}
													></Radio>
													<Radio
														name='vaccines'
														value='moderna'
														label='Moderna'
														setValue={formik.setFieldValue}
														watchVaccines={watchVaccines}
													></Radio>
													<Radio
														name='vaccines'
														value='sinopharm'
														label='Sinopharm'
														setValue={formik.setFieldValue}
														watchVaccines={watchVaccines}
													></Radio>
												</div>
											</div>
										</div>
									</div>
									<div className='flex mt-10 mb-4 gap-x-2'>
										<Button type='submit' bgColor='primary' full={false}>
											Submit
										</Button>
										<Button
											onClick={() => navigate('/table')}
											type='button'
											bgColor='Tertiary'
											full={false}
										>
											Cancel
										</Button>
										<Button
											onClick={(e) => formik.resetForm()}
											type='button'
											bgColor='secondary'
											full={false}
										>
											Reset
										</Button>
									</div>
								</div>
							</form>
						</>
					);
				}}
			</Formik>
		</div>
	);
};

export default Form;
