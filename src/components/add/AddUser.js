import React, { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import DropDown from '../drop/DropDown';
// import classes from './AddUser.module.css';

const AddUser = (props) => {
  const [enteredFirstname, setEnteredFirstname] = useState('');
  const [enteredLastname, setEnteredLastname] = useState('');
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredFirstname.trim().length === 0 || enteredLastname.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name an last name (non-empty values).',
      });
      return;
    }
    fetch('http://localhost:8080/addUser', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({lastName: enteredFirstname,
        firstName: enteredLastname,
        company_id:"2"})
    });
    setEnteredFirstname('');
    setEnteredLastname('');
  };

  const firstnameChangeHandler = (event) => {
    setEnteredFirstname(event.target.value);
  };

  const lastnameChangeHandler = (event) => {
    setEnteredLastname(event.target.value);
  };


  const errorHandler = () => {
    setError(null);
  };

  return (
      <div>
        {error && (
            <ErrorModal
                title={error.title}
                message={error.message}
                onConfirm={errorHandler}
            />
        )}
        <Card className="addClass">
          <form onSubmit={addUserHandler}>
            <label htmlFor="username">Firstname</label>
            <input
                id="firstname"
                type="text"
                value={enteredFirstname}
                onChange={firstnameChangeHandler}
            />
            <label htmlFor="username">Lastname</label>
            <input
                id="lastname"
                type="text"
                value={enteredLastname}
                onChange={lastnameChangeHandler}
            />
            <label htmlFor="company">Company</label>
            <DropDown/>
            <Button type="submit">Add User</Button>
          </form>
        </Card>
      </div>
  );
};

export default AddUser;