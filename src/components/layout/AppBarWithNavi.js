import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	AppBar,
	Link,
	Tooltip,
	CssBaseline,
	Divider,
	Drawer,
	Hidden,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
	Collapse,
} from '@material-ui/core';
import { Apartment, Person, AddBox } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	normalText: {
		'&:hover': {
			textDecoration: 'none',
		},
		color: '#3e3e3e',
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

const ResponsiveDrawer = ({ children, container, match }) => {
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);

	const [buildingOpen, setBuildingOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleBuildingOpen = () => {
		setBuildingOpen(!buildingOpen);
	};

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				<Tooltip
					title="건물"
					placement="right"
					arrow
					onClick={handleBuildingOpen}
				>
					<ListItem button>
						<ListItemIcon>
							<Apartment />
						</ListItemIcon>
						<ListItemText primary="건물 관리" />
					</ListItem>
				</Tooltip>
				<Collapse in={buildingOpen} unmountOnExit timeout="auto">
					<List>
						<Link
							to={`${match.url}/buildings/add`}
							className={classes.normalText}
						>
							<Tooltip title="건물 추가" arrow placement="right">
								<ListItem button className={classes.nested}>
									<ListItemIcon>
										<AddBox />
									</ListItemIcon>
									<ListItemText primary="건물 추가" />
								</ListItem>
							</Tooltip>
						</Link>
					</List>
				</Collapse>
				<Link to="/dashboard/customers" className={classes.normalText}>
					<Tooltip title="고객" placement="right" arrow>
						<ListItem button>
							<ListItemIcon>
								<Person />
							</ListItemIcon>
							<ListItemText primary="고객 관리" />
						</ListItem>
					</Tooltip>
				</Link>
			</List>
		</div>
	);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Real Estate
					</Typography>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{children}
			</main>
		</div>
	);
};

ResponsiveDrawer.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	container: PropTypes.any,
};

export default withRouter(ResponsiveDrawer);
