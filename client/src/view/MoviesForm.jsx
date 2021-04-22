import React, {useState, useEffect} from 'react';
import {
	OutlinedInput,
	MenuItem,
	Select,
	Checkbox,
	FormLabel,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	InputLabel,
	Button,
	DialogTitle,
	Dialog,
	makeStyles
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { useMutation } from '@apollo/client';
import { ADD_MOVIE_MUTATION, UPDATE_MOVIE_MUTATION } from '../mutations/moviesMutations';
import { MOVIES_QUERY } from '../queries/moviesQuery';
import { DIRECTORS_QUERY } from '../queries/directorsQuery';
import {Controller, useForm} from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {utils} from "../utils";
import Form from "./Form";
import Input from "./Input";

const useStyles = makeStyles((theme) => ({
	title: {
		paddingBottom: 0,
	},
	formControl: {
		minWidth: 120,
	},
	formControlSelect: {
		marginTop: theme.spacing(2),
		width: '100%',
	},
	genresUsing: {
		marginTop: theme.spacing(2),
		marginLeft: theme.spacing(2),
		fontSize: '25px'
	},
	formLabel: {
		marginTop: theme.spacing(3),
	},
	genres: {
		marginTop: theme.spacing(1),
		padding: theme.spacing(1),
		display: 'flex',
		flexFlow: 'row wrap',
		width: '100%',
	},
	genresWrapper: {
		padding: theme.spacing(1),
		display: 'flex',
		flexFlow: 'row wrap',
		width: '100%',
	},
	genreCheckbox: {
		width: 'calc(30%)',
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

const schema = yup.object().shape({
	name: yup.string().required("This field is a required"),
	rate: yup.number().required(),
	drama: yup.boolean(),
	comedy: yup.boolean(),
	historical: yup.boolean(),
	military: yup.boolean(),
	adventure: yup.boolean(),
	crime: yup.boolean(),
	detective: yup.boolean(),
	science_fiction: yup.boolean(),
	western: yup.boolean(),
	fantasy: yup.boolean(),
	romantic: yup.boolean(),
	musical: yup.boolean(),
	directorId: yup.string().required("This field is a required"),
	watched: yup.boolean()
}).test(
	'myCustomTest',
	null,
	(obj) => {
		if (obj.drama || obj.comedy || obj.historical || obj.military || obj.adventure || obj.crime || obj.detective ||
			obj.science_fiction || obj.western || obj.fantasy || obj.romantic || obj.musical) {
			return true;
		}
		return new yup.ValidationError(
			'You must select at least one genre',
			null,
			'genre'
		);
	}
);

const MoviesForm = ({open, selectedValue = {}, onClose, directors}) => {
	const styles = useStyles();

	const [formState, setFormState] = useState({
		name: selectedValue.name,
		genre: selectedValue.genre,
		rate: selectedValue.rate,
		directorId: selectedValue.directorId,
		watched: selectedValue.watched
	});

	const [genreCheckBoxesState, setGenreCheckBoxesState] = useState({
		drama: false,
		comedy: false,
		historical: false,
		military: false,
		adventure: false,
		crime: false,
		detective: false,
		science_fiction: false,
		western: false,
		fantasy: false,
		romantic: false,
		musical: false
	});

	useEffect(() => {
		setFormState({
			name: selectedValue.name,
			genre: selectedValue.genre,
			rate: selectedValue.rate,
			directorId: selectedValue.directorId,
			watched: selectedValue.watched
		});

		(selectedValue.genre === null) ?
			setGenreCheckBoxesState({
				drama: false,
				comedy: false,
				historical: false,
				military: false,
				adventure: false,
				crime: false,
				detective: false,
				science_fiction: false,
				western: false,
				fantasy: false,
				romantic: false,
				musical: false
			}) :
			setGenreCheckBoxesState({
				drama: selectedValue.genre.includes('Drama'),
				comedy: selectedValue.genre.includes('Comedy'),
				historical: selectedValue.genre.includes('Historical'),
				military: selectedValue.genre.includes('Military'),
				adventure: selectedValue.genre.includes('Adventure'),
				crime: selectedValue.genre.includes('Crime'),
				detective: selectedValue.genre.includes('Detective'),
				science_fiction: selectedValue.genre.includes('Science_fiction'),
				western: selectedValue.genre.includes('Western'),
				fantasy: selectedValue.genre.includes('Fantasy'),
				romantic: selectedValue.genre.includes('Romantic'),
				musical: selectedValue.genre.includes('Musical')
			})
	},[selectedValue]);

	const [addMovie] = useMutation(ADD_MOVIE_MUTATION, {
		optimisticResponse: true,
		refetchQueries: [{ query: MOVIES_QUERY, variables: { name: '' } }, { query: DIRECTORS_QUERY, variables: { name: '' } }],
		awaitRefetchQueries: true,
	});

	const [updateMovie] = useMutation(UPDATE_MOVIE_MUTATION, {
		optimisticResponse: true,
		refetchQueries: [{ query: MOVIES_QUERY, variables: { name: '' } }, { query: DIRECTORS_QUERY, variables: { name: '' } }],
		awaitRefetchQueries: true,
	});

	const handleClose = () => {
		onClose();
	};

	const handleChangeCheckBox = (event) => {
		setGenreCheckBoxesState({...genreCheckBoxesState, [event.target.name]: event.target.checked });
	};

	const handleSave = (data) => {
		selectedValue.id ?
			updateMovie({variables:{
					id: selectedValue.id,
					name: data.name,
					genre: Object.entries(genreCheckBoxesState).filter(v => v[1]).map(v => utils.ucFirst(v[0])),
					rate: Number(data.rate),
					directorId: data.directorId,
					watched: Boolean(data.watched)
				}}) :
			addMovie({variables:{
					name: data.name,
					genre: Object.entries(genreCheckBoxesState).filter(v => v[1]).map(v => utils.ucFirst(v[0])),
					rate: Number(data.rate),
					directorId: data.directorId,
					watched: Boolean(data.watched)
				}});
		onClose();
	};

	const {register, handleSubmit, control, errors} = useForm({
		mode: "onBlur",
		resolver: yupResolver(schema)
	});

	return (
		<Dialog onClose={handleClose} open={open} aria-labelledby="simple-dialog-title">
			<DialogTitle className={styles.title} id="simple-dialog-title">Movie information</DialogTitle>
			<Form
				onSubmit={handleSubmit(handleSave)}
			>
				<Input
					ref={register}
					id="outlined-name"
					label="Name"
					name="name"
					type="text"
					value={formState.name}
					error={!!errors?.name}
					helperText={errors?.name?.message}
					onChange={(event) => {
						setFormState({...formState, name: utils.ucFirst(event.target.value)})
					}}
				/>
				<FormControl
					component="fieldset"
					name="genre"
					className={styles.genres}
					error={!!errors?.genre}
				>
					<FormLabel className={styles.formLabel}>Specify genre</FormLabel>
					<FormGroup
						className={styles.genresWrapper}
					>
						{
							Object.keys(genreCheckBoxesState).map(
								genre => (
									<FormControlLabel
										className={styles.genreCheckbox}
										control={<Checkbox
											checked={genreCheckBoxesState[genre]}
											inputRef={register}
											onChange={handleChangeCheckBox}
											name={genre} />}
										label={utils.ucFirst(genre)}
									/>
								)
							)
						}
					</FormGroup>
					<FormHelperText>{errors?.genre?.message}</FormHelperText>
				</FormControl>
				<Input
					ref={register}
					id="outlined-rate"
					label="Rate"
					name="rate"
					type="number"
					value={formState.rate}
					error={!!errors?.rate}
					helperText={errors?.rate?.message}
					onChange={(event) => {
						setFormState({...formState, rate: utils.rateInInterval(event.target.value)});
					}}
				/>
				<FormControl
					variant="outlined"
					className={styles.formControlSelect}
				>
					<InputLabel
						htmlFor="director-name-label"
					>
						Director
					</InputLabel>
					<Controller
						control={control}
						name="directorId"
						ref={register}
						defaultValue={formState.directorId}
						onChange={(event) => {
							setFormState({...formState, directorId: event.target.value});
						}}
						error={!!errors?.directorId}
						as={
							<Select
								id="director-name"
								input={<OutlinedInput id="outlined-director" labelWidth={57}/>}
							>
								{directors.map(director =>
									<MenuItem key={director.id} value={director.id}>
										{director.name}
									</MenuItem>)}
							</Select>
						}
					/>
					<FormHelperText>{errors?.directorId?.message}</FormHelperText>
				</FormControl>
				<div className={styles.wrapper}>
					<FormControlLabel
						control={
							<Checkbox
								checked={formState.watched}
								name="watched"
								inputRef={register}
								onChange={(event) => {
									setFormState({...formState, watched: event.target.checked});
								}}
							/>}
						label="Watched movie"
					/>
					<Button variant="contained" type="submit" color="primary" className={styles.button}>
						<SaveIcon /> Save
					</Button>
				</div>
			</Form>
		</Dialog>
	);
};

export default MoviesForm;