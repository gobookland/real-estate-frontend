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

const BasicChart = ({ data, matchingName }) => {
	const keys = Object.keys(data[0]).filter((key) => key !== 'argument');

	return (
		<Paper>
			<Chart data={data}>
				<ArgumentAxis />
				<ValueAxis />
				{keys.map((key) => (
					<LineSeries
						argumentField="argument"
						name={matchingName[key]}
						valueField={key}
					/>
				))}
				<Legend />
			</Chart>
		</Paper>
	);
};

export default BasicChart;
