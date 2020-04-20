import React from 'react';
import {
	Typography,
	Grid,
	TextField,
	InputAdornment,
	FormGroup,
	FormControlLabel,
	Checkbox,
} from '@material-ui/core';

const DealInfoForm = ({ data, loading, state, setState, handler }) => {
	const {
		dealInfo,
		buildingInfo: { saleArea },
	} = state.formState;

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={12}>
				<FormGroup row>
					<FormControlLabel
						control={
							<Checkbox
								color="primary"
								onChange={handler.handleCheckState}
								checked={state.checkState.tradeCheck}
								name="tradeCheck"
							/>
						}
						label="매매"
					/>
					<FormControlLabel
						control={
							<Checkbox
								color="primary"
								onChange={handler.handleCheckState}
								checked={state.checkState.leaseCheck}
								name="leaseCheck"
							/>
						}
						label="임대"
					/>
				</FormGroup>
			</Grid>
			{state.checkState.tradeCheck && (
				<>
					<Grid item xs={12} md={12}>
						<Typography varaint="h5">매매</Typography>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							type="number"
							label="평당 가격"
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">원</InputAdornment>
								),
							}}
							onChange={handler.handleDealInfoFormState('trade')}
							name="price"
							value={parseInt(dealInfo.trade.price)}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							disabled
							type="number"
							label="총 가격"
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">원</InputAdornment>
								),
							}}
							value={parseInt(saleArea) * parseInt(dealInfo.trade.price)}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							type="number"
							label="월세"
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">원</InputAdornment>
								),
							}}
							onChange={handler.handleDealInfoFormState('trade')}
							name="monthly"
							value={parseInt(dealInfo.trade.monthly)}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							type="number"
							label="보증금"
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">원</InputAdornment>
								),
							}}
							onChange={handler.handleDealInfoFormState('trade')}
							name="deposit"
							value={parseInt(dealInfo.trade.deposit)}
						/>
					</Grid>
					<Grid item xs={12} md={12}></Grid>
					<Grid item xs={12} md={12}></Grid>
				</>
			)}
			{state.checkState.leaseCheck && (
				<>
					<Grid item xs={12} md={12}>
						<Typography varaint="h5">임대</Typography>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							type="number"
							label="월세"
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">원</InputAdornment>
								),
							}}
							onChange={handler.handleDealInfoFormState('lease')}
							name="monthly"
							value={parseInt(dealInfo.lease.monthly)}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							type="number"
							label="보증금"
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">원</InputAdornment>
								),
							}}
							onChange={handler.handleDealInfoFormState('lease')}
							name="deposit"
							value={parseInt(dealInfo.lease.deposit)}
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<TextField
							type="number"
							label="평당 가격"
							fullWidth
							disabled
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">원</InputAdornment>
								),
							}}
							onChange={handler.handleDealInfoFormState('lease')}
							name="price"
							value={Math.round(
								parseInt(dealInfo.lease.monthly) / parseInt(saleArea),
							)}
						/>
					</Grid>

					<Grid item xs={12} md={12}></Grid>
					<Grid item xs={12} md={12}></Grid>
				</>
			)}
			<Grid item xs={12} md={12}>
				<FormControlLabel
					control={
						<Checkbox
							color="primary"
							onChange={handler.handleCheckState}
							checked={state.checkState.rightsCheck}
							name="rightsCheck"
						/>
					}
					label="권리금"
				/>
			</Grid>
			{state.checkState.rightsCheck && (
				<>
					<Grid item xs={12} md={12}>
						<TextField
							type="number"
							label="권리금"
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">원</InputAdornment>
								),
							}}
							onChange={handler.handleFormState('dealInfo')}
							name="rights"
							value={parseInt(dealInfo.rights)}
						/>
					</Grid>
				</>
			)}
		</Grid>
	);
};

export default DealInfoForm;
