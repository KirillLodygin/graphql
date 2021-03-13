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
import {useQuery} from '@apollo/client';
import {MOVIES_QUERY} from '../queries/moviesQuery';

import MoviesDialog from './MoviesDialog';

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

	const [state, setState] = useState(
		{
			anchorEl: null,
			openDialog: false,
		}
	);

	const handleDialogOpen = () => {
		setState({openDialog: true});
	};
	const handleDialogClose = () => {
		setState({openDialog: false});
	};

	const handleClick = ({currentTarget}, data) => {
		setState({
			anchorEl: currentTarget,
			data,
		});
	};

	const handleClose = () => {
		setState({anchorEl: null});
	};

	const handleEdit = () => {
		onOpen(state.data);
		handleClose();
	};

	const handleDelete = () => {
		handleDialogOpen();
		handleClose();
	};

	const {anchorEl, openDialog, data: activeElem = {}} = state;

	return (
		<>
			<MoviesDialog open={openDialog} handleClose={handleDialogClose} id={activeElem.id}/>
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