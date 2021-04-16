import React, {useState} from 'react';
import {Fab, makeStyles} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import {useQuery} from "@apollo/client";
import {DIRECTORS_QUERY} from '../queries/directorsForMovies'

import MoviesTable from './MoviesTable';
import MoviesForm from './MoviesForm';

const useStyles = makeStyles(() => ({
	wrapper: {
		position: 'relative',
		minHeight: 'calc(100vh - 24px * 2 - 72px)',
	},
	fab: {
		position: 'absolute',
		bottom: 0,
		right: '60px',
	},
}));

const Movies = () => {
	const styles = useStyles();
	const {data = {}} = useQuery(DIRECTORS_QUERY, {variables: { name: '' }});
	const { directors = [] } = data;

	const [state, setState] = useState({open: false});

	const handleClickOpen = () => {
		setState({open: true});
	};

	const handleClose = () => {
		setState({open: false});
	};

	const { open } = state;

	return (
		<>
			<MoviesForm
				selectedValue={{ id: null, name: '', genre: null, watched: false, rate: 0, directorId: '' }}
				open={open}
				onClose={handleClose}
				directors={directors}
			/>
			<div className={styles.wrapper}>
				<MoviesTable
					directors={directors}
				/>
				<Fab onClick={() => handleClickOpen()} color="primary" aria-label="Add" className={styles.fab}>
					<Add/>
				</Fab>
			</div>
		</>
	);
};

export default Movies;