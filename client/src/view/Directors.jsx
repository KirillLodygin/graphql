import React, {useState} from 'react';
import {Fab, makeStyles} from '@material-ui/core';
import Add from '@material-ui/icons/Add';

import DirectorsTable from './DirectorsTable';
import DirectorsForm from './DirectorsForm';

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

const Directors = () => {
	const styles = useStyles();

	const [state, setState] = useState(
		{
			open: false,
			name: '',
			age: 0,
		}
	);

	const handleClickOpen = (data) => {
		setState({
			open: true,
			...data,
		});
	};

	const handleClose = () => {
		setState({ name: '', age: 0, id: null, open: false });
	};

	const handleChange = name => ({ target }) => {
		setState({ [name]: target.value });
	};

	const { id, name, age, open } = state;

	return (
		<>
			<DirectorsForm
				handleChange={handleChange}
				selectedValue={{ name, age, id }}
				open={open}
				onClose={handleClose} />
			<div className={styles.wrapper}>
				<DirectorsTable onOpen={handleClickOpen} onClose={handleClose} />
				<Fab onClick={() => handleClickOpen(null)} color="primary" aria-label="Add" className={styles.fab}>
					<Add/>
				</Fab>
			</div>
		</>
	);
};

export default Directors;