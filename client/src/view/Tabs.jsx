import React, {useState} from "react";
import {AppBar, Tabs, Tab, Typography, makeStyles} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import {MovieCreation, Camera} from "@material-ui/icons";

import Movies from './Movies';
import Directors from './Directors';

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
		backgroundColor: '#212121',
	}
}));

const TabContainer = ({children, dir}) => (
	<Typography
		component="div"
		dir={dir}
		style={{padding: 8*3}}
	>
		{children}
	</Typography>
);

const SimpleTabs = ({theme}) => {
	const styles = useStyles();

	const [state, setState] = useState({value: 0});
	const {value} = state;

	const handleChange = (e, value) => { setState({value}) };
	const handleChangeIndex = (index) => { setState({value: index}) };

	return (
		<div className={styles.root}>
			<AppBar position="static">
				<Tabs
					variant="fullWidth"
					value={value}
					onChange={handleChange}
				>
					<Tab label="Movies" icon={<Camera/>}/>
					<Tab label="Directors" icon={<MovieCreation/>}/>
				</Tabs>
			</AppBar>
			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				onChangeIndex={handleChangeIndex}>
				<TabContainer dir={theme.direction}><Movies /></TabContainer>
				<TabContainer dir={theme.direction}><Directors /></TabContainer>
			</SwipeableViews>
		</div>
	);
};

export default SimpleTabs;