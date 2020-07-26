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
	},
	{
		value: 4,
		displayName: 'Other',
		color: 'gray'
	},
	{
		value: 5,
		displayName: 'Inspect',
		color: '#f0ad4e'
	},
	{
		value: 6,
		displayName: 'PMCS',
		color: '#5cb85c'
	},
	{
		value: 7,
		displayName: 'ToDo',
		color: '#8acb30'
	},
	{
		value: 8,
		displayName: 'Test',
		color: '#1e7393'
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
