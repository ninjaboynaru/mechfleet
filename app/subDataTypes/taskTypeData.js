const typeMap = [
	{
		value: 1,
		displayName: 'Install',
		color: '#3F51B5'
	},
	{
		value: 2,
		displayName: 'Troubleshoot',
		color: '#d9534f'
	},
	{
		value: 3,
		displayName: 'Service',
		color: '#62B1F6'
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
