import React, { forwardRef } from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

const Input = forwardRef((props, ref) => {
  const styles = useStyles();

  return (
    <TextField
      className={styles.root}
      variant="outlined"
      margin="normal"
      inputRef={ref}
      fullWidth
      {...props}
    />
  );
});

export default Input;
