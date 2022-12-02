import React from 'react';
import Button from '../FormDetail/Button';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const Table = ({ dataForm, setDataForm, setChooseIndex, setDataTravel }) => {
	const [searchTerm, setSearchItem] = useState('');
	const [currentPage, SetCurrentPage] = useState(1);
	const [postPerPage, SetPostPerPage] = useState(2);
	const searchTable = () => {};
	const oldValue = {
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
		id: '',
	};
	let dataUniq = [...new Map(dataForm.map((v) => [v.id, v])).values()];
	useEffect(() => {
		setDataForm(dataUniq);
	}, [currentPage]);
	let idSlug = undefined;
	const navigate = useNavigate();
	const handleEdit = (e) => {
		idSlug = e.target.id;
		setChooseIndex(e.target.getAttribute('index'));
		dataForm.map((item) => {
			if (Number(item.id) === Number(idSlug)) {
				oldValue.username = item.username;
				oldValue.travel = item.travel;
				oldValue.object = item.object;
				oldValue.date = item.date;
				oldValue.gender = item.gender;
				oldValue.nationality = item.nationality;
				oldValue.nationId = item.nationId;
				oldValue.province = item.province;
				oldValue.district = item.district;
				oldValue.address = item.address;
				oldValue.email = item.email;
				oldValue.mobile = item.mobile;
				oldValue.symptoms = item.symptoms;
				oldValue.vaccines = item.vaccines;
				oldValue.id = item.id;
			}
			// else {
			// 	oldValue.username = '';
			// 	// oldValue.travel = [];
			// 	oldValue.object = '';
			// 	oldValue.date = '';
			// 	oldValue.gender = '';
			// 	oldValue.nationality = '';
			// 	oldValue.nationId = '';
			// 	oldValue.province = '';
			// 	oldValue.district = '';
			// 	oldValue.address = '';
			// 	oldValue.email = '';
			// 	oldValue.mobile = '';
			// 	oldValue.symptoms = '';
			// 	oldValue.vaccines = 'none';
			// 	oldValue.id = Date.now();
			// }
		});
		setDataTravel(dataForm[e.target.getAttribute('index') - 1]?.travel);
	};
	const handleNewform = () => {
		setDataTravel([]);
		navigate('/');
	};
	const handleDelete = (e) => {
		idSlug = e.target.getAttribute('id');
		let arrDelete = [];
		dataForm.map((item) => {
			if (item.id !== Number(idSlug)) {
				arrDelete.push(item);
				setDataForm(arrDelete);
			}
		});
		if (dataForm.length === 1) {
			arrDelete = [];
			setDataForm(arrDelete);
		}
	};
	const handleFilter = (val) => {
		if (searchTerm === '') {
			return val;
		} else if (
			val.username
				.toString()
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			val.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
			val.object.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
			val.province.toString().toLowerCase().includes(searchTerm.toLowerCase())
		) {
			return val;
		}
	};
	// pagination
	const indexOfLastPost = currentPage * postPerPage;
	const indexOfFirstPost = indexOfLastPost - postPerPage;
	const currentPosts = dataForm.slice(indexOfFirstPost, indexOfLastPost);
	const paginate = (pageNumber) => {
		if (pageNumber <= 0 || pageNumber > currentPosts.length + 1) return;
		SetCurrentPage(pageNumber);
	};
	const handleItemsPage = (e) => {
		SetPostPerPage(e.target.value);
		SetCurrentPage(1);
	};
	return (
		<div>
			<h2 className='py-5 text-3xl font-semibold text-center text-dark-600'>
				Vietnam Health Declaration for foreign entry
			</h2>
			<div className='flex justify-between'>
				<div className='pb-4 bg-white dark:bg-gray-900'>
					<label htmlFor='table-search' className='sr-only'>
						Search
					</label>
					<div className='relative mt-1'>
						<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
							<svg
								className='w-5 h-5 text-gray-500 dark:text-gray-400'
								aria-hidden='true'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
									clipRule='evenodd'
								></path>
							</svg>
						</div>
						<input
							type='text'
							id='table-search'
							className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Search for items'
							onChange={(e) => searchTable(setSearchItem(e.target.value))}
						/>
					</div>
				</div>
				<Button
					type='btn'
					full={false}
					className='text-base h-[40px] font-normal '
					onClick={handleNewform}
				>
					NewForm
				</Button>
			</div>
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
				<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
					<thead className='text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='p-2'>
								<div className='flex items-center text-base font-semibold text-gray-900'>
									#
								</div>
							</th>
							<th scope='col' className='px-5 py-3'>
								Form ID
							</th>
							<th scope='col' className='px-5 py-3'>
								Full Name
							</th>
							<th scope='col' className='px-5 py-3'>
								Object
							</th>
							<th scope='col' className='px-5 py-3'>
								Date Of Birth
							</th>
							<th scope='col' className='px-5 py-3'>
								Gender
							</th>
							<th scope='col' className='px-5 py-3'>
								Contact Province
							</th>
							<th scope='col' className='px-5 py-3'>
								Action
							</th>
						</tr>
					</thead>
					{currentPosts.length > 0 &&
						currentPosts
							.filter((val) => handleFilter(val))
							.map((item, index) => (
								<tbody key={index} index={index}>
									<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
										<td className='w-2 p-2'>
											<div className='flex items-center text-gray-900'>
												{(index += 1)}
											</div>
										</td>
										<th
											scope='row'
											className='px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
										>
											{item.id}
										</th>
										<td className='px-5 py-4'>{item.username}</td>
										<td className='px-5 py-4'>{item.object}</td>
										<td className='px-5 py-4'>{item.date}</td>
										<td className='px-5 py-4'>{item.gender}</td>
										<td className='px-5 py-4'>{item.district}</td>
										<td className='flex items-center px-5 py-4 space-x-3'>
											<Link
												to={`/edit/${item.id}`}
												className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
												id={item.id}
												index={index}
												onClick={handleEdit}
											>
												Edit
											</Link>
											<Link
												href='#'
												className='font-medium text-red-600 dark:text-red-500 hover:underline'
												id={item.id}
												index={index}
												onClick={handleDelete}
											>
												Remove
											</Link>
										</td>
									</tr>
								</tbody>
							))}
				</table>
			</div>
			<div className='flex justify-center mt-7'>
				<nav aria-label='Page navigation example' className='mt-[10px]'>
					<ul className='inline-flex -space-x-px'>
						<li>
							<a
								href='#'
								className='px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
								onClick={() => paginate(currentPage - 1)}
							>
								Previous
							</a>
						</li>
						<li>
							<a
								href='#'
								className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
							>
								{currentPage}
							</a>
						</li>
						<li>
							<a
								href='#'
								className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
								onClick={() => paginate(currentPage + 1)}
							>
								Next
							</a>
						</li>
					</ul>
				</nav>
				<nav className='mt-[2px] ml-5 flex items-center justify-center'>
					<select
						id='Items'
						className='w-full px-3 py-[7px] transition-all bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500 mr-2'
						onChange={handleItemsPage}
					>
						<option value='2'>2</option>
						<option value='4'>4</option>
						<option value='6'>6</option>
					</select>
					<span>Items/Page</span>
				</nav>
			</div>
		</div>
	);
};

export default Table;
