import {useState} from "react";

function ParameterList({parameters, edit, values, setValues}) {
	const [selectedParam, setSelecetedParam] = useState(0);

	if (!parameters || parameters.length === 0)
		return <span>No parameters</span>


			return (
				<div>
					<select 
						value={selectedParam}
						onChange={(event) => setSelecetedParam(Number(event.target.value))}
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
									placeholder={value}
									value={values.parameters}
								/>)
							}
						</div>
					))}
				</div>

				</div>
			)
}

export default ParameterList;
