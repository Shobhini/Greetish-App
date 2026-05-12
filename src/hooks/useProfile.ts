import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../services/firebase'

export function useProfile() {
  async function uploadPhoto(_uid: string, file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => reject(new Error('Failed to read image file'))
      reader.readAsDataURL(file)
    })
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
