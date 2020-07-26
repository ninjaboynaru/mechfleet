import React from 'react';
import { View } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import WithDataMeta from '../metaComponents/WithDataMeta';
import { partModel } from '../db/models';

const controlsStyle = {
	marginTop: 16,
	flexDirection: 'row',
	justifyContent: 'space-between'
};

class EditPart extends React.Component {
	constructor(props) {
		super(props);
		this.part = this.props.route.params;

		this.onNameChange = this.onNameChange.bind(this);
		this.onNounChange = this.onNounChange.bind(this);
		this.onNsnChange = this.onNsnChange.bind(this);
		this.onSavePress = this.onSavePress.bind(this);
		this.onCancelPress = this.onCancelPress.bind(this);
		this.state = {};


		if (this.part) {
			this.state.part = { ...this.part };
		}
		else {
			this.state.part = { name: '', noun: '', nsn: '' };
			this.props.navigation.setOptions({ title: 'New Part' });
		}
	}

	setPartProperty(key, value) {
		const part = this.state.part;
		part[key] = value;

		this.setState({ part });
	}

	onNameChange(name) {
		this.setPartProperty('name', name);
	}

	onNounChange(noun) {
		this.setPartProperty('noun', noun);
	}

	onNsnChange(nsn) {
		this.setPartProperty('nsn', nsn);
	}

	onSavePress() {
		const dataMeta = this.props.dataMeta;
		dataMeta.showLoading('Saving Part');

		partModel.savePart(this.state.part).then(
			() => {
				dataMeta.toastSuccess('Part Saved');
				this.props.navigation.goBack();
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error saving part');
			}
		);
	}

	onCancelPress() {
		this.props.navigation.goBack();
	}

	render() {
		if (this.props.dataMeta.visibleDisplays.loading === true) {
			return null;
		}

		const { name, noun, nsn } = this.state.part;
		return (
			<Container>
				<Content padder>
					<Form>
						<Item stackedLabel>
							<Label>Name</Label>
							<Input value={name} onChangeText={this.onNameChange} />
						</Item>
						<Item stackedLabel>
							<Label>Noun</Label>
							<Input value={noun} onChangeText={this.onNounChange} />
						</Item>
						<Item stackedLabel>
							<Label>NSN</Label>
							<Input value={nsn} onChangeText={this.onNsnChange} />
						</Item>
						<View style={controlsStyle}>
							<Button success onPress={this.onSavePress}><Text>Save</Text></Button>
							<Button light onPress={this.onCancelPress}><Text>Cancel</Text></Button>
						</View>
					</Form>
				</Content>
			</Container>
		);
	}
}

export default WithDataMeta(EditPart);
