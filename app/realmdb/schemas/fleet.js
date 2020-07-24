import PropTypes from 'prop-types';

export default {
	name: 'Fleet',
	primaryKey: 'id',
	properties: {
		id: 'string',
		name: 'string',
		description: 'string',
		assets: { type: 'Asset[]' }
	},
	propType: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired
	})
};
