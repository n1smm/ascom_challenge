import axios from "axios";
// import "dotenv/config";


const api = axios.create({
	baseURL: 'https://mobile.digistat.it/CandidateApi',
	auth: {
		username: import.meta.env.VITE_API_USER,
		password: import.meta.env.VITE_API_PASS
	}
});

const getPatients = async () => {
		const response = await api.get('/Patient/GetList');
		console.log(response.data);
		return response.data;
};

const getPatient = async (id) => {
	const response = await api.get(`/Patient/Get/${id}`)
	console.log(response.data);
	return response.data;
}

const updatePatient = async (patient, values, paramId) => {
	if (paramId === -1)
		paramId = Number(patient.id);
	try {
	const modifiedPatient = {
		id: patient.id,
		familyName: values.familyName || patient.familyName,
		givenName: values.givenName || patient.givenName,
		birthDate: values.birthDate || patient.birthDate,
		sex: values.sex || patient.sex,
		parameters: [
			{
				id: paramId,
				name: values.parameters[paramId]?.name || patient.parameters[paramId]?.name,
				value: values.parameters[paramId]?.value || patient.parameters[paramId]?.value,
				alarm: values.parameters[paramId]?.alarm || patient.parameters[paramId]?.alarm
			}
		]
	}
	console.log("modifiedPatient:", JSON.stringify(modifiedPatient, null, 2));
	console.log("modifiedPatient:", JSON.stringify(modifiedPatient, null, 2));
	const response = await api.post("/Patient/Update", modifiedPatient, {
		headers: { "Content-Type": "application/json" }});
	console.log("put response", response.status, response.data);
	}
	catch (error) {
		console.error(error);
	}
}

export  {getPatients, getPatient, updatePatient};
