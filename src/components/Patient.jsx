import { useMemo, useState } from "react";

/**
	specific patient info for PatientRegister
	(different from expanded info of a patient)
*/
function Patient({patient}) {
	const [alarm, setAlarm] = useState(false);

	const numParams = useMemo(() => (
		patient.parameters.length), [patient.parameters]);

	const hasAlarm = useMemo(() => {
		const alarmCheck = patient.parameters.some((param) => (param.alarm === true));
		setAlarm(alarmCheck);
		return alarmCheck;
	}, [patient.parameters]);

	function changeAlarm(){
		setAlarm(!alarm);
	};



	const readableDate = new Date(patient.birthDate).toLocaleDateString();
	const sexCheck = patient.sex ? patient.sex : "X";
  return (
		<tr>
			<td className="border px-2 py-1">{patient.familyName}</td>
			<td className="border px-2 py-1">{patient.givenName}</td>
			<td className="border px-2 py-1">{sexCheck}</td>
			<td className="border px-2 py-1">{readableDate}</td>
			<td className="border px-2 py-1">{numParams}</td>
			<td className="border px-2 py-1" onClick={changeAlarm}>{alarm ? "yes" : "no"}</td>
			<td className="border px-2 py-1">0</td>
		</tr>
  )
}

export default Patient
