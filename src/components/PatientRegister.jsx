import { getPatients } from "../axios/Api";
import Patient from "./Patient";
import { useEffect, useState } from "react";

/**
	component with basic table of patients (patient register)
	table params:
		- family name
		- given name
		- sex
		- date of birth
		- alarm (bool)
		-nr. of params
		- info (expand info of patient)
	has a cache that updates only roughly every 5min (faster sequential loading)
	in background it compares cache with fetched data to see, if it needs to refresh
*/
function PatientRegister({ onClose }) {
	const [patients, setPatients] = useState([]);
	const [filterPrompt, setFilterPrompt] = useState(false);

	//fetching patient data from cache or external API
	useEffect(() => {
		const fetchPatients = async () => {
			const cached = sessionStorage.getItem("Patients");
			const cachedData = cached ? JSON.parse(cached) : null;
			const lastCacheTime = Number(sessionStorage.getItem("patients_timestamp"));
			const now = Date.now();

			if (cached && lastCacheTime && (now - lastCacheTime < 500000)) {
				setPatients(cachedData);
			}

			try {
				const data = await getPatients();
				if (JSON.stringify(data) !== JSON.stringify(cachedData)) {
					setPatients(data);
					sessionStorage.setItem("Patients", JSON.stringify(data));
					sessionStorage.setItem("patients_timestamp", now.toString());
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchPatients();
	}, []);

	function toFilter() {
		setFilterPrompt(!filterPrompt);
	};

	//debug -- delete later
	useEffect(() => {
		console.log(patients[0]);
		console.log(patients[0]?.parameters);
	}, [patients]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-100 z-70 pointer-events-none">
	  <div className="border-2 border-black  p-6 rounded bg-black w-3/4 h-2/3 shadow-lg pointer-events-auto">
		  <button classname="items-start justify-end" onClick={onClose}>Close</button>
		  <button classname="items-start justify-end" onClick={toFilter}>Filter</button>
		  <div className="overflow-auto">
		  <table className="min-w-full border">
			<thead>
	  			{filterPrompt &&
					<tr>
						<th className="border px-2 py-1">
							<input className="w-full bg-gray-100 text-gray-500" placeholder="Family name" />
						</th>
						<th className="border px-2 py-1">
							<input className="w-full bg-gray-100 text-gray-500" placeholder="Given name" />
						</th>
						<th className="border px-2 py-1">
							<input className="w-full bg-gray-100 text-gray-500" placeholder="Sex" />
						</th>
						<th className="border px-2 py-1">
							<input className="w-full bg-gray-100 text-gray-500" placeholder="Date of birth" />
						</th>
						<th className="border px-2 py-1">
							<input className="w-full bg-gray-100 text-gray-500" placeholder="Parameters" />
						</th>
						<th className="border px-2 py-1">
							<input className="w-full bg-gray-100 text-gray-500" placeholder="Alarm" />
						</th>
						<th className="border px-2 py-1">
							<input className="w-full bg-gray-100 text-gray-500" placeholder="Info" />
						</th>
					</tr>
				}
				<tr>
					<th className="border px-2 py-1">Family name</th>
					<th className="border px-2 py-1">Given name</th>
					<th className="border px-2 py-1">Sex</th>
					<th className="border px-2 py-1">Date of birth</th>
					<th className="border px-2 py-1">Parameters</th>
					<th className="border px-2 py-1">Alarm</th>
					<th className="border px-2 py-1">Info</th>
				</tr>
			</thead>
	  		<tbody>
	  			{patients.map((patient) => (
					<Patient key={patient.id} patient={patient} /> ))
				}
	  		</tbody>
		  </table>
	  	  </div>
	  </div>
	</div>
  )
}

export default PatientRegister;
