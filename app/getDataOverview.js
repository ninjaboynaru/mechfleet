import db from './db/db';

function buildAssetsOverview(assets, assetsOverviewObj) {
	for (const asset of assets) {
		assetsOverviewObj.total += 1;

		if (asset.status === 1) {
			if (asset.taskCount > 0) {
				assetsOverviewObj.onlineWithTasks += 1;
			}
			else {
				assetsOverviewObj.online += 1;
			}
		}
		else if (asset.status === 2) {
			assetsOverviewObj.offline += 1;
		}
	}
}

function buildTasksOverview(tasks, tasksOverviewObj) {
	for (const task of tasks) {
		if (task.complete === true) {
			continue;
		}

		tasksOverviewObj.total += 1;

		switch (task.type) {
			case 1:
				tasksOverviewObj.install += 1;
				break;
			case 2:
				tasksOverviewObj.troubleshoot += 1;
				break;
			case 3:
				tasksOverviewObj.service += 1;
				break;
		}
	}
}

function buildPartsOverview(parts, partsOverviewObj) {
	partsOverviewObj.total = parts.length;
}

export default function getDataOverview() {
	const overview = {
		assets: {
			online: 0,
			offline: 0,
			onlineWithTasks: 0,
			total: 0
		},
		tasks: {
			install: 0,
			troubleshoot: 0,
			service: 0,
			total: 0
		},
		parts: {
			total: 0
		}
	};

	return db.getAssets().then((assets) => buildAssetsOverview(assets, overview.assets))
	.then(db.getTasks).then((tasks) => buildTasksOverview(tasks, overview.tasks))
	.then(db.getParts)
	.then((parts) => buildPartsOverview(parts, overview.parts))
	.then(() => overview);
}
