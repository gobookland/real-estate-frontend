import React, { useMemo } from 'react';
import {
	Container,
	Tabs,
	Tab,
	useMediaQuery,
	Paper,
	TableRow,
	TableCell,
	IconButton,
	Typography,
	Grid,
	TextField,
	Button,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import {
	makeStyles,
	createMuiTheme,
	MuiThemeProvider,
	useTheme,
} from '@material-ui/core/styles';

import { Delete } from '@material-ui/icons';

import ScreenLoading from '../loading/ScreenLoading';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
	},
	container: {
		padding: '24px',
	},
	paper: {
		height: '48px',
		width: '100%',
	},
	paperContainer: {
		padding: '24px',
		marginTop: '24px',
	},
	indicatorMobile: {
		top: 0,
	},
	tabsMobile: {
		position: 'fixed',
		bottom: '56px',
		width: '100%',
		zIndex: 999,
	},
}));

const columns = [
	[
		{
			label: '분류',
			name: 'type',
			options: {
				filter: false,
				sort: false,
			},
		},
		{
			label: '업종명',
			name: 'name',
			options: {
				filter: false,
				sort: true,
			},
		},
	],
	[
		{
			label: '위치',
			name: 'name',
			options: {
				filter: false,
				sort: true,
			},
		},
	],
];

const options = {
	responsive: 'scrollMaxHeight',
	filter: false,
	textLabels: {
		body: {
			noMatch: '검색 결과가 없습니다',
			toolTip: '정렬',
			columnHeaderTooltip: (column) => `Sort for ${column.label}`,
		},
		pagination: {
			next: '다음 페이지',
			previous: '이전 페이지',
			rowsPerPage: '페이지당 아이템 수',
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
};

const SubData = ({ loading, data, state, setState, handler }) => {
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
				// MUIDataTable: {
				// 	responsiveScrollMaxHeight: {
				// 		175: {
				// 			maxHeight: 'unset',
				// 		},
				// 	},
				// },
			},
		});

	const classes = useStyles();
	const theme = useTheme();
	const breakPoint = useMediaQuery(theme.breakpoints.down('xs'));

	const sectorsDetail = {};

	if (loading.sectors && loading.locations) {
		return <ScreenLoading />;
	}
	const tableData =
		state.tabValue === 0
			? data.sectors &&
			  data.sectors.sectors
					.map((sector) => {
						let copiedSector = { ...sector };
						if (copiedSector.type === 'detail') {
							sectorsDetail[copiedSector.parent] = sectorsDetail[
								copiedSector.parent
							]
								? [
										...sectorsDetail[copiedSector.parent],
										{
											type: '상세',
											name: copiedSector.name,
										},
								  ]
								: [
										{
											type: '상세',
											name: copiedSector.name,
										},
								  ];

							return false;
						}

						copiedSector.type = '기본';

						return copiedSector;
					})
					.filter((item) => item !== false)
			: data.locations.locations;

	return (
		<div className={classes.root}>
			<Paper
				square
				className={clsx(classes.paper, breakPoint && classes.tabsMobile)}
			>
				<Tabs
					textColor="primary"
					indicatorColor="primary"
					value={state.tabValue}
					onChange={handler.handleTabChange}
					variant={breakPoint ? 'fullWidth' : 'standard'}
					classes={{
						indicator: breakPoint && classes.indicatorMobile,
					}}
				>
					<Tab label="업종" />
					<Tab label="위치" />
				</Tabs>
			</Paper>
			<Container className={classes.container} maxWidth="md">
				<MuiThemeProvider theme={getMuiTheme()}>
					<MUIDataTable
						columns={columns[state.tabValue]}
						data={tableData}
						options={{
							...options,
							expandableRows: state.tabValue === 0,
							onRowsDelete: (deleted) => {
								if (state.tabValue === 0) {
									let sectors = [];
									deleted.data.map((d) => {
										const sector = {
											type: 'basic',
											name: tableData[d.dataIndex].name,
										};
										sectors.push(sector);
										return d;
									});
									handler.handleDelete(sectors);
								} else {
									let locations = [];
									deleted.data.map((d) => {
										const location = tableData[d.dataIndex].name;

										locations.push(location);
										return d;
									});
									handler.handleDelete(locations);
								}
							},
							renderExpandableRow: (rowData, rowMeta) => {
								const colSpan = rowData.length + 1;
								if (state.tabValue === 0) {
									const parent = tableData[rowMeta.rowIndex].name;

									return sectorsDetail[parent] ? (
										sectorsDetail[parent].map((sectorsDetail) => (
											<TableRow key={sectorsDetail.name}>
												<TableCell colSpan={colSpan}>
													<Grid container spacin={3}>
														<Grid
															item
															xs={11}
															style={{ display: 'flex', alignItems: 'center' }}
														>
															<Typography style={{ fontSize: '0.875rem' }}>
																{sectorsDetail.name}
															</Typography>
														</Grid>
														<Grid item xs={1}>
															<IconButton
																style={{ padding: 0 }}
																onClick={(e) =>
																	handler.handleDelete([
																		{
																			type: 'detail',
																			name: sectorsDetail.name,
																			parent,
																		},
																	])
																}
															>
																<Delete />
															</IconButton>
														</Grid>
													</Grid>
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={colSpan}>
												해당 업종의 상세 업종이 없습니다.
											</TableCell>
										</TableRow>
									);
								}
							},
						}}
						title={state.tabValue === 0 ? '업종' : '위치'}
					/>
					{state.tabValue === 0 && (
						<>
							<Paper className={classes.paperContainer}>
								<Grid container spacing={3}>
									<Grid item xs={12}>
										<Typography variant="h6">업종 추가</Typography>
									</Grid>
									<Grid item xs={12}>
										<TextField
											label="업종명"
											fullWidth
											name="sectors"
											value={state.formValue.sectors}
											onChange={handler.handleFormValueChange}
										/>
									</Grid>
									<Grid item xs={12}>
										<Button
											variant="contained"
											color="primary"
											style={{ float: 'right' }}
											onClick={handler.handleSectorSubmit('basic')}
										>
											추가
										</Button>
									</Grid>
								</Grid>
							</Paper>
							<Paper className={classes.paperContainer}>
								<Grid container spacing={3}>
									<Grid item xs={12}>
										<Typography variant="h6">상세 업종 추가</Typography>
									</Grid>
									<Grid item xs={12}>
										<FormControl fullWidth>
											<InputLabel htmlFor="parent">업종</InputLabel>
											<Select
												id="parent"
												name="parent"
												value={state.formValue.parent}
												onChange={handler.handleFormValueChange}
											>
												{tableData &&
													tableData.map((row) => (
														<MenuItem key={row.name} value={row.name}>
															{row.name}
														</MenuItem>
													))}
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={12}>
										<TextField
											label="상세 업종"
											fullWidth
											name="sectorsDetail"
											value={state.formValue.sectorsDetail}
											onChange={handler.handleFormValueChange}
										/>
									</Grid>
									<Grid item xs={12}>
										<Button
											variant="contained"
											color="primary"
											style={{ float: 'right' }}
											onClick={handler.handleSectorSubmit('detail')}
										>
											추가
										</Button>
									</Grid>
								</Grid>
							</Paper>
						</>
					)}
					{state.tabValue === 1 && (
						<>
							<Paper className={classes.paperContainer}>
								<Grid container spacing={3}>
									<Grid item xs={12}>
										<Typography variant="h6">위치 추가</Typography>
									</Grid>
									<Grid item xs={12}>
										<TextField
											label="위치 이름"
											fullWidth
											name="locations"
											value={state.locationName}
											onChange={(e) => setState.setLocationName(e.target.value)}
										/>
									</Grid>
									<Grid item xs={12}>
										<Button
											variant="contained"
											color="primary"
											style={{ float: 'right' }}
											onClick={handler.handleLocationSubmit}
										>
											추가
										</Button>
									</Grid>
								</Grid>
							</Paper>
						</>
					)}
				</MuiThemeProvider>
			</Container>
		</div>
	);
};

export default SubData;
