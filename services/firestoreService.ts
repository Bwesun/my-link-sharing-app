import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

const linksCollection = collection(db, "links");

export const addLink = async (link: { title: string; url: string; }) => {
  await addDoc(linksCollection, link);
};

export const getLinks = async () => {
  const snapshot = await getDocs(linksCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteLink = async (id: string) => {
  const docRef = doc(db, "links", id);
  await deleteDoc(docRef);
};

export const updateLink = async (id: string, data: any) => {
  const docRef = doc(db, "links", id);
  await updateDoc(docRef, data);
};
