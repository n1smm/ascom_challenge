import axios from "axios";

const api = axios.create({
	baseURL: 'https://mobile.digistat.it/CandidateApi',
	auth: {
		username: 'test',
		password: 'TestMePlease!'
	}
});


const getPatients = async () => {
		const response = await api.get('/Patient/GetList');
		console.log(response.data);
		return response.data;
};


export  {getPatients};
