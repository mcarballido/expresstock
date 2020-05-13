
export const preserializeFormInputs = inputs => {
  const body = {};

  for (const field in inputs) {
    let bodyProp = field;
    let value = inputs[field].value;
    if (field.endsWith('Id')) {
      bodyProp = field.substring(0, field.length - 2);

      value = { id: value };
    }

    body[bodyProp] = value;
  }

  return body;
};