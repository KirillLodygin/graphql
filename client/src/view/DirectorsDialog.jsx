import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import {DeleteForever, Block} from '@material-ui/icons';
import { useMutation } from "@apollo/client";
import { DELETE_DIRECTOR_MUTATION } from "../mutations/directorsMutations";
import { DIRECTORS_QUERY } from '../queries/directorsQuery';
import { MOVIES_QUERY } from '../queries/moviesQuery';

const DirectorsDialog = ({open, handleClose, id}) => {

	const [delDirector] = useMutation(DELETE_DIRECTOR_MUTATION, {
		optimisticResponse: true,
		refetchQueries: [ { query: DIRECTORS_QUERY, variables: { name: '' } }, { query: MOVIES_QUERY, variables: { name: '' } } ],
		awaitRefetchQueries: true,
	});

	const  handleDelete = () => {
		delDirector({variables:{id: id}});
		handleClose();
	};

	const onClickAction = () => {
		handleClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{"Are you sire that you want to delete element?"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					If you click 'Confirm' this element will be removed from data base.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClickAction} color="primary">
					<Block/> Cancel
				</Button>
				<Button onClick={handleDelete} color="primary" autoFocus>
					<DeleteForever/> Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DirectorsDialog;