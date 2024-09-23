import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Lấy danh sách người dùng
export const fetchUsers = async () => {
  const usersCollection = collection(db, 'users');
  const userSnapshot = await getDocs(usersCollection);
  return userSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Cập nhật thông tin người dùng
export const updateUser = async (userId, updatedData) => {
  const userDoc = doc(db, 'users', userId);
  return updateDoc(userDoc, updatedData);
};

// Xóa người dùng
export const deleteUser = async (userId) => {
  const userDoc = doc(db, 'users', userId);
  return deleteDoc(userDoc);
};
