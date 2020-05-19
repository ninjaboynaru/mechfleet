import fs from 'react-native-fs';

const FLEET_DATA_DIRECTORY = `${fs.DocumentDirectoryPath}/fleet_data`;
const ASSETS_FILE_PATH = `${FLEET_DATA_DIRECTORY}/assets.json`;
const TASKS_FILE_PATH = `${FLEET_DATA_DIRECTORY}/tasks.json`;
const PARTS_FILE_PATH = `${FLEET_DATA_DIRECTORY}/parts.json`;

function ensureDataDirectory() {
	return fs.mkdir(FLEET_DATA_DIRECTORY);
}

function ensureFile(filePath) {
	return fs.exists(filePath).then((exists) => {
		if (exists === false) {
			return fs.writeFile(filePath, '', 'utf8');
		}
	});
}

function ensureAssetsFile() {
	return ensureFile(ASSETS_FILE_PATH);
}

function ensureTasksFile() {
	return ensureFile(TASKS_FILE_PATH);
}

function ensurePartsFile() {
	return ensureFile(PARTS_FILE_PATH);
}

function readFileJson(filePath) {
	return fs.readFile(filePath).then((fileContents) => JSON.parse(fileContents));
}

export default new function() {
	this.ensureFileIntegrity = function() {
		return ensureDataDirectory().then(ensureAssetsFile).then(ensureTasksFile).then(ensurePartsFile);
	};

	this.readAssetsFile = function() {
		return readFileJson(ASSETS_FILE_PATH);
	};

	this.readTasksFile = function() {
		return readFileJson(TASKS_FILE_PATH);
	};

	this.readPartsFile = function() {
		return readFileJson(PARTS_FILE_PATH);
	};

	this.writeAssetsFile = function(assetsArray) {
		const jsonString = JSON.stringify(assetsArray, null, 2);
		return fs.unlink(ASSETS_FILE_PATH).then(() => fs.writeFile(ASSETS_FILE_PATH, jsonString));
	};
}();
