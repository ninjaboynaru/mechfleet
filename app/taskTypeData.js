const typeMap = [
	{
		value: 1,
		displayName: 'Install',
		color: 'blue'
	},
	{
		value: 2,
		displayName: 'Troubleshoot',
		color: 'green'
	},
	{
		value: 3,
		displayName: 'Service',
		color: 'yellow'
	}
];

function getTypeData(typeValue) {
	for (const typeData of typeMap) {
		if (typeValue === typeData.value) {
			return typeData;
		}
	}
}

export default { getTypeData, typeMap };
