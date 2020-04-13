import React, { useState } from 'react';
import { Tabs, Paper, Tab, Container, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import BuildingDataTable from './BuildingDataTable';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
	paper: {
		height: '48px',
		width: '100%',
	},
	indicatorMobile: {
		top: 0,
	},
	tabsMobile: {
		position: 'fixed',
		bottom: '56px',
		width: '100%',
	},
}));

const BuildingTable = ({ data }) => {
	const classes = useStyles();
	const theme = useTheme();
	const breakPoint = useMediaQuery(theme.breakpoints.down('xs'));

	const [tabValue, setTabValue] = useState(0);

	const handleChange = (e, newValue) => {
		setTabValue(newValue);
	};

	return (
		<>
			<Paper
				className={clsx(classes.paper, breakPoint && classes.tabsMobile)}
				square
			>
				<Tabs
					textColor="primary"
					indicatorColor="primary"
					value={tabValue}
					onChange={handleChange}
					variant={breakPoint ? 'fullWidth' : 'standard'}
					classes={{
						indicator: breakPoint && classes.indicatorMobile,
					}}
				>
					<Tab label="매매" />
					<Tab label="임대" />
				</Tabs>
			</Paper>
			<Container maxWidth="md">
				<BuildingDataTable tabIndex={tabValue} data={data} />
			</Container>
		</>
	);
};

export default BuildingTable;
