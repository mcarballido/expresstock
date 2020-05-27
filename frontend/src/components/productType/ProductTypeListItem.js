import React, { useState } from "react";
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Avatar,
  Menu,
  MenuItem
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const ProductTypeListItem = props => {
  const [anchorElement, setAnchorElement] = useState(null);

  const handleClick = event => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <React.Fragment>
      <ListItem>
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText primary={props.title} />
        <ListItemSecondaryAction>
          <IconButton aria-label="options" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Menu id="simple-menu" anchorEl={anchorElement} keepMounted open={Boolean(anchorElement)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default ProductTypeListItem;
