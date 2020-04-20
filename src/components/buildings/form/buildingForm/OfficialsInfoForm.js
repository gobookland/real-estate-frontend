import React from 'react';
import { useMediaQuery, Grid, TextField } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const OfficialsInfoForm = ({ handler, state, setState, data, loading }) => {
	const theme = useTheme();
	const breakPoint = useMediaQuery(theme.breakpoints.down('xs'));

	const { officialsInfo } = state.formState;

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={6}>
				<TextField
					label="주인 이름"
					value={officialsInfo.owner}
					fullWidth
					onChange={handler.handleFormState('officialsInfo')}
					name="owner"
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label="주인 연락처"
					value={officialsInfo.ownerPhone}
					fullWidth
					helperText="-를 제외하고 입력해주세요"
					onChange={handler.handleFormState('officialsInfo')}
					name="ownerPhone"
				/>
			</Grid>
			{breakPoint && <Grid item xs={12} md={12}></Grid>}
			<Grid item xs={12} md={6}>
				<TextField
					label="임차인 이름"
					value={officialsInfo.lessee}
					fullWidth
					onChange={handler.handleFormState('officialsInfo')}
					name="lessee"
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label="임차인 연락처"
					value={officialsInfo.lesseePhone}
					fullWidth
					helperText="-를 제외하고 입력해주세요"
					onChange={handler.handleFormState('officialsInfo')}
					name="lesseePhone"
				/>
			</Grid>
		</Grid>
	);
};

export default OfficialsInfoForm;
