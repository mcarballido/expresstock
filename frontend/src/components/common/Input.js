import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";

import { validate } from "../../util/validators";

const Input = (props) => {
  const [value, setValue] = useState(props.value || "");
  const [valid, setValid] = useState(!props.validators);
  const [blurred, setBlurred] = useState(false);

  const inputChangeHandler = (event) => {
    const { value } = event.target;

    setValue(value);

    if (!validate(value, props.validators) && valid) {
      setValid(false);
    } else if (validate(value, props.validators) && !valid) {
      setValid(true);
    }
  };

  const { onInput, name } = props;

  useEffect(() => {
    onInput(name, value, valid);
  }, [onInput, name, value, valid]);

  const inputBlurHandler = () => {
    if (!blurred) {
      if (!validate(value, props.validators) && valid) {
        setValid(false);
      }
      setBlurred(true);
    }
  };

  return (
    <TextField
      id={props.id}
      label={props.label}
      name={props.name}
      fullWidth={props.fullWidth}
      required={props.required}
      value={value}
      onChange={inputChangeHandler}
      error={!valid && blurred}
      helperText={!valid && blurred && props.errorText}
      onBlur={inputBlurHandler}
    />
  );
};

export default Input;
