import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../services/firebase'

export function useProfile() {
  async function uploadPhoto(uid: string, file: File): Promise<string> {
    const storageRef = ref(storage, `avatars/${uid}`)
    await uploadBytes(storageRef, file)
    return getDownloadURL(storageRef)
  }

  async function saveProfile(uid: string, name: string, photoURL: string) {
    await setDoc(doc(db, 'users', uid), {
      name,
      photoURL,
      isPremium: false,
      createdAt: serverTimestamp(),
    })
  }

  return { uploadPhoto, saveProfile }
}
