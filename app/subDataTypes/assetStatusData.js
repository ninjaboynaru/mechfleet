const statusMap = [
	{
		value: 1,
		displayName: 'Online',
		color: 'green'
	},
	{
		value: 2,
		displayName: 'Offline',
		color: 'red'
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
