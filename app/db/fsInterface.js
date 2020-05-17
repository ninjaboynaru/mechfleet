import fs from 'react-native-fs';

const fleetDataDirectory = `${fs.DocumentDirectoryPath}/fleet_data`;
const assetsFilePath = `${fleetDataDirectory}/assets.json`;
const tasksFilePath = `${fleetDataDirectory}/tasks.json`;
const partsFilePath = `${fleetDataDirectory}/parts.json`;

function ensureDataDirectory() {
	return fs.mkdir(fleetDataDirectory);
}

function ensureFile(filePath) {
	return fs.exists(filePath).then((exists) => {
		if (exists === false) {
			return fs.writeFile(filePath, '', 'utf8');
		}
	});
}

function ensureAssetsFile() {
	return ensureFile(assetsFilePath);
}

function ensureTasksFile() {
	return ensureFile(tasksFilePath);
}

function ensurePartsFile() {
	return ensureFile(partsFilePath);
}

export default new function() {
	this.ensureFileIntegrity = function() {
		return ensureDataDirectory().then(ensureAssetsFile).then(ensureTasksFile).then(ensurePartsFile);
	};
}();
