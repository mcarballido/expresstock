import React from 'react';
import { Container } from '@material-ui/core';

import ProductTypeForm from './components/ProductTypeForm';

const App = () => {
  return (
    <Container maxWidth="md">
      <ProductTypeForm />
    </Container>
  );
};

export default App;
