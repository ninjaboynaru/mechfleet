const tagMap = [];
function defineFaultTag(value, displayName, color, iconType, iconName) {
	tagMap.push({
		value,
		displayName,
		color,
		icon: {
			type: iconType,
			name: iconName
		}
	});
}

defineFaultTag(-1, 'No Faults', '#5cb85c', 'Feather', 'check-circle');
defineFaultTag(1, 'Unknown', 'gray', 'AntDesign', 'question');
defineFaultTag(2, 'Other', 'gray', 'Feather', 'more-vertical');
defineFaultTag(3, 'Electrical', '#f0ad4e', 'Feather', 'zap-off');
defineFaultTag(4, 'Engine', 'black', 'MaterialCommunityIcons', 'engine-off');
defineFaultTag(5, 'Mechanical', 'purple', 'FontAwesome', 'gears');
defineFaultTag(6, 'HVAC', '#62B1F6', 'FontAwesome5', 'dice-d20');
defineFaultTag(7, 'Structural', '#5cb85c', 'MaterialCommunityIcons', 'grid-off');
defineFaultTag(8, 'Hydraulic', '#4659bd', 'FontAwesome5', 'water');
defineFaultTag(9, 'Cooling', '#5870f0', 'MaterialCommunityIcons', 'ice-cream');

function getTagData(tagValue) {
	for (const tagData of tagMap) {
		if (tagValue === tagData.value) {
			return tagData;
		}
	}
}

export default { getTagData, tagMap };
