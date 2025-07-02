import { getPatient } from "../axios/Api";
import { useState, useEffect } from "react";



function DetailsView({id, setDetailView}) {
	const [patient, setPatient] = useState(null);
	const [edit, setEdit] = useState(false);

	//fetch or cache retrival
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

	if (!patient)
		return (<p>...Loading</p>);

	return (
		<div>
		<button onClick={previousPage}>&lt;&lt;</button>
		{ !edit ?
			(<button onClick={() => setEdit(!edit)}>Edit</button>)
			:
			(<button onClick={() => setEdit(!edit)}>Apply</button>)
		}
		{ !edit ? (
			<dl className=" text-4xl grid grid-cols-2 gap-x-4 gap-y-8">
				<dt className="font-semibold text-right">Family name</dt>
				<dd>{patient.familyName}</dd>

				<dt className="font-semibold text-right">Given name</dt>
				<dd>{patient.givenName}</dd>

				<dt className="font-semibold text-right">Date of birth</dt>
				<dd>{patient.birthDate}</dd>

				<dt className="font-semibold text-right">Sex</dt>
				<dd>{patient.sex}</dd>

				<dt className="font-semibold text-right">Parameters</dt>
				<dd>foo</dd>
			</dl> )
			: (<DetailsEdit patient={patient}/>)
		}
		</div>
	)
}


function DetailsEdit(patient) {
	const [values, setValues] = useState({
		familyName: patient.familyName || "",
		givenName: patient.givenName || "",
		birthDate: patient.birthDate || "",
		sex: patient.sex || "",
		parameters: "",
	});

	function handleChange(e) {
		const { name, value } = e.target;
		setValues((prev) => ({ ...prev, [name]: value }));
		if (onChange) onChange({ ...values, [name]: value });
	}

	return (
		<dl className="text-4xl grid grid-cols-2 gap-x-4 gap-y-8">
		  <dt className="font-semibold text-right">Family name</dt>
		  <dd>
			<input
			  name="familyName"
			  value={values.familyName}
			  placeholder={patient.familyName}
			  onChange={handleChange}
			  className="border px-2 py-1"
			/>
		  </dd>

		  <dt className="font-semibold text-right">Given name</dt>
		  <dd>
			<input
			  name="givenName"
			  value={values.givenName}
			  placeholder={patient.givenName}
			  onChange={handleChange}
			  className="border px-2 py-1"
			/>
		  </dd>

		  <dt className="font-semibold text-right">Date of birth</dt>
		  <dd>
			<input
			  name="birthDate"
			  value={values.birthDate}
			  placeholder={patient.birthDate}
			  onChange={handleChange}
			  className="border px-2 py-1"
			/>
		  </dd>

		  <dt className="font-semibold text-right">Sex</dt>
		  <dd>
			<input
			  name="sex"
			  value={values.sex}
			  placeholder={patient.sex}
			  onChange={handleChange}
			  className="border px-2 py-1"
			/>
		  </dd>

		  <dt className="font-semibold text-right">Parameters</dt>
		  <dd>
			<input
			  name="parameters"
			  value={values.parameters}
			  placeholder="foo"
			  onChange={handleChange}
			  className="border px-2 py-1"
			/>
		  </dd>
		</dl>
	);
}

export default DetailsView;
