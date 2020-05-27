import React, { useState } from "react";
import clsx from "clsx";
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  List
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import StorageIcon from "@material-ui/icons/Storage";
import { makeStyles } from "@material-ui/core/styles";

import ProductTypePage from "./components/productType/ProductTypePage";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  }
}));

const App = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const drawerOpenHandler = () => {
    setOpen(true);
  };

  const drawerCloseHandler = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <AppBar position="sticky" className={clsx(classes.appBar, { [classes.appBarShift]: open })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={drawerOpenHandler}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Expresstock
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={drawerCloseHandler}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="productTypes">
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText primary="Product Types" />
          </ListItem>
        </List>
      </Drawer>
      {/* Container */}
      <Container maxWidth="md">
        <ProductTypePage />
      </Container>
    </React.Fragment>
  );
};

export default App;
