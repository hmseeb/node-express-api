import { v4 as uuidv4 } from 'uuid';
import connection from '../db.js';
let users = [];

connection.query('create database if not exists users');

connection.query('use users');

connection.query(
  'create table if not exists users (id varchar(255), firstName varchar(255), lastName varchar(255), age int)',
  function (err, result) {}
);

export const getUsers = (req, res) => {
  const query = 'SELECT * FROM users';

  connection.execute(query, function (err, results) {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Error fetching users from the database.');
    } else {
      const users = results;
      res.send(users);
    }
  });
};

export const createUser = (req, res) => {
  const user = req.body;

  const firstName = user.firstName;
  const lastName = user.lastName;
  const age = user.age;
  const id = uuidv4();

  const query =
    'INSERT INTO users (id, firstName, lastName, age) VALUES (?, ?, ?, ?)';

  connection.execute(
    query,
    [id, firstName, lastName, age],
    function (err, result) {
      if (err) {
        console.error('Error inserting user:', err);
        res.status(500).send('Error inserting user into the database.');
      } else {
        users.push({ ...user, id: id });
        res.send(`User with the name ${user.firstName} added to the database!`);
      }
    }
  );
};

export const findUser = (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM users WHERE id = ?';
  connection.execute(query, [id], function (err, results) {
    if (err) {
      console.error('Error finding user:', err);
      res.status(404).send('Error finding user in the database.');
    } else {
      res.send(results[0]);
    }
  });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM users WHERE id = ?';
  connection.execute(query, [id], function (err, result) {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Error deleting user from the database.');
    } else {
      if (result.affectedRows === 0) {
        res
          .status(404)
          .send(`User with the id ${id} not found in the database.`);
      } else {
        res.send(`User with the id ${id} deleted from the database.`);
      }
    }
  });
};
export const updateUser = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;

  if (!firstName && !lastName && !age) {
    return res.status(400).send('No update parameters provided.');
  }

  const updateValues = [];
  const columnsToUpdate = [];

  if (firstName) {
    updateValues.push(firstName);
    columnsToUpdate.push('firstName');
  }
  if (lastName) {
    updateValues.push(lastName);
    columnsToUpdate.push('lastName');
  }
  if (age) {
    updateValues.push(age);
    columnsToUpdate.push('age');
  }

  const setClause = columnsToUpdate.map((column) => `${column} = ?`).join(', ');

  updateValues.push(id);

  const query = `UPDATE users SET ${setClause} WHERE id = ?`;

  connection.execute(query, updateValues, function (err, result) {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).send('Error updating user in the database.');
    } else {
      if (result.affectedRows === 0) {
        res.send(`User with the id ${id} not found in the database.`);
      } else {
        res.send(`User with the id ${id} has been updated.`);
      }
    }
  });
};
