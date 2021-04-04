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

import DirectorsDialog from './DirectorsDialog';
import {useQuery} from "@apollo/client";
import {DIRECTORS_QUERY} from "../queries/directorsQuery";

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

const DirectorsTable = ({onOpen}) => {
	const styles = useStyles();

	const {loading, data = {}} = useQuery(DIRECTORS_QUERY);
	const {directors = []} = data;


	const [dialogState, setDialogState] = useState(
		{
			anchorEl: null,
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
			<DirectorsDialog open={openDialogState} handleClose={changeDialogOpenState} id={activeElem.id}/>
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