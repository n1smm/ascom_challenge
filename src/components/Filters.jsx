
/**
	sorting and filtering inputs

	filtering can be done by multiple params at the same time
	sorting not sure yet, how it behaves with multi-params - TODO
*/
function Filters({filters, setFilters, sorts, setSorts}) {
	return (
		<tr className="no-hover">
			<th className="border px-2 py-1">
				<input 
					className="w-full bg-gray-100 text-[#597d97]" placeholder="Family name" 
					value={filters.familyName}
					onChange={(event) => setFilters((filter) => ({...filter, familyName: event.target.value}))}
				/>
				<input type="checkbox" 
					checked={sorts.familyName} 
					onChange={() => setSorts({...sorts, familyName: !sorts.familyName})} 
				/>
			</th>
			<th className="border px-2 py-1">
				<input 
					className="w-full bg-gray-100 text-[#597d97]" placeholder="Given name" 
					value={filters.givenName}
					onChange={(event) => setFilters((filter) => ({...filter, givenName: event.target.value}))}
				/>
				<input type="checkbox" 
					checked={sorts.givenName} 
					onChange={() => setSorts({...sorts, givenName: !sorts.givenName})} 
				/>
			</th>
			<th className="border px-2 py-1">
				<input 
					className="w-full bg-gray-100 text-[#597d97]" placeholder="Sex" 
					value={filters.sex}
					onChange={(event) => setFilters((filter) => ({...filter, sex: event.target.value}))}
				/>
				<input type="checkbox" 
					checked={sorts.sex} 
					onChange={() => setSorts({...sorts, sex: !sorts.sex})} 
				/>
			</th>
			<th className="border px-2 py-1">
				<input 
					className="w-full bg-gray-100 text-[#597d97]" placeholder="Date of birth" 
					value={filters.dateOfBirth}
					onChange={(event) => setFilters((filter) => ({...filter, dateOfBirth: event.target.value}))}
				/>
				<input type="checkbox" 
					checked={sorts.dateOfBirth} 
					onChange={() => setSorts({...sorts, dateOfBirth: !sorts.dateOfBirth})} 
				/>
			</th>
			<th className="border px-2 py-1">
				<input 
					className="w-full bg-gray-100 text-[#597d97]" placeholder="Parameters" 
					value={filters.parameters}
					onChange={(event) => setFilters((filter) => ({...filter, parameters: event.target.value}))}
				/>
				<input type="checkbox" 
					className="peer ring-blue text-blue accent-[#597d97]"
					checked={sorts.parameters} 
					onChange={() => setSorts({...sorts, parameters: !sorts.parameters})} 
				/>
			</th>
			<th className="border px-2 py-1">
				<input 
					className="w-full bg-gray-100 text-[#597d97]" placeholder="Alarm" 
					value={filters.alarm}
					onChange={(event) => setFilters((filter) => ({...filter, alarm: event.target.value}))}
				/>
			</th>
		</tr>
	)
}

export default Filters;
