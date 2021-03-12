import React from 'react';
import {TextField, Button, DialogTitle, Dialog, makeStyles} from '@material-ui/core';
import {Save} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	container: {
		padding: theme.spacing(2),
	},
	title: {
		paddingBottom: 0,
	},
	textField: {
		width: '100%',
	},
	formControl: {
		margin: theme.spacing,
		minWidth: 120,
	},
	wrapper: {
		marginTop: theme.spacing(2),
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		minWidth: 100,
		minHeight: 48,
	},
}));

const DirectorsForm = ({open, handleChange, selectedValue = {}, onClose}) => {
	const styles = useStyles();

	const handleClose = () => {
		onClose();
	};

	const handleSave = () => {
		const { id, name, age } = selectedValue;
		onClose();
	};

	const { name, age } = selectedValue;

	return (
		<Dialog onClose={handleClose} open={open} aria-labelledby="simple-dialog-title">
			<DialogTitle className={styles.title} id="simple-dialog-title">Director information</DialogTitle>
			<form className={styles.container} noValidate autoComplete="off">
				<TextField
					id="outlined-name"
					label="Name"
					className={styles.textField}
					value={name}
					onChange={handleChange('name')}
					margin="normal"
					variant="outlined"
				/>
				<TextField
					id="outlined-rate"
					label="Age"
					className={styles.textField}
					value={age}
					onChange={handleChange('age')}
					type="number"
					margin="normal"
					variant="outlined"
				/>
				<div className={styles.wrapper}>
					<Button onClick={handleSave} variant="contained" color="primary" className={styles.button}>
						<Save/> Save
					</Button>
				</div>
			</form>
		</Dialog>
	);
};

export default DirectorsForm;