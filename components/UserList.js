import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native-paper';
import { fetchUsers, deleteUser } from '../services/userService';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    loadUsers();
  }, []);

  const handleDelete = async (userId) => {
    await deleteUser(userId);
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <Text>{user.name}</Text>
          <Text>{user.email}</Text>
          <Text>{user.age}</Text>
          <Button onPress={() => handleDelete(user.id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
