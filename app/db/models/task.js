import Ajv from 'ajv';
import jsonata from 'jsonata';
import shortid from 'shortid';
import fsInterface from '../fsInterface';
import helpers from '../helpers';

const schema = {
	type: 'object',
	additionalProperties: false,
	required: ['_id', 'createdOn', 'parentAsset'],
	properties: {
		_id: { type: 'string', minLength: 2 },
		parentAsset: { type: 'string', minLength: 2 },
		name: { type: 'string', default: '' },
		description: { type: 'string', default: '' },
		type: { type: 'integer', default: 1 },
		createdOn: { type: 'integer' },
		complete: { type: 'boolean', default: false },
		associatedParts: { type: 'array', default: [], items: { type: 'string' } }
	}
};

const validate = new Ajv({ useDefaults: true, removeAdditional: true }).compile(schema);

export default new function() {
	this.getTasks = function() {
		return fsInterface.readTasksFile();
	};

	this.getTask = function(taskId) {
		return this.getTasks().then((tasks) => helpers.getDocumentById(tasks, taskId));
	};

	this.getAssetTasks = function(parentAssetId, complete = false) {
		return this.getTasks().then((tasks) => {
			const queryExpression = jsonata(`[$[parentAsset='${parentAssetId}' and complete=${complete}]]`);
			const matchingTasks = queryExpression.evaluate(tasks);
			return matchingTasks;
		});
	};

	this.deleteTask = function(taskId) {
		return this.getTasks().then((tasks) => {
			const taskIndex = helpers.getDocumentIndexById(tasks, taskId);
			if (taskIndex === -1) {
				return;
			}

			tasks.splice(taskIndex, 1);
			return fsInterface.writeTasksFile(tasks);
		});
	};

	this.saveTask = function(task) {
		const isNewTask = !Object.prototype.hasOwnProperty.call(task, '_id');
		if (isNewTask === true) {
			task._id = shortid.generate();
		}

		const isValid = validate(task);
		if (isValid === false) {
			return Promise.reject(new Error('Invalid task object'));
		}

		return this.getTasks().then((tasks) => {
			if (isNewTask === true) {
				tasks.push(task);
			}
			else {
				const taskIndex = helpers.getDocumentIndexById(tasks, task._id);
				if (taskIndex === -1) {
					throw new Error(`Task with _id ${task._id} could not be found. Unable to modify task`);
				}
				tasks[taskIndex] = task;
			}


			return fsInterface.writeTasksFile(tasks);
		});
	};

	this.addPartToTask = function(taskId, partId) {
		return this.getTask(taskId).then((task) => {
			if (!task) {
				throw new Error(`Task with _id ${taskId} could not be found. Unable to add part to task`);
			}

			task.associatedParts.push(partId);
			return this.saveTask(task);
		});
	};

	this.removePartFromTask = function(taskId, partId) {
		return this.getTask(taskId).then((task) => {
			if (!task) {
				throw new Error(`Task with _id ${taskId} could not be found. Unable to remove part from task`);
			}

			const partIndex = task.associatedParts.indexOf(partId);

			if (partIndex === -1) {
				return;
			}

			task.associatedParts.splice(partId, 1);
			return this.saveTask(task);
		});
	};

	this.toggleTaskComplete = function(taskId) {
		return this.getTask(taskId).then((task) => {
			if (!task) {
				throw new Error(`Task with _id ${taskId} could not be found. Unable to change task complete status`);
			}

			task.complete = !task.complete;
			return this.saveTask(task);
		});
	};
}();
