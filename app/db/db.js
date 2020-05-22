import jsonata from 'jsonata';
import shortid from 'shortid';
import fsInterface from './fsInterface';

function getDataArrayIndex(dataArray, dataIdToFind) {
	const queryExpression = jsonata(`$#$i[_id='${dataIdToFind}'][0].$i`);
	return queryExpression.evaluate(dataArray);
}

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
	const assetIndex = getDataArrayIndex(assets, asset._id);
	assets[assetIndex] = asset;

	return fsInterface.writeAssetsFile(assets);
}

function saveNewTask(tasks, newTask) {
	const _id = shortid.generate();
	const task = { _id, ...newTask };

	tasks.push(task);
	return fsInterface.writeTasksFile(tasks);
}

function modifyTask(tasks, task) {
	const taskIndex = getDataArrayIndex(tasks, task._id);
	tasks[taskIndex] = task;

	return fsInterface.writeTasksFile(tasks);
}

function saveNewPart(parts, newPart) {
	const _id = shortid.generate();
	const part = { _id, ...newPart };

	parts.push(part);
	return fsInterface.writePartsFile(parts);
}

function modifyPart(parts, part) {
	const partIndex = getDataArrayIndex(parts, part._id);
	parts[partIndex] = part;

	return fsInterface.writePartsFile(parts);
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

	this.saveTask = function(task) {
		const isNewTask = !task._id;

		return this.getTasks().then((tasks) => {
			if (isNewTask === true) {
				return saveNewTask(tasks, task);
			}

			return modifyTask(tasks, task);
		});
	};

	this.savePart = function(part) {
		const isNewPart = !part._id;

		return this.getParts().then((parts) => {
			if (isNewPart === true) {
				return saveNewPart(parts, part);
			}

			return modifyPart(parts, part);
		});
	};

	this.deleteAsset = function(assetId) {
		return this.getAssets().then((assets) => {
			const assetIndex = getDataArrayIndex(assets, assetId);
			assets.splice(assetIndex, 1);

			return fsInterface.writeAssetsFile(assets);
		});
	};

	this.deleteTask = function(taskId) {
		return this.getTasks().then((tasks) => {
			const taskIndex = getDataArrayIndex(tasks, taskId);
			tasks.splice(taskIndex, 1);

			return fsInterface.writeTasksFile(tasks);
		});
	};

	this.deletePart = function(partId) {
		return this.getParts().then((parts) => {
			const partIndex = getDataArrayIndex(parts, partId);
			parts.splice(partIndex, 1);

			return fsInterface.writePartsFile(parts);
		});
	};
}();
