import React, {useState} from 'react';
import {
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	IconButton,
	MenuItem,
	Checkbox,
	Menu,
	CircularProgress,
	RadioGroup,
	Radio,
	FormControl,
	FormControlLabel,
	FormLabel,
	Typography
} from '@material-ui/core';
import {MoreVert, Delete, Create} from '@material-ui/icons';
import {useQuery, useMutation} from "@apollo/client";
import {MOVIES_QUERY} from "../queries/moviesQuery";
import { DELETE_MOVIE_MUTATION } from '../mutations/moviesMutations';

import MoviesDialog from './MoviesDialog';
import MoviesSearch from './MoviesSearch';
import MoviesForm from './MoviesForm';

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
	},
	watchedCell: {
		marginTop: '45px'
	},
	formControlLabel: {
		fontSize: '0.7rem',
		'& label': { fontSize: '0.5rem' }
	}
}));

const MoviesTable = ({directors, onClose, onOpen, open}) => {
	const styles = useStyles();

	const [dialogState, setDialogState] = useState(
		{
			anchorEl: null,
			name: '',
			films: 'all'
		}
	);

	const[delMovie] = useMutation(DELETE_MOVIE_MUTATION, {
		optimisticResponse: true,
		awaitRefetchQueries: true,
	});

	const {loading, data = {}, fetchMore} = useQuery(MOVIES_QUERY, {
		variables: { name: '' },
		notifyOnNetworkStatusChange: true
	});

	const {movies = []} = data;

	movies.forEach(movie => {
		if (movie.director === null) delMovie({variables:{id: movie.id}});
	});

	const [openDialogState, setOpenDialogState] = useState(false);

	const btnHandleChange = (event) => {
		setDialogState({...dialogState, films: event.target.value});
	}

	const changeDialogOpenState = () => {
		setOpenDialogState(!openDialogState);
	};

	const handleChange = name => (event) => {
		setDialogState({
			...dialogState,
			[name]: event.target.value
		});
	};

	const handleSearch = (e) => {
		const { name } = dialogState;

		const updateQuery = (prev, { fetchMoreResult }) => (!fetchMoreResult) ? prev : fetchMoreResult;

		fetchMore({
			variables: { name },
			updateQuery
		});
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
		onOpen();
		handleClose();
	};

	const handleMoviesFormClose = () => {
		setDialogState({...dialogState, data: {}});
		onClose();
	};

	const handleDelete = () => {
		changeDialogOpenState();
		handleClose();
	};

	const {anchorEl, name, films, data: activeElem = {}} = dialogState;

	return (
		<>
			<Paper>
				<MoviesSearch
					name={name}
					handleChange={handleChange}
					handleSearch={handleSearch}
				/>
			</Paper>
			<MoviesForm
				selectedValue={
					{
						id: (activeElem.id) ? activeElem.id : null,
						name: (activeElem.name) ? activeElem.name : '',
						genre: (activeElem.genre) ? activeElem.genre : null,
						watched: activeElem.watched,
						rate: (activeElem.rate) ? activeElem.rate : 0,
						directorId: (activeElem.director) ? activeElem.director.id : ''
					}
				}
				open={open}
				onClose={handleMoviesFormClose}
				directors={directors}
			/>
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
									<TableCell>
										<FormControl
											component="fieldset"
											className={styles.watchedCell}
										>
											<FormLabel component="genre">Watched</FormLabel>
											<RadioGroup row
														aria-label="films"
														name="films"
														value={films}
														onChange={btnHandleChange}
											>
												<FormControlLabel value="all" control={<Radio />} label={<Typography className={styles.formControlLabel}>All</Typography>} />
												<FormControlLabel value="watched"  control={<Radio />} label={<Typography className={styles.formControlLabel}>Watched</Typography>} />
												<FormControlLabel value="unwatched" control={<Radio />} label={<Typography className={styles.formControlLabel}>Unwatched</Typography>} />
											</RadioGroup>
										</FormControl>
									</TableCell>
									<TableCell align="right"></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{movies.filter((movie) => {
									if (films === 'all') {
										return  movie.director !== null
									} else {
										if ( movie.director !== null) {
											return movie.watched === (films === "watched")
										}
									}
								}).map(movie => {
									return (
										<TableRow key={movie.id}>
											<TableCell component="th" scope="row">{movie.name}</TableCell>
											<TableCell>{(!movie.genre) ? '' :
												movie.genre.map(genre => <div key={genre}>{genre}</div>)}</TableCell>
											<TableCell align="left">{movie.rate}</TableCell>
											<TableCell>{movie.director.name}</TableCell>
											<TableCell>
												<Checkbox checked={movie.watched} disabled />
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