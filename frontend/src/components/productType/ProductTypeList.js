import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";

import ProductTypeListItem from "./ProductTypeListItem";

const useStyles = makeStyles(theme => ({
  listRoot: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

const ProductTypeList = () => {
  const classes = useStyles();

  return (
    <div>
      <List className={classes.listRoot}>
        {[0, 1, 2, 3].map(value => {
          return <ProductTypeListItem key={value} value={value} />;
        })}
      </List>
    </div>
  );
};

export default ProductTypeList;
