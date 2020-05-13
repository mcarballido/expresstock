import React, { useState } from 'react';
import { Grid, Typography, Button, Box, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../util/validators';
import { preserializeFormInputs } from '../util/httpParsers';
import Input from './common/Input';
import { useFormData } from '../hooks/useFormData';

const useStyles = makeStyles(theme => ({
  buttonsContainer: {
    justifyContent: 'center',
    display: 'flex'
  },
  title: {
    marginTop: 32
  },
  button: {
    marginTop: 32
  }
}));

const ProductTypeForm = () => {
  const INITIAL_INPUTS = {
    name: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: true
    }
  };

  const classes = useStyles();
  const [formState, inputHandler, setFormData] = useFormData(INITIAL_INPUTS, false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const onFormSubmit = async event => {
    event.preventDefault();

    const data = preserializeFormInputs(formState.inputs);

    try {
      await axios.post("http://localhost:8080/api/product_types", data);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Entity was not saved: ' + error);
    }
  };

  const snackbarCloseHandler = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <React.Fragment>
      <form onSubmit={onFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography align="center" variant="h5" className={classes.title}>
              Create a Product Type
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Input
              id="standard"
              label="Name"
              name="name"
              fullWidth
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
              errorText="The input value is not valid. It is required and it should have at least 5 characters."
              onInput={inputHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              id="standard"
              label="Description"
              name="description"
              fullWidth
              multiline
              onInput={inputHandler}
            />
          </Grid>
        </Grid>
        <Box className={classes.buttonsContainer}>
          <Button
            disabled={!formState.isValid}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className={classes.button}
            fullWidth
          >
            Save
          </Button>
        </Box>
      </form>
      <Snackbar
        message="Entity saved successfully!"
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={snackbarCloseHandler}
      />
    </React.Fragment>
  );
};

export default ProductTypeForm;
