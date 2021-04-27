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
import {useQuery} from "@apollo/client";
import {DIRECTORS_QUERY} from "../queries/directorsQuery";

import DirectorsForm from './DirectorsForm';
import DirectorsDialog from './DirectorsDialog';
import DirectorsSearch from './DirectorsSearch';


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

const DirectorsTable = ({open, onClose, onOpen}) => {
	const styles = useStyles();

	const {loading, data = {}, fetchMore} = useQuery(DIRECTORS_QUERY, {
		variables: { name: '' },
		notifyOnNetworkStatusChange: true,
	});
	const {directors = []} = data;

	const [isOpenDialogState, setOpenDialogState] = useState(false);

	const changeDialogOpenState = () => {
		setOpenDialogState(!isOpenDialogState);
	};

	const [dialogState, setDialogState] = useState(
		{
			anchorEl: null,
			name: ''
		}
	);

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

	const handleDirFormClose = () => {
		setDialogState({...dialogState, data: {}});
		onClose();
	};

	const handleDelete = () => {
		changeDialogOpenState();
		handleClose();
	};

	const {anchorEl, name, data: activeElem = {}} = dialogState;

	return (
		<>
			<Paper>
				<DirectorsSearch
					name={name}
					handleChange={handleChange}
					handleSearch={handleSearch}
				/>
			</Paper>
			<DirectorsForm
				selectedValue={
					{
						name: (activeElem.name) ? activeElem.name : '',
						age: (activeElem.age) ? activeElem.age : '',
						id: (activeElem.id) ? activeElem.id : null
					}
				}
				open={open}
				onClose={handleDirFormClose} />
			<DirectorsDialog open={isOpenDialogState} handleClose={changeDialogOpenState} id={activeElem.id}/>
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