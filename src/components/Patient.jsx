import { useMemo, useState } from "react";
import { AlarmIcon, AlarmClockIcon } from "../utils/patientProps";

/**
	specific patient info for PatientRegister
	(different from expanded info of a patient)
*/
function Patient({patient, numParams, alarm, detailView, setDetailView}) {

	function changeAlarm(){
		!alarm;
	};

	const readableDate = new Date(patient.birthDate).toLocaleDateString();
	const sexCheck = patient.sex ? patient.sex : "X";
  return (
		<tr 
			onClick={() => (setDetailView(patient.id) && console.log(detailView))}
	  	>
			<td className="border px-2 py-1">{patient.familyName}</td>
			<td className="border px-2 py-1">{patient.givenName}</td>
			<td className="border px-2 py-1">{sexCheck}</td>
			<td className="border px-2 py-1">{readableDate}</td>
			<td className="border px-2 py-1">{numParams}</td>
			<td className="border px-2 py-1" onClick={changeAlarm}>{alarm ? <AlarmIcon/> : <AlarmClockIcon/>}</td>
		</tr>
  )
}

export default Patient
