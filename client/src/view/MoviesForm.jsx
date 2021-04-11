import React from 'react';
import {
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
	genre: yup.string().required("This field is a required"),
	rate: yup.string().required("This field is a required"),
	directorId: yup.string().required("This field is a required"),
	watched: yup.boolean()
});

const MoviesForm = ({open, handleChange, handleSelectChange, handleCheckboxChange, selectedValue = {}, onClose, directors}) => {
	const styles = useStyles();

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

	const handleSave = (data) => {
		console.log("!");
		console.log(data);
		selectedValue.id ?
			updateMovie({variables:{
				id: selectedValue.id,
					name: data.name,
					genre: data.genre,
					rate: Number(data.rate),
					directorId: data.directorId,
					watched: Boolean(data.watched)
			}}) :
			addMovie({variables:{
				name: data.name,
				genre: data.genre,
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
					value={utils.ucFirst(selectedValue.name)}
					onChange={handleChange('name')}
					error={!!errors?.name}
					helperText={errors?.name?.message}
				/>
				<Input
					ref={register}
					id="outlined-genre"
					label="Genre"
					name="genre"
					type="text"
					value={utils.ucFirstGenre(selectedValue.genre)}
					onChange={handleChange('genre')}
					error={!!errors?.genre}
					helperText={errors?.genre?.message}
				/>
				<Input
					ref={register}
					id="outlined-rate"
					label="Rate"
					name="rate"
					type="text"
					value={utils.onlyNum(selectedValue.rate)}
					onChange={handleChange('rate')}
					error={!!errors?.rate}
					helperText={errors?.rate?.message}
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
						value={selectedValue.directorId}
						onChange={handleSelectChange}
						error={!!errors?.directorId}
						as={
							<Select
								id="director-name"
								input={<OutlinedInput id="outlined-director" labelWidth={57}/>}
								helperText={errors?.directorId?.message}
							>
								{directors.map(director =>
									<MenuItem key={director.id} value={director.id}>
										{director.name}
									</MenuItem>)}
							</Select>
						}
					/>
					<div>{errors?.directorId?.message}</div>
				</FormControl>
				<div className={styles.wrapper}>
					<FormControlLabel
						control={
							<Checkbox
								checked={selectedValue.watched}
								defaultChecked={selectedValue.watched}
								name="watched"
								inputRef={register}
								onChange={handleCheckboxChange('watched')}
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