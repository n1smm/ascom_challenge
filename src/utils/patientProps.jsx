/**
	logic for checking alarm flag and number of params
*/
function patientProps(patient) {
	const numParams = patient.parameters.length;
	const alarm = patient.parameters.some((param) => (param.alarm === true));
	return [numParams, alarm];
};

export default patientProps;
