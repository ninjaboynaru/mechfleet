import jsonata from 'jsonata';
import shortid from 'shortid';
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

function saveNewAsset(assets, newAsset) {
	const _id = shortid.generate();
	const asset = { _id, ...newAsset };

	assets.push(asset);
	return fsInterface.writeAssetsFile(assets);
}

function modifyAsset(assets, asset) {
	const queryExpression = jsonata(`$#$i[_id='${asset._id}'][0].$i`);
	const assetIndex = queryExpression.evaluate(assets);

	assets[assetIndex] = asset;

	return fsInterface.writeAssetsFile(assets);
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

	this.getParts = function() {
		return fsInterface.readPartsFile();
	};

	this.getAssetTasks = function(assetId) {
		return this.getTasks().then((tasks) => {
			const queryExpression = jsonata(`[$[parentAsset='${assetId}']]`);
			const matchingTasks = queryExpression.evaluate(tasks);
			return matchingTasks;
		});
	};

	this.getPartsById = function(partIds) {
		return this.getParts().then((parts) => {
			const queryExpression = jsonata('[$[_id in $partIds]]');
			queryExpression.assign('partIds', partIds);

			const matchingParts = queryExpression.evaluate(parts);
			return matchingParts;
		});
	};

	this.saveAsset = function(asset) {
		const isNewAsset = !asset._id;

		return this.getAssets().then((assets) => {
			if (isNewAsset === true) {
				return saveNewAsset(assets, asset);
			}

			return modifyAsset(assets, asset);
		});
	};
}();
