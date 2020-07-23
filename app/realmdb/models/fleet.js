// import uuid from 'react-native-uuid';
import { fleet as schema } from '../schemas';

export default (realm) => new function() {
	this.getAll = function() {
		return realm.objects(schema.name).snapshot();
	};
}();
