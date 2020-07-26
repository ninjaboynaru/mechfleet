import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Text, H2, ListItem, CheckBox, Body } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import taskTypeData from '../../subDataTypes/taskTypeData';

const styles = StyleSheet.create({
	modalContainer: {
		zIndex: 10000,
		position: 'absolute',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.8)'
	},
	modalContent: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '80%',
		maxHeight: '90%',
		borderRadius: 12,
		backgroundColor: 'white'
	},
	controlBar: {
		width: '100%',
		paddingVertical: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	exitButton: {
		position: 'absolute',
		right: 0,
		top: 0
	},
	mainContent: {
		padding: 12,
		width: '100%'
	},
	datePickerButton: {
		marginBottom: 6
	},
	taskTypeContainer: {
		marginTop: 16,
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	taskType: {
		flexDirection: 'row',
		minWidth: '30%',
		marginRight: 4,
		marginBottom: 12
	},
	taskTypeCheckBox: {
		marginRight: 16
	},
	taskTypeText: {

	}
});

export default class TaskFilter extends React.Component {
	constructor(props) {
		super(props);

		this.taskTypeFilterChange = this.taskTypeFilterChange.bind(this);
		this.onStartPickerChange = this.onStartPickerChange.bind(this);
		this.onEndPickerChange = this.onEndPickerChange.bind(this);
		this.toggleStartPicker = this.toggleStartPicker.bind(this);
		this.toggleEndPicker = this.toggleEndPicker.bind(this);
		this.state = { showStartPicker: false, showEndPicker: false };
	}

	taskTypeFilterChange(typeValue) {
		const typeFilter = [...this.props.filter.taskType];
		const typeValueIndex = typeFilter.indexOf(typeValue);

		if (typeValueIndex !== -1) {
			typeFilter.splice(typeValueIndex, 1);
		}
		else {
			typeFilter.push(typeValue);
		}

		this.props.onTaskTypeChange(typeFilter);
	}

	onStartPickerChange(event, date) {
		const endDate = this.props.filter.dateRange.end;
		this.toggleStartPicker();

		if (event.type === 'neutralButtonPressed') {
			this.props.onDateRangeChange(null, endDate);
		}
		else if (event.type === 'set') {
			this.props.onDateRangeChange(date, endDate);
		}
	}

	onEndPickerChange(event, date) {
		const startDate = this.props.filter.dateRange.start;
		this.toggleEndPicker();

		if (event.type === 'neutralButtonPressed') {
			this.props.onDateRangeChange(startDate, null);
		}
		else if (event.type === 'set') {
			this.props.onDateRangeChange(startDate, date);
		}
	}

	toggleStartPicker() {
		this.setState({ showStartPicker: !this.state.showStartPicker });
	}

	toggleEndPicker() {
		this.setState({ showEndPicker: !this.state.showEndPicker });
	}

	buildControlBar() {
		return (
			<View style={styles.controlBar}>
				<View />
				<H2>Filters</H2>
				<Button large danger transparent onPress={this.props.onClosePress} style={styles.exitButton}>
					<Icon type="AntDesign" name="closecircleo" />
				</Button>
			</View>
		);
	}

	buildShowCompletedFilter() {
		return (
			<ListItem style={{ marginLeft: 0 }}>
				<CheckBox checked={this.props.filter.showCompleted} onPress={this.props.onCompletedChange} />
				<Body><Text>Show Completed</Text></Body>
			</ListItem>
		);
	}

	buildDateFilter() {
		const filter = this.props.filter;
		const startDateText = filter.dateRange.start ? filter.dateRange.start.toDateString() : 'Not set';
		const endDateText = filter.dateRange.end ? filter.dateRange.end.toDateString() : 'Not set';

		const { showStartPicker, showEndPicker } = this.state;
		let datePicker = null;
		let datePickerProps = null;

		if (showStartPicker === true) {
			datePickerProps = {
				value: filter.dateRange.start || new Date(),
				onChange: this.onStartPickerChange,
				maximumDate: filter.dateRange.end || null
			};
		}
		else if (showEndPicker === true) {
			datePickerProps = {
				value: filter.dateRange.end || new Date(),
				onChange: this.onEndPickerChange,
				minimumDate: filter.dateRange.start || null
			};
		}

		if (datePickerProps) {
			datePicker = <DateTimePicker neutralButtonLabel="Clear" {...datePickerProps} />;
		}

		const startExtraProps = { success: true };
		const endExtraProps = { success: true };

		if (!filter.dateRange.start) {
			startExtraProps.warning = true;
			startExtraProps.success = false;
		}
		if (!filter.dateRange.end) {
			endExtraProps.warning = true;
			endExtraProps.success = false;
		}


		return (
			<>
				<Button style={styles.datePickerButton} block small rounded onPress={this.toggleStartPicker} {...startExtraProps}>
					<Text style={styles.datePickerText}>Start Date: {startDateText}</Text>
				</Button>
				<Button style={styles.datePickerButton} block small rounded onPress={this.toggleEndPicker} {...endExtraProps}>
					<Text style={styles.datePickerText}>End Date: {endDateText}</Text>
				</Button>
				{datePicker}
			</>
		);
	}

	buildTypeFilter() {
		const checkBoxes = [];
		const typeFilter = this.props.filter.taskType;

		for (const typeData of taskTypeData.typeMap) {
			const checked = typeFilter.includes(typeData.value);
			const onPress = () => this.taskTypeFilterChange(typeData.value);

			checkBoxes.push(
				<TouchableOpacity onPress={onPress} style={styles.taskType} key={typeData.value}>
					<CheckBox checked={checked} onPress={onPress} style={styles.taskTypeCheckBox} />
					<Text style={styles.taskTypeText}>{typeData.displayName}</Text>
				</TouchableOpacity>
			);
		}


		return <View style={styles.taskTypeContainer}>{checkBoxes}</View>;
	}

	buildFilters() {
		return (
			<View style={styles.mainContent}>
				{this.buildShowCompletedFilter()}
				{this.buildTypeFilter()}
				{this.buildDateFilter()}
			</View>
		);
	}


	render() {
		return (
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					{this.buildControlBar()}
					{this.buildFilters()}
				</View>
			</View>
		);
	}
}

TaskFilter.propTypes = {
	filter: PropTypes.object.isRequired,
	onClosePress: PropTypes.func.isRequired,
	onCompletedChange: PropTypes.func.isRequired,
	onDateRangeChange: PropTypes.func.isRequired,
	onTaskTypeChange: PropTypes.func.isRequired
};
