import React from 'react';
import {
	TextField,
	OutlinedInput,
	MenuItem,
	Select,
	Checkbox,
	FormControl,
	FormControlLabel,
	InputLabel,
	Button,
	DialogTitle,
	Dialog,
	makeStyles
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

const directors = [
	{ id: 1, name: 'Quentin Tarantino', age: 55, movies: [ { name: 'Movie 1' }, { name: 'Movie 2' } ] },
	{ id: 2, name: 'Guy Ritchie', age: 50, movies: [ { name: 'Movie 1' }, { name: 'Movie 2' } ] }
];

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
		minWidth: 120,
	},
	formControlSelect: {
		marginTop: theme.spacing(2),
		width: '100%',
	},
	wrapper: {
		marginTop: theme.spacing(2),
		display: 'flex',
		justifyContent: 'space-between',
	},
	button: {
		minWidth: 100,
	}
}));

const MoviesForm = ({open, handleChange, handleSelectChange, handleCheckboxChange, selectedValue = {}, onClose}) => {
	const styles = useStyles();

	const handleClose = () => {
		onClose();
	};

	const handleSave = () => {
		const { id, name, genre, rate, directorId, watched } = selectedValue;
		onClose();
	};

	const { name, genre, rate, directorId, watched } = selectedValue;

	return (
		<Dialog onClose={handleClose} open={open} aria-labelledby="simple-dialog-title">
			<DialogTitle className={styles.title} id="simple-dialog-title">Movie information</DialogTitle>
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
					id="outlined-genre"
					label="Genre"
					className={styles.textField}
					value={genre}
					onChange={handleChange('genre')}
					margin="normal"
					variant="outlined"
				/>
				<TextField
					id="outlined-rate"
					label="Rate"
					value={rate}
					onChange={handleChange('rate')}
					type="number"
					className={styles.textField}
					margin="normal"
					variant="outlined"
				/>
				<FormControl variant="outlined" className={styles.formControlSelect}>
					<InputLabel
						/*ref={ref => { this.InputLabelRef = ref; }}*/
						htmlFor="outlined-age-simple"
					>
						Director
					</InputLabel>
					<Select
						value={directorId}
						onChange={handleSelectChange}
						input={<OutlinedInput name="directorId" id="outlined-director" labelWidth={57} />}
					>
						{directors.map(director => <MenuItem key={director.id} value={director.id}>{director.name}</MenuItem>)}
					</Select>
				</FormControl>
				<div className={styles.wrapper}>
					<FormControlLabel
						control={<Checkbox checked={watched} onChange={handleCheckboxChange('watched')} value="watched" />}
						label="Watched movie"
					/>
					<Button onClick={handleSave} variant="contained" color="primary" className={styles.button}>
						<SaveIcon /> Save
					</Button>
				</div>
			</form>
		</Dialog>
	);
};

export default MoviesForm;