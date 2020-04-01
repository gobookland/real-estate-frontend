import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Fab } from '@material-ui/core/';
import { Add } from '@material-ui/icons';
import MUIDataTable from 'mui-datatables';
import { Link, withRouter } from 'react-router-dom';

const columns = [
	{
		name: 'creationDate',
		label: '등록일',
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		name: 'buildingInfo.name',
		label: '건물명',
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		name: 'buildingInfo.layer',
		label: '층수',
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		name: 'buildingInfo.number',
		label: '호수',
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		name: 'deal.price',
		label: '평당 가격',
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		name: 'deal.monthly',
		label: '월세',
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		name: 'deal.deposit',
		label: '보증금',
		options: {
			filter: false,
			sort: true,
		},
	},
	{
		name: 'dealInfo.rights',
		label: '권리금',
		options: {
			sort: true,
			filter: false,
		},
	},
];

const options = {
	filterType: 'dropdown',
};

const useStyles = makeStyles({
	root: {
		width: '100%',
	},
	table: {
		marginBottom: '3rem',
	},
	title: {
		marginBottom: '1rem',
	},
	fab: {
		position: 'fixed',
		bottom: '24px',
		right: '24px',
	},
});

const BuildingTable = ({ data, match }) => {
	const classes = useStyles();

	const trade = data
		.map(d => {
			const date = new Date(parseInt(d.creationDate));
			const creationDate = `${date.getFullYear()}-${date.getMonth() +
				1}-${date.getDate()}`;

			if (d.dealInfo.trade.price) {
				if (d.dealInfo.lease.price) {
					if (d.buildingInfo.name[d.buildingInfo.name.length - 2] !== '*')
						d.buildingInfo.name = d.buildingInfo.name + '(*)';
				}
				const deal = d.dealInfo.trade;

				return { ...d, creationDate, deal };
			}

			return null;
		})
		.filter(d => d !== null);

	const lease = data
		.map(d => {
			const date = new Date(parseInt(d.creationDate));
			const creationDate = `${date.getFullYear()}-${date.getMonth() +
				1}-${date.getDate()}`;

			if (d.dealInfo.lease.price) {
				if (d.dealInfo.trade.price) {
					if (d.buildingInfo.name[d.buildingInfo.name.length - 2] !== '*')
						d.buildingInfo.name = d.buildingInfo.name + '(*)';
				}
				const deal = d.dealInfo.lease;

				return { ...d, creationDate, deal };
			}
			return null;
		})
		.filter(d => d !== null);

	return (
		<div className={classes.root}>
			<Container maxWidth="md">
				<Typography className={classes.title} variant="h5">
					매매
				</Typography>
				<MUIDataTable
					className={classes.table}
					columns={columns}
					data={trade}
					options={options}
				/>
				<Typography className={classes.title} variant="h5">
					임대
				</Typography>
				<MUIDataTable
					className={classes.table}
					columns={columns}
					data={lease}
					options={options}
				/>
			</Container>
			<Link to={`${match.url}/add`}>
				<Fab className={classes.fab} color="primary" aria-label="add">
					<Add />
				</Fab>
			</Link>
		</div>
	);
};

export default withRouter(BuildingTable);
