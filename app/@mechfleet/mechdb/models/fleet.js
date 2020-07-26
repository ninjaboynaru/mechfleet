import Realm from 'realm';
import 'react-native-get-random-values'; // Need to import this for uuid to work'
import { v1 as uuidv1 } from 'uuid';
import { fleet as schema } from '../schemas';

export default (realm) => class Fleet extends Realm.Object {
	static get schema() { return schema }

	static getAll() {
		return realm.objects(schema.name);
	}

	static getById(id) {
		return realm.objectForPrimaryKey(schema.name, id);
	}

	static create({ id, name, description }) {
		realm.write(() => {
			let isUpdate = true;

			if (!id) {
				id = uuidv1();
				isUpdate = false;
			}

			realm.create(schema.name, { id, name, description }, isUpdate);
		});
	}

	static update(id, { name, description }) {
		Fleet.create({ id, name, description });
	}

	static delete(fleet) {
		realm.write(() => {
			realm.delete(fleet);
		});
	}
};
