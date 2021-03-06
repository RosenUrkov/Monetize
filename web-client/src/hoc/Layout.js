import React, { Fragment, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "./../store/actions/auth";
import { appRoutes, helperRoutes } from "../constants/routes";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    "@media (min-width:1600px)": {
      zoom: 1.25,
    },
    "@media (min-width:2200px)": {
      zoom: 1.5,
    },
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    "@media (min-width:1600px)": {
      zoom: 1.25,
    },
    "@media (min-width:2200px)": {
      zoom: 1.5,
    },
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  routesList: {
    "& a.active > div": {
      backgroundColor: "#babfdb",
    },
  },
  routesListItem: {
    textDecoration: "none",
    color: "#303F9F",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  container: {
    "@media (min-width:1600px)": {
      paddingTop: 20,
      zoom: 1.25,
    },
    "@media (min-width:2200px)": {
      paddingTop: 35,
      zoom: 1.5,
    },
  },
}));

const Layout = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const theme = useTheme();
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const logoutHandler = () => dispatch(logout());

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            Monetize
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>

        <Divider />

        <List className={classes.routesList}>
          {appRoutes
            .filter((route) => route.auth === !!auth.token)
            .map((route, index) => (
              <NavLink
                to={route.to}
                key={index}
                className={classes.routesListItem}
              >
                <ListItem button>
                  <ListItemIcon>
                    <route.icon />
                  </ListItemIcon>
                  <ListItemText primary={route.text} />
                </ListItem>
              </NavLink>
            ))}
        </List>

        <Divider />

        <List className={classes.routesList}>
          {helperRoutes
            .filter((route) => route.auth === !!auth.token)
            .map((route, index) => (
              <NavLink
                to={route.to}
                key={index}
                className={classes.routesListItem}
                onClick={
                  route.text === "Logout" ? () => logoutHandler() : () => {}
                }
              >
                <ListItem button>
                  <ListItemIcon>
                    <route.icon />
                  </ListItemIcon>
                  <ListItemText primary={route.text} />
                </ListItem>
              </NavLink>
            ))}
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.container}>{props.children}</div>
      </main>
    </div>
  );
};

export default Layout;
