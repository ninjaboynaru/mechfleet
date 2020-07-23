import Realm from 'realm';
import schemas from './schemas';
import { fleet } from './models';

export default new function() {
	let initialized = false;

	this.models = null;

	this.isInitialized = function() {
		return initialized;
	};

	function initModels(realm) {
		this.models = {
			fleet: fleet(realm)
		};
	}

	this.init = function() {
		return Realm.open({ schemaVersion: 0, schema: schemas }).then((realm) => {
			initialized = true;
			initModels(realm);
		});
	};
}();
