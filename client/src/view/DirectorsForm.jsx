import React, {useState, useEffect} from 'react';
import {useMutation} from '@apollo/client';
import {DialogTitle, Dialog, makeStyles} from '@material-ui/core';
import {Save} from '@material-ui/icons';
import { ADD_DIRECTOR_MUTATION, UPDATE_DIRECTOR_MUTATION } from '../mutations/directorsMutations';
import {DIRECTORS_QUERY} from "../queries/directorsQuery";
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {utils} from "../utils";
import Form from "./Form";
import Input from "./Input";
import PrimaryButton from "./Button";

const useStyles = makeStyles((theme) => ({
	title: {
		paddingBottom: 0,
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

const schema = yup.object().shape({
	name: yup.string().required("This field is a required"),
	age: yup.string().required("This field is a required"),
});

const DirectorsForm = ({selectedValue, open, onClose}) => {
	const styles = useStyles();

	const [formState, setFormState] = useState({
		name: '',
		age: ''
	});

	useEffect(() => {
		setFormState({name: selectedValue.name, age: selectedValue.age});
	},[selectedValue]);

	const [addDirector] = useMutation(ADD_DIRECTOR_MUTATION, {
		optimisticResponse: true,
		refetchQueries: [{ query: DIRECTORS_QUERY, variables: { name: '' } }],
		awaitRefetchQueries: true,
	});

	const [updateDirector] = useMutation(UPDATE_DIRECTOR_MUTATION, {
		optimisticResponse: true,
		refetchQueries: [{ query: DIRECTORS_QUERY, variables: { name: '' } }],
		awaitRefetchQueries: true,
	})

	const handleClose = () => {
		onClose();
	};

	const handleSave = (data) => {
		selectedValue.id ?
			updateDirector({variables: { id: selectedValue.id, name: data.name, age: Number(data.age) }}) :
			addDirector({variables: { name: data.name, age: Number(data.age)  }});
		onClose();
	};

	const {register, handleSubmit, errors} = useForm({
		mode: "onBlur",
		resolver: yupResolver(schema)
	});

	return (
		<Dialog onClose={handleClose} open={open} aria-labelledby="simple-dialog-title">
			<DialogTitle className={styles.title} id="simple-dialog-title">Director information</DialogTitle>
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
				<Input
					ref={register}
					id="outlined-rate"
					label="Age"
					name="age"
					type="text"
					value={formState.age}
					error={!!errors?.age}
					helperText={errors?.age?.message}
					onChange={(event) => {
						setFormState({...formState, age: utils.onlyNum(event.target.value)});
					}}
				/>
				<PrimaryButton>
					<Save/> Save
				</PrimaryButton>
			</Form>
		</Dialog>
	);
};

export default DirectorsForm;