const tagMap = [
	{
		value: -1,
		displayName: 'No Faults',
		color: '#5cb85c',
		icon: {
			type: 'Feather',
			name: 'check-circle'
		}
	},
	{
		value: 1,
		displayName: 'Unknown',
		color: 'gray',
		icon: {
			type: 'AntDesign',
			name: 'question'
		}
	},
	{
		value: 2,
		displayName: 'Electrical',
		color: '#f0ad4e',
		icon: {
			type: 'Feather',
			name: 'zap-off'
		}
	},
	{
		value: 3,
		displayName: 'Engine',
		color: 'black',
		icon: {
			type: 'MaterialCommunityIcons',
			name: 'engine-off'
		}
	},
	{
		value: 4,
		displayName: 'Mechanical',
		color: 'purple',
		icon: {
			type: 'FontAwesome',
			name: 'gears'
		}
	},
	{
		value: 5,
		displayName: 'HVAC',
		color: '#62B1F6',
		icon: {
			type: 'FontAwesome5',
			name: 'dice-d20'
		}
	},
	{
		value: 6,
		displayName: 'Structural',
		color: '#5cb85c',
		icon: {
			type: 'FontAwesome',
			name: 'building-o'
		}
	}
];

function getTagData(tagValue) {
	for (const tagData of tagMap) {
		if (tagValue === tagData.value) {
			return tagData;
		}
	}
}

export default { getTagData, tagMap };
