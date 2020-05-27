import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, Typography } from "@material-ui/core";

import ProductTypeListItem from "./ProductTypeListItem";

const useStyles = makeStyles(theme => ({
  listRoot: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

const ProductTypeList = props => {
  const classes = useStyles();

  return (
    <List className={classes.listRoot}>
      {props.items && props.items.length ? (
        props.items.map(item => <ProductTypeListItem key={item.id} title={item.name} />)
      ) : (
          <Typography align="center" variant="h5">No se encontraron productos</Typography>
        )}
    </List>
  );
};

export default ProductTypeList;
