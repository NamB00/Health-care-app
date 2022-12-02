import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Form from './components/pages/Form';
import Table from './components/pages/Table';

function App() {
	const storageHealthCare = JSON.parse(localStorage.getItem('dataHealthCare'));
	// const [dataForm, setDataForm] = useState([]);
	const [dataForm, setDataForm] = useState([] || [storageHealthCare]);

	const [dataTravel, setDataTravel] = useState([]);
	const [chooseIndex, setChooseIndex] = useState('');

	const jsonData = JSON.stringify(dataForm);
	localStorage.setItem('dataHealthCare', jsonData);
	return (
		<Routes>
			<Route
				path='/'
				element={
					<Form
						setDataForm={setDataForm}
						dataForm={dataForm}
						dataTravel={dataTravel}
						setDataTravel={setDataTravel}
						chooseIndex={chooseIndex}
					></Form>
				}
			>
				<Route
					path='/edit/:slug'
					element={
						<Form
							setDataForm={setDataForm}
							dataForm={dataForm}
							dataTravel={dataTravel}
							setDataTravel={setDataTravel}
							chooseIndex={chooseIndex}
						></Form>
					}
				></Route>
			</Route>
			<Route
				path='/table'
				element={
					<Table
						setDataForm={setDataForm}
						dataForm={dataForm}
						setChooseIndex={setChooseIndex}
						setDataTravel={setDataTravel}
					></Table>
				}
			></Route>
		</Routes>
	);
}

export default App;
