/* eslint-disable import/no-cycle */
import Ajv from 'ajv';
import jsonata from 'jsonata';
import shortid from 'shortid';
import fsInterface from '../fsInterface';
import taskModel from './task';
import helpers from '../helpers';

const schema = {
	type: 'object',
	additionalProperties: false,
	required: ['_id'],
	properties: {
		_id: { type: 'string', minLength: 2 },
		name: { type: 'string', default: '' },
		model: { type: 'string', default: '' },
		noun: { type: 'string', default: '' },
		notes: { type: 'string', default: '' },
		status: { type: 'integer', default: 1 },
		faultTags: { type: 'array', default: [], items: { type: 'integer' } }
	}
};

const validate = new Ajv({ useDefaults: true, removeAdditional: true }).compile(schema);

function appendTaskCountsToAssets(assets) {
	return taskModel.getTasks().then((tasks) => {
		for (const asset of assets) {
			const queryExpression = jsonata(`$count($[parentAsset='${asset._id}' and complete=false])`);
			const taskCount = queryExpression.evaluate(tasks);
			asset.taskCount = taskCount;
		}

		return assets;
	});
}

export default new function() {
	this.getAssets = function(appendTaskCounts) {
		return fsInterface.readAssetsFile().then((assets) => {
			if (appendTaskCounts === true) {
				return appendTaskCountsToAssets(assets);
			}

			return assets;
		});
	};

	this.getAsset = function(assetId, appendTaskCounts) {
		return this.getAssets(appendTaskCounts).then((assets) => helpers.getDocumentById(assets, assetId));
	};

	this.deleteAsset = function(assetId) {
		return this.getAssets().then((assets) => {
			const assetIndex = helpers.getDocumentIndexById(assets, assetId);
			if (assetIndex === -1) {
				return;
			}

			assets.splice(assetIndex, 1);
			return fsInterface.writeAssetsFile(assets);
		});
	};

	this.saveAsset = function(asset) {
		const isNewAsset = !Object.prototype.hasOwnProperty.call(asset, '_id');
		if (isNewAsset === true) {
			asset._id = shortid.generate();
		}

		const isValid = validate(asset);
		if (isValid === false) {
			return Promise.reject(new Error('Invalid asset object'));
		}

		return this.getAssets().then((assets) => {
			if (isNewAsset === true) {
				assets.push(asset);
			}
			else {
				const assetIndex = helpers.getDocumentIndexById(assets, asset._id);

				if (assetIndex === -1) {
					return new Error(`Asset with _id ${asset._id} could not be found. Unable to modify asset`);
				}
				assets[assetIndex] = asset;
			}


			return fsInterface.writeAssetsFile(assets);
		});
	};
}();
