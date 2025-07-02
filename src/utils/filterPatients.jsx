import patientProps from "./patientProps";
/**
	returns filtered patient list (copy)
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

/*
	sorts patients based on sort needed
	returns a shallow copy
*/
function sortPatients(patients, sorts) {

	const sorted = [...patients];
	
	if (sorts.familyName)
		sorted.sort((a, b) => (a.familyName.localeCompare(b.familyName)));
	if (sorts.givenName)
		sorted.sort((a,b) => (a.givenName.localeCompare(b.givenName)));
	if (sorts.sex)
		sorted.sort((a,b) => (a.sex.localeCompare(b.sex)));
	if (sorts.dateOfBirth)
		sorted.sort((a,b) => (new Date(a.dateOfBirth) - new Date(b.dateOfBirth)));
	// if (sorts.alarm) {
	// 	sorted.sort((a,b) => ();
	// }
	return (sorted);
};

export {filterPatients, sortPatients};
