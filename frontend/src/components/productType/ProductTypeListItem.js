import React from "react";
import { ListItem, ListItemSecondaryAction, ListItemText, ListItemAvatar, IconButton, Avatar } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const ProductTypeListItem = props => {
  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary={`Line item ${props.value + 1}`} />
      <ListItemSecondaryAction>
        <IconButton aria-label="options">
          <MoreVertIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ProductTypeListItem;
