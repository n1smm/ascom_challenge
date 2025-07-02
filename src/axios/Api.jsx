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

export  {getPatients, getPatient};
