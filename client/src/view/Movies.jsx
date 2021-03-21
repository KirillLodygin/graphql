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
		right: 0,
	},
}));

const Movies = () => {
	const styles = useStyles();
	const {data = {}} = useQuery(DIRECTORS_QUERY);
	const { directors = [] } = data;

	const [state, setState] = useState(
		{
			open: false,
		}
	);

	const handleClickOpen = (data = {}) => {
		setState({
			open: true,
			...data,
			directorId: data.director ? data.director.id : '',
		});
	};

	const handleClose = () => {
		setState({
			name: '',
			genre: '',
			watched: false,
			rate: 0,
			directorId: '',
			open: false
		});
	};

	const handleSelectChange = ({ target }) => {
		setState({...state, [target.name]: target.value });
	};

	const handleCheckboxChange = name => ({ target }) => {
		setState({...state, [name]: target.checked });
	};


	const handleChange = name => ({ target }) => {
		setState({...state, [name]: target.value });
	};

	const { id, name, genre, watched = false, rate = 0, directorId, open } = state;

	return (
		<>
			<MoviesForm
				handleChange={handleChange}
				handleCheckboxChange={handleCheckboxChange}
				handleSelectChange={handleSelectChange}
				selectedValue={{ id, name, genre, watched, rate, directorId }}
				open={open}
				onClose={handleClose}
				directors={directors}
			/>
			<div className={styles.wrapper}>
				<MoviesTable
					onOpen={handleClickOpen}
					onClose={handleClose}
				/>
				<Fab onClick={() => handleClickOpen()} color="primary" aria-label="Add" className={styles.fab}>
					<Add/>
				</Fab>
			</div>
		</>
	);
};

export default Movies;