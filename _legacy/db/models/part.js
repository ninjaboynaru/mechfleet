import Ajv from 'ajv';
import jsonata from 'jsonata';
import shortid from 'shortid';
import fsInterface from '../fsInterface';
import helpers from '../helpers';

const schema = {
	type: 'object',
	additionalProperties: false,
	required: ['_id'],
	properties: {
		_id: { type: 'string', minLength: 2 },
		name: { type: 'string', default: '' },
		noun: { type: 'string', default: '' },
		nsn: { type: 'string', default: '' }
	}
};

const validate = new Ajv({ useDefaults: true, removeAdditional: true }).compile(schema);

export default new function() {
	this.getParts = function() {
		return fsInterface.readPartsFile();
	};

	this.getPart = function(partId) {
		return this.getParts().then((parts) => helpers.getDocumentById(parts, partId));
	};

	this.getPartsById = function(partIds) {
		return this.getParts().then((parts) => {
			const queryExpression = jsonata('[$[_id in $partIds]]');
			queryExpression.assign('partIds', partIds);

			const matchingParts = queryExpression.evaluate(parts);
			return matchingParts;
		});
	};

	this.deletePart = function(partId) {
		return this.getParts().then((parts) => {
			const partIndex = helpers.getDocumentIndexById(parts, partId);
			if (partIndex === -1) {
				return;
			}

			parts.splice(partIndex, 1);
			return fsInterface.writePartsFile(parts);
		});
	};

	this.savePart = function(part) {
		const isNewPart = !Object.prototype.hasOwnProperty.call(part, '_id');
		if (isNewPart === true) {
			part._id = shortid.generate();
		}

		const isValid = validate(part);
		if (isValid === false) {
			return Promise.reject(new Error('Invalid part object'));
		}

		return this.getParts().then((parts) => {
			if (isNewPart === true) {
				parts.push(part);
			}
			else {
				const partIndex = helpers.getDocumentIndexById(parts, part._id);
				if (partIndex === -1) {
					throw new Error(`Part with _id ${part._id} could not be found. Unable to modify part`);
				}
				parts[partIndex] = part;
			}

			return fsInterface.writePartsFile(parts);
		});
	};
}();
