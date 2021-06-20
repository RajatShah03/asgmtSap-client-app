import React, { useEffect, useState } from 'react';
import { Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import UserCard from './UserCard';
import { getUsers } from '../services/api/users';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  control: {
    padding: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(3)
  }
}));

const Details = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const [message, setMessage] = useState('');

  const classes = useStyles();

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      if (response.data) {
        setUsers(response.data);
      }
    } catch(error) {
      console.error(error);
      setMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <LinearProgress color="secondary" />
  }

  return (
    <div>
      <Typography variant="h5" color="primary" gutterBottom align="center">
        <br />
        All users details
      </Typography>
      <br />
      <Grid container className={classes.root} spacing={4}>
        {(!users || users.length === 0) ? 'No users found' : null}
        {users.map(user => (
          <Grid key={user._id} item xs={users.length < 3 ? 4 : 3}>
            <UserCard
              key={user.email || user.username}
              details={user}
            />
          </Grid>
        ))}
      </Grid>
      {message && (
        <div>
          {message}
        </div>
      )}
    </div>
  );
};

export default Details;
