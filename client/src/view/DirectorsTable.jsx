import React, {useState} from 'react';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	IconButton,
	MenuItem,
	Menu,
	CircularProgress,
	makeStyles
} from '@material-ui/core';
import {MoreVert, Delete, Create} from '@material-ui/icons';
import {useQuery} from '@apollo/client';
import {DIRECTORS_QUERY} from '../queries/directorsQueries';

import DirectorsDialog from './DirectorsDialog';

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

const DirectorsTable = ({onOpen, onClose}) => {
	const styles = useStyles();
	const {loading, data = {}} = useQuery(DIRECTORS_QUERY);
	const {directors = []} = data;

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
		this.setState({
			anchorEl: currentTarget,
			data,
		});
	};

	const handleClose = () => {
		setState({anchorEl: null});
	};

	const handleEdit = (row) => {
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
			<DirectorsDialog open={openDialog} handleClose={handleDialogClose} id={activeElem.id}/>
			<Paper className={styles.root}>
				{
					loading ?
						<CircularProgress className={styles.loading}/>
						:
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell align="left">Age</TableCell>
									<TableCell>Movies</TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{directors.map(director => {
									return (
										<TableRow key={director.id}>
											<TableCell component="th" scope="row">{director.name}</TableCell>
											<TableCell align="left">{director.age}</TableCell>
											<TableCell>
												{director.movies.map((movie, key) => <div
													key={movie.name}>{`${key + 1}. `}{movie.name}</div>)}
											</TableCell>
											<TableCell align="right">
												<>
													<IconButton color="inherit"
																onClick={(e) => handleClick(e, director)}>
														<MoreVert/>
													</IconButton>
													<Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)}
														  onClose={handleClose}>
														<MenuItem
															onClick={() => handleEdit(director)}><Create/> Edit</MenuItem>
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

export default DirectorsTable;