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
import {useMutation} from '@apollo/client';
import { ADD_MOVIE_MUTATION } from '../mutations/moviesMutations';
import { MOVIES_QUERY } from '../queries/moviesQuery';
import { DIRECTORS_QUERY } from '../queries/directorsQuery';

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

const MoviesForm = ({open, handleChange, handleSelectChange, handleCheckboxChange, selectedValue = {}, onClose, directors}) => {
	const styles = useStyles();

	const [addMovie] = useMutation(ADD_MOVIE_MUTATION, {
		refetchQueries: [{ query: MOVIES_QUERY }, { query: DIRECTORS_QUERY}],
		awaitRefetchQueries: true,
	});

	const handleClose = () => {
		onClose();
	};

	const handleSave = () => {
		const { id, name, genre, rate, directorId, watched } = selectedValue;
		if (name && genre && directorId) {
			addMovie({variables:{ id, name, genre, rate: Number(rate), directorId, watched: Boolean(watched) }});
			onClose();
		}
	};

	const ucFirst = (str) => {
		if (!str) return str;
		return str[0].toUpperCase() + str.slice(1);
	};

	const ucFirstGenre = (str) => {
		if (!str) return str;
		let arr = str.split('-');
		return arr.map(item => (item === "") ? item : item[0].toUpperCase() + item.slice(1)).join('-');
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
					value={ucFirst(name)}
					onChange={handleChange('name')}
					margin="normal"
					variant="outlined"
				/>
				<TextField
					id="outlined-genre"
					label="Genre"
					className={styles.textField}
					value={ucFirstGenre(genre)}
					onChange={handleChange('genre')}
					margin="normal"
					variant="outlined"
				/>
				<TextField
					id="outlined-rate"
					label="Rate"
					value={Math.abs(rate)}
					onChange={handleChange('rate')}
					type="number"
					className={styles.textField}
					margin="normal"
					variant="outlined"
				/>
				<FormControl variant="outlined" className={styles.formControlSelect}>
					<InputLabel
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