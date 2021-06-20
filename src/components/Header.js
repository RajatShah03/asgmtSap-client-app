import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';

const links = [
  {
    to: '/',
    label: 'Home',
    hover: 'Allows to add users'
  },
  {
    to: '/details',
    label: 'Details',
    hover: 'Renders a list of all users'
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            App
          </Typography>
          {links.map(link => (
            <Fragment key={link.to}>
              <Typography variant='h6'>
                <Link
                  to={link.to}
                >
                  {link.label}
                </Link>
              </Typography>
              &nbsp;
              &nbsp;
            </Fragment>
          ))}
        </Toolbar>
      </AppBar>
    </div> 
  );
};

export default Header;
