import {useState} from "react";

function ParameterList({parameters, edit, values, setValues}) {
	const [selectedParam, setSelectedParam] = useState(0);

	// function handleChange(event) {
	// 	const { name, value } = event.target;
	// 	setValues((prev) => ({ ...prev.parameters, parameters: [[name]: value] }));
	// }
	function handleChange(event) {
		const { name, value } = event.target;
		const updatedParameters = [...values.parameters];
		updatedParameters[selectedParam] = {
			...parameters[selectedParam],
			...values.parameters[selectedParam],
			[name]: value
		};
		setValues({ ...values, parameters: updatedParameters });
	}

	if (!parameters || parameters.length === 0)
		return <span>No parameters</span>


	return (
		<div>
			<select 
				value={selectedParam}
				onChange={(event) => setSelectedParam(Number(event.target.value))}
		>
		{parameters.map((param, idx) => (
			<option key={param.id ?? idx} value={idx}>
				{param.name ?? `Parameter ${idx}`}
			</option>
		))}
		</select>
		<div>
			{Object.entries(parameters[selectedParam]).map(([key, value]) => (
				<div key={key}>
					{!edit ?
						(<><strong>{key}:</strong> {String(value)}</>)
						:
						(<input
							placeholder={key === "alarm" ? "true/false" : value}
							name={key}
							value={values.parameters[selectedParam]?.[key] ?? value}
							onChange={handleChange}
						/>)
					}
				</div>
			))}
		</div>

		</div>
	)
}

export default ParameterList;
