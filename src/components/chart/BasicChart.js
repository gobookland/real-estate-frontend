import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
	ArgumentAxis,
	ValueAxis,
	LineSeries,
	Chart,
	Legend,
	ZoomAndPan,
} from '@devexpress/dx-react-chart-material-ui';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	paper: {
		maxWidth: theme.breakpoints.width('sm'),
	},
}));

const BasicChart = ({ data, matchingName, noLegend }) => {
	const classes = useStyles();

	const keys = Object.keys(data[0]).filter((key) => key !== 'argument');

	return (
		<Paper className={classes.paper}>
			<Chart data={data} height={340}>
				<ArgumentAxis />
				<ValueAxis />
				{keys.map((key) => (
					<LineSeries
						argumentField="argument"
						name={matchingName[key]}
						valueField={key}
						key={key}
					/>
				))}
				{noLegend || <Legend />}
				<ZoomAndPan />
			</Chart>
		</Paper>
	);
};

export default BasicChart;
