import React from 'react';
import {
	Button,
	AppBar,
	Typography,
	Toolbar,
	Box,
	Hidden,
	BottomNavigation,
	BottomNavigationAction,
	useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { LocationCity, PersonPin, Traffic, Storage } from '@material-ui/icons';
import { NavLink, withRouter } from 'react-router-dom';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
	},
	appBar: {
		height: '120px',
	},
	appBarMobile: {
		height: '60px',
	},
	toolBar: {
		height: '64px',
	},
	header: {
		width: '100%',
		textAlign: 'center',
	},
	navi: {
		display: 'flex',
		padding: '0 24px',
	},
	noShow: {
		display: 'none',
	},
	navLink: {
		textDecoration: 'none',
		position: 'relative',
	},
	naviItem: {
		fontSize: '1.2rem',
		color: '#cccccc',
		padding: '0 1.7rem',
		lineHeight: '56px',
	},
	naviItemActive: {
		'& button': {
			color: '#fff',
			fontWeight: 'bold',
		},
	},
	childRoot: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		marginTop: '120px',
		minHeight: 'calc(100vh - 120px)',
		background: '#eee',
	},
	childRootMobile: {
		marginTop: '60px',
		marginBottom: '60px',
		minHeight: 'calc(100vh - 60px - 56px)',
		paddingBottom: '56px',
	},
	bottomNavi: {
		position: 'fixed',
		bottom: 0,
		width: '100%',
		background: '#3f51b5',
		zIndex: 999,
	},
	bottomNaviAction: {
		'&.selected': {
			color: '#fff',
		},
	},
}));

const AppBarWithNavi = ({ match, children, history, location }) => {
	const classes = useStyles();
	const theme = useTheme();
	const breakPoint = useMediaQuery(theme.breakpoints.down('xs'));

	const handleBottomNavi = (e, value) => {
		history.push(value);
	};

	return (
		<div className={classes.root}>
			<AppBar
				className={clsx(classes.appBar, breakPoint && classes.appBarMobile)}
				elevation={0}
			>
				<Toolbar className={classes.toolBar}>
					<Typography
						variant="h5"
						className={clsx(breakPoint && classes.header)}
					>
						Real Estate
					</Typography>
				</Toolbar>
				<Hidden xsDown>
					<Box className={clsx(classes.navi)}>
						<NavLink
							className={clsx(
								classes.navLink,
								match.isExact && classes.naviItemActive,
							)}
							activeClassName={classes.naviItemActive}
							to={`${match.path}/buildings`}
						>
							<Button className={classes.naviItem} fullWidth>
								건물
							</Button>
						</NavLink>
						<NavLink
							className={classes.navLink}
							activeClassName={classes.naviItemActive}
							to={`${match.path}/customers`}
						>
							<Button className={classes.naviItem} fullWidth>
								고객
							</Button>
						</NavLink>
						<NavLink
							className={classes.navLink}
							activeClassName={classes.naviItemActive}
							to={`${match.path}/traffic`}
						>
							<Button className={classes.naviItem} fullWidth>
								트래픽 지수
							</Button>
						</NavLink>
						<NavLink
							className={classes.navLink}
							activeClassName={classes.naviItemActive}
							to={`${match.path}/subData`}
						>
							<Button className={classes.naviItem} fullWidth>
								서브 데이터
							</Button>
						</NavLink>
					</Box>
				</Hidden>
			</AppBar>
			<div
				className={clsx(
					classes.childRoot,
					breakPoint && classes.childRootMobile,
				)}
			>
				{children}
			</div>
			<Hidden smUp>
				<BottomNavigation
					className={classes.bottomNavi}
					onChange={handleBottomNavi}
					value={location.pathname}
					// classes={{root:}}
				>
					<BottomNavigationAction
						value={`${match.path}/buildings`}
						className={classes.bottomNaviAction}
						classes={{ selected: 'selected' }}
						icon={<LocationCity />}
					/>
					<BottomNavigationAction
						value={`${match.path}/customers`}
						className={classes.bottomNaviAction}
						classes={{ selected: 'selected' }}
						icon={<PersonPin />}
					/>
					<BottomNavigationAction
						value={`${match.path}/traffic`}
						className={classes.bottomNaviAction}
						classes={{ selected: 'selected' }}
						icon={<Traffic />}
					/>
					<BottomNavigationAction
						value={`${match.path}/subData`}
						className={classes.bottomNaviAction}
						classes={{ selected: 'selected' }}
						icon={<Storage />}
					/>
				</BottomNavigation>
			</Hidden>
		</div>
	);
};

export default withRouter(AppBarWithNavi);
