import { useMemo, useState } from "react";

/**
	specific patient info for PatientRegister
	(different from expanded info of a patient)
*/
function Patient({patient, numParams, alarm}) {

	function changeAlarm(){
		!alarm;
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
