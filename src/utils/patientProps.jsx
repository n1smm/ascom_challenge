/**
	logic for checking alarm flag and number of params
*/
function patientProps(patient) {
	const numParams = patient.parameters.length;
	const alarm = patient.parameters.some((param) => (param.alarm === true));
	return [numParams, alarm];
};

function AlarmIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width={20} height={20} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
    </svg>
  );
}

function AlarmClockIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width={20} height={20} {...props}>
      <path d="M12 22a7 7 0 100-14 7 7 0 000 14zm1-7V9h-2v7h5v-2h-3zm7.03-10.39l-1.42-1.42-3.18 3.18 1.42 1.42 3.18-3.18zM4.39 3.61L3 5.03l3.18 3.18 1.42-1.42L4.39 3.61z"/>
    </svg>
  );
}


export  {patientProps, AlarmIcon, AlarmClockIcon};
