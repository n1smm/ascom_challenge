import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import PatientRegister from './components/PatientRegister';

function App() {
	const [OpenRegister, setOpenRegister] = useState(false);



	return (
		<>
		  <div>
			<button 
				onClick={() => setOpenRegister(OpenRegister => !OpenRegister)}
			
			>Patient register</button>
		  {OpenRegister && <PatientRegister className="border-2 border-solid" onClose={() => setOpenRegister(false)}/>}
		  </div>
		</>
	)
}

export default App
