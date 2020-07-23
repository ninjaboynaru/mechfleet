
export default {
	name: 'Fleet',
	primaryKey: 'id',
	properties: {
		id: 'string',
		name: 'string',
		description: 'string',
		assets: { type: 'Asset[]' }
	}
};
