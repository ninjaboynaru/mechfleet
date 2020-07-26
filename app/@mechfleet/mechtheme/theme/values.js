import logo from './cog_world_logo.png';

const values = {
	// Colors
	primaryColor: '#FF3B30',
	dangerColor: 'red',
	textColor: '#464646',
	textSubduedLightColor: '#A9A9A9',
	textSubduedDarkColor: '#797979',
	backgroundColor: '#FDFCFC',
	surfaceOnBackgroundColor: 'white',

	// Menu Icon
	get menuIconColor() { return this.textSubduedDarkColor },

	// Font Sizes
	fontSize: 12,
	fontSizeSmall: 8,
	fontSizeLarge: 16,
	fontSizeH1: 28,
	fontSizeH2: 24,
	fontSizeH3: 20,
	fontSizeH4: 16,

	// Logo
	logo,
	logoWidth: 140,
	logoHeight: 140,

	// Padding and Margins
	mainContainerPadding: 24,
	standardPadding: 4,
	standardMargin: 4,
	expandedListItemMargin: 16,

	// Button
	buttonStandardMargin: 12,
	buttonStandardPadding: 10,
	buttonBorderRadius: 6,
	get buttonContentSize() { return this.fontSizeLarge },
	get buttonPrimaryColor() { return this.primaryColor },
	buttonPrimaryContentColor: 'white',

	// Input
	get labelColor() { return this.textSubduedDarkColor },
	get itemVerticalMargin() { return this.standardMargin * 4 },
	get textFieldFontSize() { return this.fontSizeLarge },
	get textFieldShadowColor() { return this.textColor },
	get labelBottomMargin() { return this.standardMargin * 1 },

	// Modal
	modalBackgroundColor: 'rgba(0,0,0,0.6)',
	get modalContentBackgroundColor() { return this.backgroundColor }
};

export default Object.freeze(values);
