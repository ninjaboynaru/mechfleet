const statusMap = [
	{
		value: 1,
		displayName: 'Online',
		color: 'green'
	},
	{
		value: 2,
		displayName: 'Ofline',
		color: 'red'
	},
	{
		value: 3,
		displayName: 'Online w Faults',
		color: 'purple'
	}
];

function getStatusData(statusValue) {
	for (const statusData of statusMap) {
		if (statusValue === statusData.value) {
			return statusData;
		}
	}
}

export default { getStatusData, statusMap };
