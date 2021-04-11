import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 100,
        minHeight: 48,
    },
    wrapper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'flex-end',
    },
}));

const PrimaryButton = ({children, ...props}) => {
    const styles = useStyles();

    return(
       <div className={styles.wrapper}>
           <Button
               className={styles.root}
               type="submit"
               fullWidth
               variant="contained"
               color="primary"
               {...props}
           >
               {children}
           </Button>
       </div>
    );
};

export default PrimaryButton;