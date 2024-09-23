import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import {
  Button,
  Text,
  IconButton,
  Dialog,
  Portal,
  TextInput,
} from "react-native-paper";
import axios from "axios";
import {
  fetchUsers,
  deleteUser,
  updateUser,
  addUser,
} from "../services/userService"; // Đảm bảo bạn đã thêm các hàm này vào userService

const UserManagement = ({ email, password }) => {
  const [users, setUsers] = useState([]);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [age, setAge] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loading, setLoading] = useState(false); // Trạng thái tải
  const [error, setError] = useState(""); // Trạng thái lỗi

  // Fetch users from Firestore
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        setError("Error fetching users.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleDelete = async (userId) => {
    setLoading(true);
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      setError("Error deleting user.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openDialog = (user) => {
    if (user) {
      setIsEditing(true);
      setSelectedUser(user);
      setName(user.name);
      setEmailInput(user.email);
      setAge(user.age);
      setPasswordInput(user.password);
    } else {
      setIsEditing(false);
      setName("");
      setEmailInput("");
      setAge("");
      setPasswordInput("");
    }
    setDialogVisible(true);
  };

  const handleSave = async () => {
    const existingUser = users.find(user => user.email === emailInput);
    if (existingUser && !isEditing) {
      Alert.alert("Email is already registered!");
      return;
    }

    setLoading(true);
    try {
      if (isEditing && selectedUser) {
        await updateUser(selectedUser.id, { name, email: emailInput, age, password: passwordInput });
        setUsers(users.map((user) => (user.id === selectedUser.id ? { ...user, name, email: emailInput, age, password: passwordInput } : user)));
      } else {
        const newUser = await addUser({ name, email: emailInput, age, password: passwordInput });
        setUsers([...users, newUser]);
      }
      setDialogVisible(false);
    } catch (error) {
      setError("Error saving user.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#6200ee" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {users.map((user) => (
          <View key={user.id} style={styles.userContainer}>
            <Text>Name: {user.name}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Age: {user.age}</Text>
            <View style={styles.actions}>
              <Button onPress={() => openDialog(user)} mode="contained" style={styles.actionButton}>
                Edit
              </Button>
              <Button onPress={() => handleDelete(user.id)} mode="contained" color="red" style={styles.actionButton}>
                Delete
              </Button>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => openDialog(null)}>
        <IconButton icon="plus" size={24} color="white" />
      </TouchableOpacity>

      {/* Dialog for Add/Edit */}
      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>{isEditing ? "Edit User" : "Add User"}</Dialog.Title>
          <Dialog.Content>
            <TextInput label="Name" value={name} onChangeText={setName} style={styles.input} />
            <TextInput label="Email" value={emailInput} onChangeText={setEmailInput} style={styles.input} />
            <TextInput label="Age" value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input} />
            <TextInput label="Password" value={passwordInput} onChangeText={setPasswordInput} secureTextEntry style={styles.input} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
            <Button onPress={handleSave}>{isEditing ? "Update" : "Add"}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  scrollContainer: { paddingBottom: 100 },
  userContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: { flex: 1, marginHorizontal: 5 },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#6200ee",
    borderRadius: 50,
    padding: 10,
  },
  input: { marginBottom: 10 },
  errorText: { color: "red", marginBottom: 10 },
});

export default UserManagement;
