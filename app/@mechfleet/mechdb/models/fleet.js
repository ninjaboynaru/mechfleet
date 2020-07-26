import 'react-native-get-random-values'; // Need to import this for uuid to work'
import { v1 as uuidv1 } from 'uuid';
import { fleet as schema } from '../schemas';

export default (realm) => new function() {
	this.getAll = function() {
		return realm.objects(schema.name).snapshot();
	};

	this.create = function({ name, description }) {
		realm.write(() => {
			realm.create(schema.name, { id: uuidv1(), name, description });
		});
	};
}();
