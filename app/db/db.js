import jsonata from 'jsonata';
import fsInterface from './fsInterface';

function addTaskCountToAssets(assets) {
	return fsInterface.readTasksFile().then((tasks) => {
		for (const asset of assets) {
			const queryExpression = jsonata(`$count($[parentAsset='${asset._id}'])`);
			const taskCount = queryExpression.evaluate(tasks);
			asset.taskCount = taskCount;
		}

		return assets;
	});
}

export default new function db() {
	this.init = function() {
		return fsInterface.ensureFileIntegrity();
	};

	this.getAssets = function() {
		return fsInterface.readAssetsFile().then(addTaskCountToAssets);
	};

	this.getTasks = function() {
		return fsInterface.readTasksFile();
	};

	this.getAssetTasks = function(assetId) {
		return this.getTasks().then((tasks) => {
			const queryExpression = jsonata(`[$[parentAsset='${assetId}']]`);
			const matchingTasks = queryExpression.evaluate(tasks);
			return matchingTasks;
		});
	};
}();
