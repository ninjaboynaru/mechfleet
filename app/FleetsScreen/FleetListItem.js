import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { schemas } from 'mechdb';
import { Themed } from 'mechtheme';
import { mergeStyles, Text, H1 } from 'mechui';

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start'
	},
	mainContentContainer: {

	},
	controlsContainer: {
	}
});

class FleetListItem extends React.Component {
	constructor(props) {
		super(props);
		this.menuRef = null;

		this.setMenuRef = this.setMenuRef.bind(this);
		this.shoeMenu = this.shoeMenu.bind(this);
		this.hideMenu = this.hideMenu.bind(this);
		this.onEditPress = this.onEditPress.bind(this);
		this.onDeletePress = this.onDeletePress.bind(this);
	}

	setMenuRef(ref) {
		this.menuRef = ref;
	}

	shoeMenu() {
		this.menuRef.show();
		console.log('SHOW MENU PRESSED');
	}

	hideMenu() {
		this.menuRef.hide();
		console.log('HIDE MENU');
	}

	onEditPress() {
		console.log('FLEET EDIT PRESSED');
	}

	onDeletePress() {
		console.log('FLEET DELETE PRESSED');
	}

	render() {
		const { theme, fleet } = this.props;
		const itemContainerStyle = mergeStyles(styles.itemContainer, {
			marginBottom: theme.getValue('expandedListItemMargin')
		});

		const controlsContainerStyle = mergeStyles(styles.controlsContainer, {
			marginLeft: theme.getValue('expandedListItemMargin')
		});

		const menuButton = (
			<Icon
				onPress={this.shoeMenu}
				name="ellipsis-v"
				color={theme.getValue('menuIconColor')}
				size={theme.getValue('fontSizeLarge')}
			/>
		);

		return (
			<View style={itemContainerStyle}>
				<View style={styles.mainContentContainer}>
					<H1>{fleet.name}</H1>
					<Text>{fleet.description}</Text>
				</View>
				<View style={controlsContainerStyle}>
					<Menu ref={this.setMenuRef} button={menuButton}>
						<MenuItem onPress={this.onEditPress}><Text>Edit</Text></MenuItem>
						<MenuDivider />
						<MenuItem onPress={this.onDeletePress}><Text>Delete</Text></MenuItem>
					</Menu>
				</View>
			</View>
		);
	}
}

FleetListItem.propTypes = {
	theme: Themed.themePropType.isRequired,
	fleet: schemas.fleet.propType.isRequired
};

export default Themed(FleetListItem);
