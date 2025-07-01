import { getPatients } from "../axios/Api";
import { useEffect, useState } from "react";

function PatientRegister({ onClose }) {
	const [patients, setPatients] = useState([]);

	useEffect(() => {
		const fetchPatients = async () => {
			try {
				const data = await getPatients();
				setPatients(data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchPatients();
	}, []);

	useEffect(() => {
		console.log(patients[0]);
		console.log(patients[0]?.parameters);
	}, [patients]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-100 z-70 pointer-events-none">
	  <div className="border-2 border-black  p-6 rounded w-3/4 h-2/3 shadow-lg pointer-events-auto">
		  <button classname="items-start justify-end" onClick={onClose}>Close</button>
		  <table className="min-w-full border">
			<thead>
				<tr>
					<th className="border px-2 py-1"></th>
					<th className="border px-2 py-1"></th>
					<th className="border px-2 py-1"></th>
					<th className="border px-2 py-1"></th>
				</tr>
			</thead>
	  		<tbody>
	  			<tr>
	  				<td className="border px-2 py-1"></td>
	  				<td className="border px-2 py-1"></td>
	  				<td className="border px-2 py-1"></td>
	  				<td className="border px-2 py-1"></td>
	  			</tr>
	  		</tbody>
		  </table>
	  </div>
	</div>
  )
}

export default PatientRegister;
