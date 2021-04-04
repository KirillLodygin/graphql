import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import {DeleteForever, Block} from '@material-ui/icons';
import {useMutation} from '@apollo/client';
import { DELETE_MOVIE_MUTATION } from '../mutations/moviesMutations';
import { MOVIES_QUERY } from '../queries/moviesQuery';
import { DIRECTORS_QUERY } from '../queries/directorsQuery';

const MoviesDialog = ({open, handleClose, id}) => {
	const[delMovie] = useMutation(DELETE_MOVIE_MUTATION, {
		optimisticResponse: true,
		refetchQueries: [{ query: MOVIES_QUERY, variables: { name: '' } }, { query: DIRECTORS_QUERY, variables: { name: '' } }],
		awaitRefetchQueries: true,
	});

	const handleDelete = () => {
		delMovie({variables:{id: id}});
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
					<Block /> Cancel
				</Button>
				<Button onClick={handleDelete} color="primary" autoFocus>
					<DeleteForever/> Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default  MoviesDialog;