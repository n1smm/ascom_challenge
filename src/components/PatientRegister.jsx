import { getPatients } from "../axios/Api";
import { useEffect, useState } from "react";
import {filterPatients, sortPatients} from "../utils/filterPatients";
import {patientProps} from "../utils/patientProps";
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

	patients - where fetched patients data is stored
	loading,filterPrompt,detailView - UI changes of the register window
	filters - saves data to filter register by
	sorts - checks if sth needs to be sorted
*/
function PatientRegister({ onClose }) {
	const [loading, setLoading] = useState(true);
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
				setLoading(false);
				sessionStorage.setItem("Patients", JSON.stringify(data));
				sessionStorage.setItem("patients_timestamp", now.toString());
			}
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		setLoading(false);
		fetchPatients();
	}, []);

	async function refresh() {
		try{
			const now = Date.now();
			const data = await getPatients();
			setPatients(data);
			setLoading(false);
			sessionStorage.setItem("Patients", JSON.stringify(data));
			sessionStorage.setItem("patients_timestamp", now.toString());
		}
		catch (error) {
			console.error(error);
		}
	}


	function toFilter() {
		setFilterPrompt(!filterPrompt);
	};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-100 z-70 pointer-events-none">
	  <div className="border-[#ed1c24] bg-white border-4  p-6 rounded-2xl text-[#333333] w-3/4 h-2/3 shadow-lg pointer-events-auto overflow-hidden">
	  <div className=" flex items-center pt-4 justify-between w-full">
			  <button className="items-start justify-start pl-10" onClick={refresh}>Refresh</button>
			  <button className="items-start justify-end" onClick={onClose}>Close</button>
			  {detailView === null &&
				  <button className="items-start justify-end" onClick={toFilter}>Filter</button>
			  }
	  </div>
	  {loading ?
		  (<span>Loading...</span>)
		  :
		  (<div className=" overflow-auto table-center pt-10 h-[80%] rounded-2xl">
	  	  {detailView === null ? (
			  <table className="min-w-full items-center overflow-auto rounded-2xl">
				<thead className="rounded-2xl">
					{filterPrompt && 
						<Filters 
							filters={filters}
							setFilters={setFilters}
							sorts={sorts}
							setSorts={setSorts}
						/>
					}
					<tr className="no-hover">
						<th className="border rounded-tl-2xl px-2 py-1">Family name</th>
						<th className="border px-2 py-1">Given name</th>
						<th className="border px-2 py-1">Sex</th>
						<th className="border px-2 py-1">Date of birth</th>
						<th className="border px-2 py-1">Parameters</th>
						<th className="border px-2 py-1">Alarm</th>
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
	  	  </div>)
	  }
	  </div>
	</div>
  )
}

export default PatientRegister;
