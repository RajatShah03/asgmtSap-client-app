import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  small: {
    fontSize: 14,
    fontWeight: 'bold',
    wordBreak: 'break-all'
  },
});

const Field = ({ children }) => (
  <Typography variant="h6" color="textSecondary" component="div">
    {children}
  </Typography>
);

const Value = ({ children, ...rest }) => (
  <Typography color="textPrimary" gutterBottom component="span" {...rest}>
    {children}
  </Typography>
);

const UserCard = (props) => {
  const { 
    details: {
      firstName,
      lastName,
      phoneNumber,
      email,
      userName,
      password,
    } } = props;

  const classes = useStyles();

  const [showSecret, setShowSecret] = useState(false);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Field>
          First Name: <Value className={classes.title}>{firstName}</Value>
        </Field>
        <Field> 
          Last Name: <Value className={classes.title}>{lastName}</Value>
        </Field>
        <Field>
          Phone Number: <Value className={classes.title}>{phoneNumber}</Value>
        </Field>
        <Field>
          Email: <Value className={classes.title}>{email}</Value>
        </Field>
        {showSecret && <>
            <Field>
              User Name: <Value className={classes.title}>{userName}</Value>
            </Field>
            <Field>
              Password<i>(hashed)</i>:
              <br />
              <Value className={classes.small}>{password}</Value>
            </Field>
          </>
        }
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => setShowSecret(!showSecret)}
          variant="outlined"
          color="secondary"
        >
          {showSecret ? 'Hide Secret' : 'Show Secret'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
