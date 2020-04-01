import React, { useState } from 'react';
import {
	Container,
	Toolbar,
	Typography,
	Paper,
	Grid,
	Box,
	FormControl,
	TextField,
	Input,
	InputLabel,
	FormHelperText,
	InputAdornment,
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	FormGroup,
	OutlinedInput,
	Checkbox,
	FormLabel,
	Button,
	Select,
	MenuItem,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Tooltip,
	Menu,
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		minWidth: '650px',
	},
	form: {
		width: '100%',
		padding: '24px',
	},
	withoutLabel: {
		marginTop: theme.spacing(2),
	},
	expansionPanelContainer: {
		background: '#efefef',
	},
	paper: {
		background: 'inherit',
	},
	panel: {
		background: '#fff',
	},
	submitBtn: {
		marginTop: '2rem',
	},
	btnContainer: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	dialog: {
		minWidth: '',
	},
	imageInput: {
		display: 'none',
	},
	imageBox: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
	image: {
		height: '320px',
		marginBottom: '1rem',
	},
}));

const tmpLocation = ['A시', 'B시', 'C시'];

const BuildingControlForm = ({
	sectors,
	handleTyping,
	field,
	handleSubmit,
	sectorType,
	sectorName,
	handleSectorType,
	handleSectorName,
	handleSectorAdd,
	handleLocationAdd,
}) => {
	const { buildingInfo, dealInfo, partyInfo } = field;

	// Dialog states
	const [sectorDialog, setSectorDialog] = useState(false);
	const [locationDialog, setLocationDialog] = useState(false);

	// Location Menu states
	const [anchor, setAnchor] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(0);

	// Location Image states
	const [locationImage, setLocationImage] = useState('');
	const [locationName, setLocationName] = useState('');

	const classes = useStyles();

	const handleSectorDialog = which => () => {
		setSectorDialog(which);
	};

	const handleAnchor = e => {
		setAnchor(e.currentTarget);
	};

	const handleAnchorClose = () => {
		setAnchor(null);
	};

	const handleLocationSelect = index => event => {
		setSelectedIndex(index);
		setAnchor(null);
	};

	const handleLocationImage = e => {
		const file = e.target.files[0];
		setLocationImage(URL.createObjectURL(file));
	};

	return (
		<div className={classes.root}>
			<Container maxWidth="md">
				<Paper elevation={0} className={classes.paper}>
					<Toolbar>
						<Typography variant="h4">건물 등록</Typography>
					</Toolbar>
					<Box
						component="form"
						className={classes.form}
						onSubmit={handleSubmit}
					>
						<ExpansionPanel className={classes.panel}>
							<ExpansionPanelSummary expandIcon={<ExpandMore />}>
								<Typography variant="h6">건물 정보</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Grid container spacing={4}>
									<Grid item xs={12} md={12}>
										<TextField
											name="name"
											onChange={handleTyping('buildingInfo')}
											label="건물명"
											fullWidth
											required
											value={buildingInfo.name}
											variant="outlined"
										/>
									</Grid>
									<Grid item xs={6} md={3}>
										<TextField
											name="layer"
											onChange={handleTyping('buildingInfo')}
											fullWidth
											type="number"
											required
											value={buildingInfo.layer}
											variant="outlined"
											InputProps={{
												endAdornment: <InputAdornment>층</InputAdornment>,
											}}
										/>
										<FormHelperText>층수를 입력해주세요</FormHelperText>
									</Grid>
									<Grid item xs={6} md={3}>
										<TextField
											name="number"
											onChange={handleTyping('buildingInfo')}
											fullWidth
											type="number"
											required
											value={buildingInfo.number}
											variant="outlined"
											InputProps={{
												endAdornment: <InputAdornment>호</InputAdornment>,
											}}
										/>
										<FormHelperText>호수를 입력해주세요</FormHelperText>
									</Grid>
									<Grid item xs={6} md={3}>
										<FormControl fullWidth>
											<List>
												<ListItem button onClick={handleAnchor}>
													<ListItemText
														primary="위치선택"
														secondary={`현재 위치: ${tmpLocation[selectedIndex]}`}
													/>
												</ListItem>
											</List>
											<Menu
												anchorEl={anchor}
												open={Boolean(anchor)}
												keepMounted
												onClose={handleAnchorClose}
											>
												{tmpLocation.map((location, index) => (
													<Tooltip
														key={index}
														title="something"
														arrow
														placement="right"
													>
														<MenuItem
															key={location}
															selected={index === selectedIndex}
															onClick={handleLocationSelect(index)}
															style={{ minWidth: '200px' }}
														>
															{location}
														</MenuItem>
													</Tooltip>
												))}
											</Menu>
										</FormControl>
									</Grid>
									<Grid item xs={6} md={3}>
										<Button
											fullWidth
											className={classes.withoutLabel}
											color="primary"
											variant="outlined"
											onClick={() => setLocationDialog(true)}
										>
											위치 추가
										</Button>
										<Dialog
											maxWidth="xs"
											fullWidth
											open={locationDialog}
											onClose={() => setLocationDialog(false)}
										>
											<DialogTitle>위치 추가</DialogTitle>
											<DialogContent>
												<Box component="div" className={classes.imageBox}>
													{locationImage && (
														<img
															src={locationImage}
															className={classes.image}
															alt="Location"
														/>
													)}
													<input
														id="imageInput"
														type="file"
														className={classes.imageInput}
														onChange={handleLocationImage}
													/>
													<label htmlFor="imageInput">
														<Button
															variant="contained"
															color="primary"
															component="span"
														>
															사진 선택
														</Button>
													</label>
													<TextField
														label="위치 이름"
														value={locationName}
														onChange={e => setLocationName(e.target.value)}
														fullWidth
													/>
												</Box>
											</DialogContent>
											<DialogActions>
												<Button
													variant="outlined"
													color="secondary"
													onClick={() => setLocationDialog(false)}
												>
													취소
												</Button>
												<Button
													variant="outlined"
													color="primary"
													onClick={handleLocationAdd(
														locationImage,
														locationName,
													)}
												>
													추가
												</Button>
											</DialogActions>
										</Dialog>
									</Grid>
									<Grid item xs={6} md={6}>
										<TextField
											className={classes.withoutLabel}
											name="saleArea"
											onChange={handleTyping('buildingInfo')}
											fullWidth
											required
											value={buildingInfo.saleArea}
											type="number"
											variant="outlined"
											InputProps={{
												endAdornment: <InputAdornment>평</InputAdornment>,
											}}
										/>
										<FormHelperText>분양 평수를 입력해주세요</FormHelperText>
									</Grid>
									<Grid item xs={12} md={6}>
										<TextField
											className={classes.withoutLabel}
											name="realArea"
											onChange={handleTyping('buildingInfo')}
											fullWidth
											type="number"
											required
											value={buildingInfo.realArea}
											variant="outlined"
											InputProps={{
												endAdornment: <InputAdornment>평</InputAdornment>,
											}}
										/>
										<FormHelperText>실제 평수를 입력해주세요</FormHelperText>
									</Grid>
									<Grid item xs={6} md={3}>
										<FormControl fullWidth>
											<InputLabel htmlFor="basic">업종</InputLabel>
											<Select
												id="basic"
												name="basic"
												value={buildingInfo.sectors.basic}
												onChange={handleTyping('buildingInfo.sectors')}
											>
												{sectors
													.filter(sector => sector.type === 'basic')
													.map(sector => (
														<MenuItem key={sector.name} value={sector.name}>
															{sector.name}
														</MenuItem>
													))}
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={6} md={3}>
										<FormControl fullWidth>
											<InputLabel htmlFor="detail">상세 업종</InputLabel>
											<Select
												id="detail"
												value={buildingInfo.sectors.detail}
												name="detail"
												onChange={handleTyping('buildingInfo.sectors')}
											>
												{sectors
													.filter(sector => sector.type === 'detail')
													.map(sector => (
														<MenuItem key={sector.name} value={sector.name}>
															{sector.name}
														</MenuItem>
													))}
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={12} md={6}>
										<FormControl fullWidth className={classes.withoutLabel}>
											<Button
												variant="outlined"
												color="primary"
												onClick={handleSectorDialog(true)}
											>
												업종 추가
											</Button>
											<Dialog maxWidth="xs" fullWidth open={sectorDialog}>
												<DialogTitle>업종 추가</DialogTitle>
												<DialogContent>
													<Grid container spacing={3}>
														<Grid item xs={12} md={12}>
															<FormControl fullWidth>
																<InputLabel htmlFor="sectorType">
																	업종 분류
																</InputLabel>
																<Select
																	id="sectorType"
																	value={sectorType}
																	onChange={handleSectorType}
																>
																	<MenuItem value={'basic'}>기본</MenuItem>
																	<MenuItem value={'detail'}>상세</MenuItem>
																</Select>
															</FormControl>
														</Grid>
														<Grid item xs={12} md={12}>
															<TextField
																label="업종명"
																fullWidth
																value={sectorName}
																onChange={handleSectorName}
															/>
														</Grid>
													</Grid>
												</DialogContent>
												<DialogActions>
													<Button
														variant="outlined"
														color="secondary"
														onClick={handleSectorDialog(false)}
													>
														취소
													</Button>
													<Button
														variant="outlined"
														color="primary"
														onClick={handleSectorAdd(handleSectorDialog)}
													>
														추가
													</Button>
												</DialogActions>
											</Dialog>
										</FormControl>
									</Grid>
								</Grid>
							</ExpansionPanelDetails>
						</ExpansionPanel>
						<ExpansionPanel className={classes.panel}>
							<ExpansionPanelSummary expandIcon={<ExpandMore />}>
								<Typography variant="h6">거래 정보</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Grid container spacing={4}>
									<Grid item xs={12} md={12}>
										<Typography variant="subtitle1">매매</Typography>
									</Grid>
									<Grid item xs={4} md={4}>
										<TextField
											name="price"
											onChange={handleTyping('dealInfo.trade')}
											fullWidth
											type="number"
											variant="outlined"
											value={dealInfo.trade.price}
											label="평당 가격"
											InputProps={{
												endAdornment: <InputAdornment>만원</InputAdornment>,
											}}
										/>
									</Grid>
									<Grid item xs={4} md={4}>
										<TextField
											name="monthly"
											onChange={handleTyping('dealInfo.trade')}
											fullWidth
											label="월세"
											value={dealInfo.trade.monthly}
											variant="outlined"
											InputProps={{
												endAdornment: <InputAdornment>만원</InputAdornment>,
											}}
										/>
									</Grid>
									<Grid item xs={4} md={4}>
										<TextField
											name="deposit"
											onChange={handleTyping('dealInfo.trade')}
											fullWidth
											variant="outlined"
											label="보증금"
											value={dealInfo.trade.deposit}
											type="number"
											InputProps={{
												endAdornment: <InputAdornment>만원</InputAdornment>,
											}}
										/>
									</Grid>
									<Grid item xs={12} md={12}>
										<Typography variant="subtitle1">임대</Typography>
									</Grid>
									<Grid item xs={4} md={4}>
										<TextField
											name="price"
											onChange={handleTyping('dealInfo.lease')}
											fullWidth
											type="number"
											variant="outlined"
											value={dealInfo.lease.price}
											label="평당 가격"
											InputProps={{
												endAdornment: <InputAdornment>만원</InputAdornment>,
											}}
										/>
									</Grid>
									<Grid item xs={4} md={4}>
										<TextField
											name="monthly"
											type="number"
											onChange={handleTyping('dealInfo.lease')}
											fullWidth
											label="월세"
											value={dealInfo.lease.monthly}
											variant="outlined"
											InputProps={{
												endAdornment: <InputAdornment>만원</InputAdornment>,
											}}
										/>
									</Grid>
									<Grid item xs={4} md={4}>
										<TextField
											name="deposit"
											onChange={handleTyping('dealInfo.lease')}
											fullWidth
											variant="outlined"
											type="number"
											label="보증금"
											value={dealInfo.lease.deposit}
											InputProps={{
												endAdornment: <InputAdornment>만원</InputAdornment>,
											}}
										/>
									</Grid>
									<Grid item xs={12} md={12}>
										<Typography variant="subtitle1">보증금</Typography>
									</Grid>
									<Grid item xs={12} md={12}>
										<TextField
											name="rights"
											onChange={handleTyping('dealInfo')}
											fullWidth
											type="number"
											variant="outlined"
											label="권리금"
											value={dealInfo.rights}
											InputProps={{
												endAdornment: <InputAdornment>만원</InputAdornment>,
											}}
										/>
									</Grid>
								</Grid>
							</ExpansionPanelDetails>
						</ExpansionPanel>
						<ExpansionPanel>
							<ExpansionPanelSummary expandIcon={<ExpandMore />}>
								<Typography variant="h6">관계자 정보</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Grid container spacing={4}>
									<Grid item xs={12} md={12}>
										<Typography>소유자 정보</Typography>
									</Grid>
									<Grid item xs={6} md={6}>
										<TextField
											fullWidth
											required
											name="owner"
											label="이름"
											value={partyInfo.owner}
											onChange={handleTyping('partyInfo')}
											variant="outlined"
										/>
									</Grid>
									<Grid item xs={6} md={6}>
										<TextField
											fullWidth
											required
											name="ownerPhone"
											value={partyInfo.ownerPhone}
											label="전화번호"
											onChange={handleTyping('partyInfo')}
											variant="outlined"
										/>
									</Grid>
									<Grid item xs={12} md={12}>
										<Typography>임차인 정보</Typography>
									</Grid>
									<Grid item xs={6} md={6}>
										<TextField
											fullWidth
											required
											value={partyInfo.lessee}
											name="lessee"
											label="이름"
											onChange={handleTyping('partyInfo')}
											variant="outlined"
										/>
									</Grid>
									<Grid item xs={6} md={6}>
										<TextField
											fullWidth
											required
											name="lesseePhone"
											value={partyInfo.lesseePhone}
											label="전화번호"
											onChange={handleTyping('partyInfo')}
											variant="outlined"
										/>
									</Grid>
								</Grid>
							</ExpansionPanelDetails>
						</ExpansionPanel>
						<Box className={classes.btnContainer}>
							<Button
								type="submit"
								className={classes.submitBtn}
								variant="contained"
								color="primary"
							>
								건물 데이터 생성
							</Button>
						</Box>
					</Box>
				</Paper>
			</Container>
		</div>
	);
};

export default BuildingControlForm;
