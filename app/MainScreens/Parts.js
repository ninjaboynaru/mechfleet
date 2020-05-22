import React from 'react';
import { Container, Content, Button, Text } from 'native-base';
import PartCard from '../ItemCards/PartCard';
import WithDataMeta from '../metaComponents/WithDataMeta';
import db from '../db/db';

class Parts extends React.Component {
	constructor(props) {
		super(props);
		this.onFocus = this.onFocus.bind(this);
		this.onAddPartPress = this.onAddPartPress.bind(this);
		this.onPartPress = this.onPartPress.bind(this);
		this.state = { parts: [] };
	}

	componentDidMount() {
		this.props.navigation.addListener('focus', this.onFocus);
	}

	onFocus() {
		const dataMeta = this.props.dataMeta;
		dataMeta.showLoading('Loading Parts');

		db.getParts().then(
			(parts) => {
				dataMeta.hideLoading();
				this.setState({ parts });
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error loading parts');
			}
		);
	}

	onAddPartPress() {
		this.props.navigation.navigate('Edit Part');
	}

	onPartPress(part) {
		this.props.navigation.navigate('Part Info', part);
	}

	buildPartsList() {
		const parts = this.state.parts;
		const partCards = [];

		for (const part of parts) {
			const onPress = () => this.onPartPress(part);
			partCards.push(<PartCard key={part._id} part={part} onPress={onPress} />);
		}

		return partCards;
	}

	render() {
		if (this.props.dataMeta.visibleDisplays.loading === true) {
			return null;
		}

		return (
			<Container>
				<Content padder>
					<Button block onPress={this.onAddPartPress}><Text>Add Part</Text></Button>
					{this.buildPartsList()}
				</Content>
			</Container>
		);
	}
}

export default WithDataMeta(Parts);
