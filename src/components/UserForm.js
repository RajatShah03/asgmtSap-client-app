import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { addUser } from '../services/api/users';

const labels = {
  firstName: 'First Name',
  lastName: 'Last Name',
  phoneNumber: 'Phone Number',
  email: 'Email',
  userName: 'Username',
  password: 'Password'
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: theme.spacing(4)
  },
  gridInner: {
    width: '100%',
  },
  gridInnerItem: {
    width: '70%',
  },
  rootInput: {
    width: '100%'
  },
  rootButton: {
    width: '50%',
    minHeight: 40
  },
  paper: {
    padding: theme.spacing(4)
  }
}));

const UserForm = () => {
  const emptyFormData = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    userName: '',
    password: ''
  };

  const classes = useStyles();

  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(emptyFormData);
  const [formMessage, setFormMessage] = useState('');
  const [showPass, setShowPass] = useState(false);

  const isValid = (data) => {
    return Object.values(data).every(value => value !== '');
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    if (isValid(formData)) {
      console.log(formData);
      setSubmitting(true);
      try {
        const response = await addUser(formData);
        if (response.data) {
          setFormMessage('Successfully added user');
        }
      } catch(error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    } else {
      setFormMessage('Invalid data');
    }
  };

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center">
        <Grid item className={classes.gridInner}>
          <Typography variant="h5" color="primary" gutterBottom align="center">
            <br />
            Register User
          </Typography>
        </Grid>
        <br />
        <br />
        <Grid item className={classes.gridInner} xs={6}>
          <Paper className={classes.paper}>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                className={classes.gridInner}
                direction="column"
                alignItems="center"
                spacing={2}
              >
                {Object.keys(formData).map((entry) => (
                  <Grid key={entry} className={classes.gridInnerItem} item xs={12}>
                    <TextField
                      label={labels[entry]}
                      name={entry}
                      value={formData[entry]}
                      onChange={handleChange}
                      placeholder={labels[entry]}
                      variant='outlined'
                      className={classes.rootInput}
                      color="secondary"
                      type={entry === 'password' ? showPass ? 'text' : entry : 'text'}
                      InputProps={entry === 'password' && {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPass(!showPass)}
                              onMouseDown={e => e.preventDefault()}
                              edge="end"
                            >
                              {showPass ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                ))}
                {formMessage && (
                  <Typography color="error">
                    {formMessage}
                  </Typography>
                )}
                <br />
                <Button
                  onClick={handleSubmit}
                  variant='contained'
                  className={classes.rootButton}
                  color="primary"
                >
                  {submitting ? <CircularProgress size={20} color="default" /> : `Submit`}
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserForm;
