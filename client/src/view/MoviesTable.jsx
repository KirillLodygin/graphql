import React, {useState} from 'react';
import {
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Checkbox,
	IconButton,
	MenuItem,
	Menu,
	CircularProgress
} from '@material-ui/core';
import {MoreVert, Delete, Create} from '@material-ui/icons';

import MoviesDialog from './MoviesDialog';
import {useQuery} from "@apollo/client";
import {MOVIES_QUERY} from "../queries/moviesQuery";

const useStyles = makeStyles((theme) => ({
	searchRoot: {
		marginBottom: theme.spacing(3),
		minHeight: theme.spacing(6),
		display: 'flex',
	},
	root: {
		width: '100%',
		overflowX: 'auto',
	},
	loading: {
		margin: theme.spacing(4),
	}
}));

const MoviesTable = ({onOpen}) => {
	const styles = useStyles();

	const {loading, data = {}} = useQuery(MOVIES_QUERY);
	const {movies = []} = data;

	const [dialogState, setDialogState] = useState(
		{
			anchorEl: null
		}
	);

	const [openDialogState, setOpenDialogState] = useState(false);

	const changeDialogOpenState = () => {
		setOpenDialogState(!openDialogState);
	};


	const handleClick = ({currentTarget}, data) => {
		setDialogState({
			...dialogState,
			anchorEl: currentTarget,
			data,
		});
	};

	const handleClose = () => {
		setDialogState({...dialogState, anchorEl: null});
	};

	const handleEdit = () => {
		onOpen(dialogState.data);
		handleClose();
	};

	const handleDelete = () => {
		changeDialogOpenState();
		handleClose();
	};

	const {anchorEl, data: activeElem = {}} = dialogState;

	return (
		<>
			<MoviesDialog open={openDialogState} handleClose={changeDialogOpenState} id={activeElem.id}/>
			<Paper className={styles.root}>
				{
					loading ?
						<CircularProgress className={styles.loading}/>
						:
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Genre</TableCell>
									<TableCell align="left">Rate</TableCell>
									<TableCell>Director</TableCell>
									<TableCell>Watched</TableCell>
									<TableCell align="right"></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{movies.map(movie => {
									return (
										<TableRow key={movie.id}>
											<TableCell component="th" scope="row">{movie.name}</TableCell>
											<TableCell>{movie.genre}</TableCell>
											<TableCell align="left">{movie.rate}</TableCell>
											<TableCell>{movie.director.name}</TableCell>
											<TableCell>
												<Checkbox checked={movie.watched} disabled/>
											</TableCell>
											<TableCell align="right">
												<>
													<IconButton color="inherit" onClick={(e) => handleClick(e, movie)}>
														<MoreVert/>
													</IconButton>
													<Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)}
														  onClose={handleClose}>
														<MenuItem onClick={handleEdit}><Create/> Edit</MenuItem>
														<MenuItem onClick={handleDelete}><Delete/> Delete</MenuItem>
													</Menu>
												</>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
				}
			</Paper>
		</>
	);
};

export default MoviesTable;