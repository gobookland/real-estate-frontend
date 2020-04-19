import React from 'react';
import { Button, TableRow, TableCell } from '@material-ui/core';
import {
	makeStyles,
	createMuiTheme,
	MuiThemeProvider,
} from '@material-ui/core/styles';

import MUIDataTable from 'mui-datatables';
import { withRouter } from 'react-router-dom';

import BasicChart from '../chart/BasicChart';

const columns = [
	[
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
			label: '매매가격',
			name: 'deal.totalPrice',
			options: {
				filter: false,
				sort: true,
			},
		},
		{
			label: '실제 평수',
			name: 'buildingInfo.realArea',
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
		{
			label: '업종',
			name: 'buildingInfo.sectors.basic',
			options: {
				filter: true,
				sort: false,
			},
		},
		{
			label: '상세 업종',
			name: 'buildingInfo.sectors.detail',
			options: {
				filter: true,
				sort: false,
			},
		},
		{
			label: '트래픽 지수',
			name: 'trafficData',
			options: {
				filter: false,
				sort: true,
			},
		},
		{
			label: ' ',
			name: 'actions',
			options: {
				filter: false,
				sort: false,
			},
		},
	],
	[
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
			label: '실제 평수',
			name: 'buildingInfo.realArea',
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
		{
			label: '업종',
			name: 'buildingInfo.sectors.basic',
			options: {
				filter: true,
				sort: false,
			},
		},
		{
			label: '상세 업종',
			name: 'buildingInfo.sectors.detail',
			options: {
				filter: true,
				sort: false,
			},
		},
		{
			label: '트래픽 지수',
			name: 'trafficData',
			options: {
				filter: false,
				sort: true,
			},
		},
		{
			label: ' ',
			name: 'actions',
			options: {
				filter: false,
				sort: false,
			},
		},
	],
];
const options = {
	responsive: 'scrollMaxHeight',
	textLabels: {
		body: {
			noMatch: '검색 결과가 없습니다',
			toolTip: '정렬',
			columnHeaderTooltip: (column) => `Sort for ${column.label}`,
		},
		pagination: {
			next: '다음 페이지',
			previous: '이전 페이지',
			rowsPerPage: '페이지당 건물 수',
			displayRows: '전체',
		},
		toolbar: {
			search: '검색',
			downloadCsv: 'CSV 다운로드',
			print: '프린트',
			viewColumns: '컬럼 선택',
			filterTable: '필터링',
		},
		filter: {
			all: '전체',
			title: '필터',
			reset: '초기화',
		},
		viewColumns: {
			title: '컬럼 선택',
			titleAria: 'Show/Hide Table Columns',
		},
		selectedRows: {
			text: '개 선택됨',
			delete: '삭제',
			deleteAria: 'Delete Selected Rows',
		},
	},
	filter: true,
	expandableRows: true,
	expandableRowsOnClick: true,
	isRowExpandable: (dataIndex, expandedRows) => {
		// Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
		if (
			expandedRows.data.length > 4 &&
			expandedRows.data.filter((d) => d.dataIndex === dataIndex).length === 0
		)
			return false;
		return true;
	},
	fixedHeaderOptions: {
		xAxis: false,
		yAxis: false,
	},
	// onRowsExpand: (curExpanded, allExpanded) =>
	// 	console.log(curExpanded, allExpanded),
};

const tab = ['매매', '임대'];
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		padding: '24px 0',
	},
	actionButton: {
		margin: '0 12px',
	},
}));

const BuildingDataTable = ({
	tabIndex,
	data,
	handleRemove,
	history,
	match,
}) => {
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
				MuiFormLabel: {
					root: {
						whiteSpace: 'nowrap',
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
						if (newData.dealInfo.lease.monthly) {
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
						newData.deal.totalPrice = 0;

						let buildingName = newData.buildingInfo.name;
						if (newData.dealInfo.trade.monthly) {
							newData.buildingInfo.name =
								buildingName[buildingName.length - 2] === '*'
									? buildingName
									: `${buildingName}(*)`;
						}
						return newData;
					});

	tableData = tableData.map((d, index) => {
		let newData = { ...d };
		const date = new Date(parseInt(newData.creationDate));

		newData.creationDate = `${date.getFullYear()}-${
			date.getMonth() + 1
		}-${date.getDate()}`;

		newData.deal.totalPrice = newData.deal.totalPrice.toLocaleString('ko-KR');

		newData.deal.price = newData.deal.price.toLocaleString('ko-KR');

		newData.deal.monthly = newData.deal.monthly.toLocaleString('ko-KR');

		newData.deal.deposit = newData.deal.deposit.toLocaleString('ko-KR');

		newData.dealInfo.rights = newData.dealInfo.rights.toLocaleString('ko-KR');

		newData.trafficData = '-';
		const trafficLength = newData.traffic.length;
		if (trafficLength !== 0) {
			const sum = newData.traffic.reduce(
				(acc, value) => acc + value.percentage,
				0,
			);
			newData.trafficData = `${(sum / trafficLength).toFixed(2)}%`;
		}

		newData.actions = (
			<>
				<Button
					color="primary"
					variant="outlined"
					className={classes.actionButton}
					onClick={(e) => history.push(`${match.path}/building/${newData.id}`)}
				>
					수정
				</Button>
				<Button
					color="primary"
					className={classes.actionButton}
					onClick={(e) => history.push(`/dashboard/traffic/${newData.id}`)}
				>
					트래픽 지수 보러가기
				</Button>
			</>
		);

		return newData;
	});

	return (
		<div className={classes.root}>
			<MuiThemeProvider theme={getMuiTheme()}>
				<MUIDataTable
					title={tabValue}
					columns={columns[tabIndex]}
					data={tableData}
					options={{
						...options,
						searchPlaceholder: '건물명',
						onRowsDelete: (deleted) => {
							let ids = [];
							deleted.data.map((d) => {
								const id = tableData[d.dataIndex].id;
								ids.push(id);
								return d;
							});
							handleRemove(ids);
						},
						renderExpandableRow: (rowData, rowMeta) => {
							const colSpan = rowData.length + 1;
							const chartData = [];
							const row = tableData[rowMeta.rowIndex].history;

							if (tabValue === '매매') {
								row.map((his) => {
									const date = new Date(parseInt(his.updateDate));
									const argument = `${date.getFullYear()}-${
										date.getMonth() + 1
									}-${date.getDate()}`;
									const value1 = his.dealInfo.trade.monthly;
									const value2 = his.dealInfo.trade.price;

									chartData.push({
										argument,
										value1,
										value2,
									});

									return his;
								});
							}

							if (tabValue === '임대') {
								row.map((his) => {
									const date = new Date(parseInt(his.updateDate));
									const argument = `${date.getFullYear()}-${
										date.getMonth() + 1
									}-${date.getDate()}`;
									const value1 = his.dealInfo.lease.monthly;
									const value2 = his.dealInfo.lease.price;

									chartData.push({
										argument,
										value1,
										value2,
									});

									return his;
								});
							}

							const matchingName = {
								value1: '월세',
								value2: '평당 가격',
							};

							return (
								<TableRow>
									<TableCell colSpan={colSpan}>
										<BasicChart data={chartData} matchingName={matchingName} />
									</TableCell>
								</TableRow>
							);
						},
					}}
				/>
			</MuiThemeProvider>
		</div>
	);
};

export default withRouter(BuildingDataTable);
