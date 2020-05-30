import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Input, Button, Text } from 'native-base';
import Fuse from 'fuse.js';
import { taskModel } from '../../db/models';
import TaskFilter from './TaskFilter';
import TaskCard from '../../ItemCards/TaskCard';
import WithDataMeta from '../../metaComponents/WithDataMeta';

const fuseSearchOptions = {
	includeScore: false,
	threshold: 0.4,
	keys: ['name', 'parentName']
};

const styles = StyleSheet.create({
	controls: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	searchInput: {
		borderBottomWidth: 1,
		borderColor: 'rgba(0,0,0,0.2)',
		marginRight: 12
	}
});

class Tasks extends React.Component {
	constructor(props) {
		super(props);
		this.onTaskPress = this.onTaskPress.bind(this);
		this.onSearchTermChange = this.onSearchTermChange.bind(this);
		this.toggleShowFilter = this.toggleShowFilter.bind(this);
		this.filterCompletedChange = this.filterCompletedChange.bind(this);
		this.filterDateRangeChange = this.filterDateRangeChange.bind(this);
		this.filterTaskTypeChange = this.filterTaskTypeChange.bind(this);
		this.applyFilter = this.applyFilter.bind(this);

		this.state = {
			tasks: [],
			matchedTasks: [],
			searchTerm: '',
			showFilter: false,
			filter: {
				showCompleted: false,
				dateRange: { start: null, end: null },
				taskType: []
			}
		};
	}

	componentDidMount() {
		const dataMeta = this.props.dataMeta;
		dataMeta.showLoading('Loading Tasks');

		taskModel.getTasks(true).then(
			(tasks) => {
				dataMeta.hideLoading();
				this.setState({ tasks }, this.applyFilter);
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error loading tasks');
			}
		);
	}

	setFilterProperty(key, value) {
		const filter = this.state.filter;
		filter[key] = value;

		this.setState({ filter }, this.applyFilter);
	}

	onTaskPress(taskId) {
		this.props.navigation.navigate('Task Info', taskId);
	}

	onSearchTermChange(searchTerm) {
		this.setState({ searchTerm }, this.applyFilter);
	}

	toggleShowFilter() {
		this.setState({ showFilter: !this.state.showFilter });
	}

	filterCompletedChange() {
		this.setFilterProperty('showCompleted', !this.state.filter.showCompleted);
	}

	filterDateRangeChange(start, end) {
		this.setFilterProperty('dateRange', { start, end });
	}

	filterTaskTypeChange(taskType) {
		this.setFilterProperty('taskType', taskType);
	}

	applyFilter() {
		const filter = this.state.filter;
		const filteredTasks = this.state.tasks.filter((task) => {
			if (task.complete !== filter.showCompleted) {
				return false;
			}

			if (filter.taskType.length > 0 && filter.taskType.includes(task.type) === false) {
				return false;
			}

			const filterDateDefined = filter.dateRange.start && filter.dateRange.end;
			const inStartDateBounds = task.createdOn >= filter.dateRange.start;
			const inEndDateBounds = task.createdOn <= filter.dateRange.end;
			const inDateBounds = inStartDateBounds && inEndDateBounds;

			if (filterDateDefined && inDateBounds === false) {
				return false;
			}

			return true;
		});

		if (!this.state.searchTerm) {
			this.setState({ matchedTasks: filteredTasks });
			return;
		}

		const fuseSearcher = new Fuse(filteredTasks, fuseSearchOptions);
		const searchResults = fuseSearcher.search(this.state.searchTerm);

		const finalTasks = searchResults.map((result) => result.item);
		this.setState({ matchedTasks: finalTasks });
	}

	buildTasksList() {
		const taskCards = [];

		for (const task of this.state.matchedTasks) {
			const onPress = () => this.onTaskPress(task._id);
			taskCards.push(<TaskCard key={task._id} task={task} onPress={onPress} />);
		}

		return taskCards;
	}

	render() {
		if (this.props.dataMeta.visibleDisplays.loading === true) {
			return null;
		}

		if (this.state.showFilter === true) {
			return (
				<TaskFilter
					filter={this.state.filter}
					onClosePress={this.toggleShowFilter}
					onCompletedChange={this.filterCompletedChange}
					onDateRangeChange={this.filterDateRangeChange}
					onTaskTypeChange={this.filterTaskTypeChange}
				/>
			);
		}

		return (
			<Container>
				<Content padder>
					<View style={styles.controls}>
						<Input
							placeholder="Search Tasks"
							style={styles.searchInput}
							value={this.state.searchTerm}
							onChangeText={this.onSearchTermChange}
						/>
						<Button onPress={this.toggleShowFilter}><Text>Filter</Text></Button>
					</View>
					<Text>Showing {this.state.matchedTasks.length} of {this.state.tasks.length} tasks</Text>
					{this.buildTasksList()}
				</Content>
			</Container>
		);
	}
}

export default WithDataMeta(Tasks);
