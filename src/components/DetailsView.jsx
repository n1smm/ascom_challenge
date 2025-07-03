import { useState, useEffect } from "react";
import { getPatient } from "../axios/Api";
import ParameterList from "./ParameterList";



function DetailsView({id, setDetailView}) {
	const [patient, setPatient] = useState(null);
	const [edit, setEdit] = useState(false);
	const [values, setValues] = useState({
		familyName: "",
		givenName: "",
		birthDate: "",
		sex: "",
		parameters: [],
	});

	//fetch or cache retrieval
	useEffect(() => {
		const fetchPatient = async () => {
			const cached = sessionStorage.getItem("Patient");
			const cachedData = cached ? JSON.parse(cached) : null;
			const lastCacheTime = Number(sessionStorage.getItem("patient_timestamp"));
			const now = Date.now();

			if (cached && lastCacheTime && (now - lastCacheTime < 500000)) {
				setPatient(cachedData);
			}

			try {
				const data = await getPatient(id);
				if (JSON.stringify(data) !== JSON.stringify(cachedData)) {
					setPatient(data);
					sessionStorage.setItem("Patient", JSON.stringify(data));
					sessionStorage.setItem("patient_timestamp", now.toString());
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchPatient();
	}, [id]);

	function previousPage() {
		setDetailView(null);
	};

	async function applyChange() {
		setEdit(!edit);
		if (Notification.permission === "granted") {
			new Notification(`Patients
				${patient.familyName} ${patient.givenName} data has been updated`);
		}
		else {
			Notification.requestPermission().then((permission) => {
				if (permission === "granted") {
					new Notification(`Patients
						${patient.familyName} ${patient.givenName} 
						data has been updated!`,
						{
							body: `new data:
								${patient.familyName}
								${patient.givenName}
								${patient.birthDate}
								${patient.sex}
						`});
				}
			});
		}

	}	

	if (!patient)
		return (<p>...Loading</p>);

	return (
		<div>
		<button onClick={previousPage}>&lt;&lt;</button>
		{ !edit ?
			(<button onClick={() => setEdit(!edit)}>Edit</button>)
			:
			(<button onClick={() => applyChange()}>Apply</button>)
		}
		{ !edit ? (
			<dl className=" text-4xl grid grid-cols-2 gap-x-20 gap-y-8">
				<dt className="font-semibold text-right">Family name</dt>
				<dd className="text-left">{patient.familyName}</dd>

				<dt className="font-semibold text-right">Given name</dt>
				<dd className="text-left">{patient.givenName}</dd>

				<dt className="font-semibold text-right">Date of birth</dt>
				<dd className="text-left">{patient.birthDate}</dd>

				<dt className="font-semibold text-right">Sex</dt>
				<dd className="text-left">{patient.sex}</dd>

				<dt className="font-semibold text-right">Parameters</dt>
				<dd className="text-left">
					<ParameterList parameters={patient.parameters}/>
				</dd>
			</dl> )
			: (<DetailsEdit 
					patient={patient} 
					setValues={setValues}
					values={values}
					edit={edit}
				/>)
		}
		</div>
	)
}


function DetailsEdit({patient, setValues, values, edit}) {

	function handleChange(event) {
		const { name, value } = event.target;
		setValues((prev) => ({ ...prev, [name]: value }));
	}

	return (
		<dl className="text-4xl grid items-center grid-cols-2 gap-x-20 gap-y-8 w-full">
		  <dt className="font-semibold text-right">Family name</dt>
		  <dd>
			<input
			  name="familyName"
			  value={values.familyName}
			  placeholder={patient.familyName}
			  onChange={handleChange}
			  className="border px-2 py-1 w-full"
			/>
		  </dd>

		  <dt className="font-semibold text-right">Given name</dt>
		  <dd>
			<input
			  name="givenName"
			  value={values.givenName}
			  placeholder={patient.givenName}
			  onChange={handleChange}
			  className="border px-2 py-1 w-full"
			/>
		  </dd>

		  <dt className="font-semibold text-right">Date of birth</dt>
		  <dd>
			<input
			  type="date"
			  name="birthDate"
			  value={values.birthDate}
			  placeholder={patient.birthDate}
			  onChange={handleChange}
			  className="border px-2 py-1 w-full"
			/>
		  </dd>

		  <dt className="font-semibold text-right">Sex</dt>
		  <dd>
			<input
			  name="sex"
			  value={values.sex}
			  placeholder={patient.sex}
			  onChange={handleChange}
			  className="border px-2 py-1 w-full"
			/>
		  </dd>

		  <dt className="font-semibold text-right">Parameters</dt>
		  <dd>
				<ParameterList
					parameters={patient.parameters}
					edit={edit}
					values={values}
					setValues={setValues}
				/>
		  </dd>
			<dl>
				<dd>{values.familyName} </dd>
				<dd>{values.givenName} </dd>
				<dd>{values.sex} </dd>
				<dd>{values.birthDate}</dd>

			</dl>
		</dl>
	);
}

export default DetailsView;
