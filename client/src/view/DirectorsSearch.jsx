import React from 'react';
import {InputBase, makeStyles} from '@material-ui/core';
import Search from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
	search: {
		position: 'relative',
		width: '100%',
	},
	searchIcon: {
		width: theme.spacing(9),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
	},
	inputInput: {
		paddingTop: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		paddingLeft: theme.spacing(10),
	},
}));

const DirectorsSearch = () => {
	const styles = useStyles();

	return (
		<div className={styles.search}>
			<div className={styles.searchIcon}>
				<Search/>
			</div>
			<InputBase
				placeholder="Search…"
				classes={{
					root: styles.inputRoot,
					input: styles.inputInput,
				}}
			/>
		</div>
	);
};

export default DirectorsSearch;