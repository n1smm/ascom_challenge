import { useState, useRef, useEffect } from 'react';
import './App.css';
import PatientRegister from './components/PatientRegister';
import Header from './components/Header';
import Canvas from './components/Canvas';
// import createOFModule from '/index.js';

function App() {
	const [OpenRegister, setOpenRegister] = useState(false);
	// const canvasRef = useRef(null);

	// useEffect(() => {
	// 	createOFModule().then(module => {
	// 		module.canvas = canvasRef.current;
	// 	});
	// },[]);




	return (
		<>
		  <div>
			<Header/>
			<div className="fixed top-0 left-0 w-full h-166 z-10 bg-gradient-to-r from-[#4b4b4b] to-white"/>
			<div className="fixed top-0 left-0 w-full h-164 z-15">
				<img 
					src="/hero-banner.png" 
					alt="banner; people looking at board"
					className="w-[105%] h-full object-cover" />
				
			</div>
			<button 
				onClick={() => setOpenRegister(OpenRegister => !OpenRegister)}
				className="absolute mt-[200px] z-50"
			>Patient register</button>
		  {OpenRegister && <PatientRegister className="border-2 border-solid" onClose={() => setOpenRegister(false)}/>}
		  </div>
		  <Canvas/>
		</>
	)
}

export default App
