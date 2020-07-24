import Realm from 'realm';
import { schemas } from './schemas';
import { fleet } from './models';

export default new function() {
	let initialized = false;

	this.models = null;
	this.apples = 'GOGOGO';

	this.isInitialized = function() {
		return initialized;
	};

	this.init = function() {
		return Realm.open({ schemaVersion: 0, schema: schemas }).then((realm) => {
			initialized = true;
			this.models = {
				fleet: fleet(realm)
			};
		});
	};
}();
