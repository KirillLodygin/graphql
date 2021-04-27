import React, {useState} from 'react';
import {Fab, makeStyles} from '@material-ui/core';
import Add from '@material-ui/icons/Add';

import DirectorsTable from './DirectorsTable';

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

const Directors = () => {
	const styles = useStyles();

	const [state, setState] = useState({ open: false });

	const handleClickOpen = () => {
		setState({
			open: true,
		});
	};

	const handleClickClose = () => {
		setState({
			open: false
		});
	};

	const { open } = state;

	return (
		<>
			<div className={styles.wrapper}>
				<DirectorsTable
					open={open}
					onClose={handleClickClose}
					onOpen={handleClickOpen}
				/>
				<Fab onClick={() => handleClickOpen()} color="primary" aria-label="Add" className={styles.fab}>
					<Add/>
				</Fab>
			</div>
		</>
	);
};

export default Directors;