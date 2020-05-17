import fsInterface from './fsInterface';

const sampleAssets = [
	{
		_id: '1',
		name: 'Mech 1',
		model: 'V1',
		taskCount: 2
	},
	{
		_id: '2',
		name: 'Mech 2',
		model: 'V1',
		taskCount: 6
	}
];

export default new function db() {
	this.init = function() {
		return fsInterface.ensureFileIntegrity();
	};

	this.getAssets = function() {
		// let expandedAssets = sampleAssets.concat(sampleAssets);
		// expandedAssets = expandedAssets.concat(expandedAssets);
		// expandedAssets = expandedAssets.concat(expandedAssets);
		return Promise.resolve(sampleAssets);
	};
}();
