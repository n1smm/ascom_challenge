import {useState} from "react";

/**
	this takes care of showing a list of parameters of patient to select
	and all the content of this parameters
	it also handles potential editing of each parameter
*/
function ParameterList({parameters, edit, values, setValues, selectedParam, setSelectedParam}) {

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
		<div className="overflow-scroll">
			<select 
				value={selectedParam}
				onChange={(event) => setSelectedParam(Number(event.target.value))}
				className="border-[#ed1c24] text-[ed1c24]"
		>
		{parameters.map((param, idx) => (
			<option key={param.id ?? idx} value={idx}
				className="border-[#ed1c24] text-[ed1c24]"
			>
				{param.name ?? `Parameter ${idx}`}
			</option>
		))}
		</select>
		<div>
			{Object.entries(parameters[selectedParam]).map(([key, value]) => (
				<div key={key}>
					{!edit ?
						(<><strong className="text-[#ed1c224]">{key}:</strong> {String(value)}</>)
						:
						(<dl grid className="grid grid-cols-2 items-center w-full">
							<dt>{key}</dt>
							<dd><input
							placeholder={key === "alarm" ? "true/false" : value}
							name={key}
							value={values.parameters[selectedParam]?.[key] ?? value}
							onChange={handleChange}
							/>
							</dd>
						</dl>)
					}
				</div>
			))}
		</div>
		</div>
	)
}

export default ParameterList;
