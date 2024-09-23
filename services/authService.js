import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

export const signUp = async (email, password, name, age) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Lưu thêm thông tin vào Firestore
  await addDoc(collection(db, 'users'), {
    uid: user.uid,
    name,
    email,
    age
  });
};

export const signIn = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = async () => {
  return signOut(auth);
};
