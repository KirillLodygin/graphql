import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import {DeleteForever, Block} from '@material-ui/icons';

const MoviesDialog = ({open, handleClose, id}) => {
	const handleDelete = () => {
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
				<Button onClick={handleClose} color="primary">
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