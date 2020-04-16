import React, { useState, useEffect } from 'react';
import {} from '@material-ui/core';
import {
	makeStyles,
	createMuiTheme,
	MuiThemeProvider,
} from '@material-ui/core/styles';

import MUIDataTable from 'mui-datatables';

const columns = [
	{
		label: '등록일',
		name: 'creationDate',
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		label: '건물명',
		name: 'buildingInfo.name',
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		label: '평당가격',
		name: 'deal.price',
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		label: '월세',
		name: 'deal.monthly',
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		label: '보증금',
		name: 'deal.deposit',
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		label: '권리금',
		name: 'dealInfo.rights',
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		label: '층수',
		name: 'buildingInfo.layer',
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		label: '호수',
		name: 'buildingInfo.number',
		options: {
			filter: false,
			sort: true,
		},
	},
];
const options = {
	responsive: 'scrollMaxHeight',
	filter: false,
};

const tab = ['매매', '임대'];
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		padding: '24px 0',
	},
}));

const BuildingDataTable = ({ tabIndex, data, handleRemove }) => {
	const classes = useStyles();
	const getMuiTheme = () =>
		createMuiTheme({
			overrides: {
				MuiTableCell: {
					root: {
						whiteSpace: 'nowrap',
					},
				},
				MuiTablePagination: {
					root: {
						padding: '0 !important',
					},
				},
				MUIDataTableHeadCell: {
					sortAction: {
						alignItems: 'center',
					},
				},
			},
		});

	const tabValue = tab[tabIndex];
	let tableData =
		tabValue === '매매'
			? data
					.filter((d) => d.dealInfo.trade.price)
					.map((d) => {
						let newData = { ...d };
						newData.deal = newData.dealInfo.trade;

						let buildingName = newData.buildingInfo.name;
						if (newData.dealInfo.lease.price) {
							newData.buildingInfo.name =
								buildingName[buildingName.length - 2] === '*'
									? buildingName
									: `${buildingName}(*)`;
						}
						return newData;
					})
			: data
					.filter((d) => d.dealInfo.lease.price)
					.map((d) => {
						let newData = { ...d };
						newData.deal = newData.dealInfo.lease;

						let buildingName = newData.buildingInfo.name;
						if (newData.dealInfo.trade.price) {
							newData.buildingInfo.name =
								buildingName[buildingName.length - 2] === '*'
									? buildingName
									: `${buildingName}(*)`;
						}
						return newData;
					});

	tableData = tableData.map((d) => {
		let newData = { ...d };
		const date = new Date(parseInt(newData.creationDate));
		newData.creationDate = `${date.getFullYear()}-${
			date.getMonth() + 1
		}-${date.getDate()}`;

		return newData;
	});

	return (
		<div className={classes.root}>
			<MuiThemeProvider theme={getMuiTheme()}>
				<MUIDataTable
					title={tabValue}
					columns={columns}
					data={tableData}
					options={{
						...options,
						onRowsDelete: (deleted) => {
							let ids = [];
							deleted.data.map((d) => {
								const id = tableData[d.dataIndex].id;
								ids.push(id);
							});
							handleRemove(ids);
						},
					}}
				/>
			</MuiThemeProvider>
		</div>
	);
};

export default BuildingDataTable;
