import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    }
}));

const Form = ({children, ...props}) => {
    const styles = useStyles();

    return(
        <form className={styles.root} noValidate autoComplete="off" {...props}>
            {children}
        </form>
    );
};

export default Form;