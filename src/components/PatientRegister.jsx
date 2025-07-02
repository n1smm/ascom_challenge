import { getPatients } from "../axios/Api";
import { useEffect, useState } from "react";
import {filterPatients, sortPatients} from "../utils/filterPatients";
import patientProps from "../utils/patientProps";
import Patient from "./Patient";
import Filters from "./Filters";
import DetailsView from "./DetailsView";

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

	TODO - caching has some bugs; but maybe they are jut based on how vite refreshes
			sometimes the the table doesn't load after changing certain parts of DOMS

*/
function PatientRegister({ onClose }) {
	const [patients, setPatients] = useState([]);
	const [filterPrompt, setFilterPrompt] = useState(false);
	const [detailView, setDetailView] = useState(null);
	const [filters, setFilters] = useState({
		familyName: "",
		givenName: "",
		sex: "",
		dateOfBirth: "",
		parameters: "",
		alarm: ""
	});
	const [sorts, setSorts] = useState({
		familyName: false,
		givenName: false,
		sex: false,
		dateOfBirth: false,
		parameters: false,
		alarm: false
	});

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
		console.log(detailView, "viewwww");
	}, [patients]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-100 z-70 pointer-events-none">
	  <div className="border-2 border-black  p-6 rounded bg-black w-3/4 h-2/3 shadow-lg pointer-events-auto">
		  <button className="items-start justify-end" onClick={onClose}>Close</button>
	  	  {detailView === null &&
			  <button className="items-start justify-end" onClick={toFilter}>Filter</button>
		  }
		  <div className="overflow-auto">
	  	  {detailView === null ? (
			  <table className="min-w-full border">
				<thead>
					{filterPrompt && 
						<Filters 
							filters={filters}
							setFilters={setFilters}
							sorts={sorts}
							setSorts={setSorts}
						/>
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
					{filterPatients(sortPatients(patients, sorts), filters).map((patient) => {
						const [numParams, alarm] = patientProps(patient);
						return <Patient 
							key={patient.id} 
							patient={patient} 
							numParams={numParams} 
							alarm={alarm}
							detailView={detailView}
							setDetailView={setDetailView}
							/> 
						})
					}
				</tbody>
			  </table> ) 
			  :
			  (<DetailsView id={detailView} setDetailView={setDetailView} /> )
		  }
	  	  </div>
	  </div>
	</div>
  )
}

export default PatientRegister;
