import patientProps from "./patientProps";
/**
	returns filtered patient list
*/
function filterPatients(patients, filters) {
	const filteredPatients = patients.filter((patient) => {
		const readableDate = new Date(patient.birthDate).toLocaleDateString();
		const [numParams, alarm] = patientProps(patient);

		const matchFamily = 
			!filters.familyName ||
			(patient.familyName && patient.familyName.toLowerCase().includes(filters.familyName.toLowerCase()));
		const matchGiven = 
			!filters.givenName ||
			(patient.givenName && patient.givenName.toLowerCase().includes(filters.givenName.toLowerCase()));
		const matchSex = 
			!filters.sex ||
			(patient.sex && patient.sex.toLowerCase().includes(filters.sex.toLowerCase()));
		const matchBirth = 
			!filters.dateOfBirth ||
			(readableDate && String(readableDate).includes(filters.dateOfBirth));

		const matchParam = 
			!filters.parameters ||
			(numParams > 0 && String(numParams).includes(filters.parameters));

		const matchAlarm = 
			!filters.alarm ||
			(alarm && filters.alarm.toLowerCase() === "yes");

		return (
			matchAlarm &&
			matchParam &&
			matchSex &&
			matchBirth &&
			matchGiven &&
			matchFamily);
	});
	return filteredPatients;
}

export default filterPatients
