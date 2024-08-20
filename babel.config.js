module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
	plugins: [
	[
		'module-resolver',
		{
			extensions: ['.js'],
			alias: {
				'@mechfleet': './app/@mechfleet',
				mechtheme: './app/@mechfleet/mechtheme',
				mechdb: './app/@mechfleet/mechdb',
				mechui: './app/@mechfleet/mechui'
			}
		}
	]
]
};
