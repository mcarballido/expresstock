import React, { useState, useReducer } from 'react';
import { Grid, Typography, Button, Box, Snackbar, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, validate } from '../../util/validators';
import { preserializeFormInputs } from '../../util/httpParsers';

const useStyles = makeStyles(theme => ({
  buttonsContainer: {
    justifyContent: 'center',
    display: 'flex'
  },
  title: {
    marginTop: 100
  },
  button: {
    marginTop: 32
  }
}));

const INITIAL_STATE = {
  inputs: {
    name: {
      value: '',
      valid: false,
      validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]
    },
    description: {
      value: '',
      valid: true
    }
  },
  formValid: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'valueChanged': {
      const { prop, value } = action.payload;
      const valid = validate(value, state.inputs[prop].validators);
      let formValid = true;
      for (const field in state.inputs) {
        formValid = formValid && (
          field === prop ? valid : state.inputs[field].valid
        );
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [prop]: {
            ...state.inputs[prop],
            value,
            valid
          }
        },
        formValid
      };
    }
    case 'blurred': {
      const { prop } = action.payload;
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [prop]: {
            ...state.inputs[prop],
            blurred: true
          }
        }
      };
    }
    case 'formCleared': {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

const ProductTypeForm = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const inputChangeHandler = event => {
    dispatch({ type: 'valueChanged', payload: { prop: event.target.name, value: event.target.value } });
  };

  const inputBlurHandler = event => {
    if (!state.inputs[event.target.name].blurred) {
      dispatch({ type: 'blurred', payload: { prop: event.target.name } });
    }
  };

  const formSubmitHandler = async event => {
    event.preventDefault();

    const data = preserializeFormInputs(state.inputs);

    try {
      await axios.post("http://localhost:8080/api/product_types", data);
      setSnackbarOpen(true);
      dispatch({ type: 'formCleared' });
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
      <form onSubmit={formSubmitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography align="center" variant="h5" className={classes.title}>
              Create a Product Type
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard"
              label="Name"
              name="name"
              fullWidth
              value={state.inputs.name.value}
              onChange={inputChangeHandler}
              onBlur={inputBlurHandler}
              error={!state.inputs.name.valid && state.inputs.name.blurred}
              helperText={
                !state.inputs.name.valid && state.inputs.name.blurred
                  ? "The input value is not valid. It is required and it should have at least 5 characters."
                  : null
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard"
              label="Description"
              name="description"
              fullWidth
              multiline
              value={state.inputs.description.value}
              onChange={inputChangeHandler}
              onBlur={inputBlurHandler}
            />
          </Grid>
        </Grid>
        <Box className={classes.buttonsContainer}>
          <Button
            disabled={!state.formValid}
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
